(() => {
  const canvas = document.getElementById("gravityCanvas");
  const status = document.getElementById("status");

  const gravityInput = document.getElementById("gravityStrength");
  const dragInput = document.getElementById("dragStrength");
  const timeInput = document.getElementById("timeScale");
  const pointInput = document.getElementById("pointSize");

  const gravityValue = document.getElementById("gravityValue");
  const dragValue = document.getElementById("dragValue");
  const timeValue = document.getElementById("timeValue");
  const pointValue = document.getElementById("pointValue");

  const resetButton = document.getElementById("resetButton");
  const burstButton = document.getElementById("burstButton");

  const gl = canvas.getContext("webgl2", { antialias: false });
  if (!gl) {
    status.textContent = "WebGL2 is unavailable in this browser, so the GPU simulation cannot run.";
    return;
  }

  const colorBufferFloat = gl.getExtension("EXT_color_buffer_float");
  if (!colorBufferFloat) {
    status.textContent = "Required float render target support is missing in this browser.";
    return;
  }

  const SIZE = 128;
  const COUNT = SIZE * SIZE;
  const STRIDE = 4;

  const mouse = { active: false, x: 0, y: 0 };
  let blast = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(300, Math.floor(canvas.clientWidth * dpr));
    const height = Math.max(240, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
    }
    return shader;
  }

  function makeProgram(vsSource, fsSource) {
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
    }
    return program;
  }

  function createStateTexture() {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, SIZE, SIZE, 0, gl.RGBA, gl.FLOAT, null);
    return tex;
  }

  function createFramebuffer(tex) {
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    return fbo;
  }

  function randomState() {
    const data = new Float32Array(COUNT * STRIDE);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 0.45) * 0.92;
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;

      const tangential = 0.15 + (1 - r) * 0.65;
      const vx = -Math.sin(a) * tangential;
      const vy = Math.cos(a) * tangential;

      const idx = i * STRIDE;
      data[idx] = x;
      data[idx + 1] = y;
      data[idx + 2] = vx;
      data[idx + 3] = vy;
    }
    return data;
  }

  function seedTextures() {
    const data = randomState();
    gl.bindTexture(gl.TEXTURE_2D, stateA);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, SIZE, SIZE, gl.RGBA, gl.FLOAT, data);
    gl.bindTexture(gl.TEXTURE_2D, stateB);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, SIZE, SIZE, gl.RGBA, gl.FLOAT, data);
  }

  const updateVS = `#version 300 es
  precision highp float;
  const vec2 P[6] = vec2[6](
    vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0),
    vec2(-1.0, 1.0), vec2(1.0, -1.0), vec2(1.0, 1.0)
  );
  void main() {
    gl_Position = vec4(P[gl_VertexID], 0.0, 1.0);
  }
  `;

  const updateFS = `#version 300 es
  precision highp float;

  uniform sampler2D uState;
  uniform float uDt;
  uniform float uG;
  uniform float uDrag;
  uniform vec2 uMouse;
  uniform float uMouseMass;
  uniform float uBlast;

  out vec4 fragColor;

  void main() {
    ivec2 pixel = ivec2(gl_FragCoord.xy);
    vec4 s = texelFetch(uState, pixel, 0);
    vec2 pos = s.xy;
    vec2 vel = s.zw;

    float r = length(pos) + 0.001;
    vec2 toCenter = -pos / (r * r * r + 0.03);
    vec2 acc = uG * toCenter;

    vec2 m = uMouse - pos;
    float mr = length(m) + 0.003;
    acc += uMouseMass * (m / (mr * mr * mr + 0.06));

    // Temporary radial repulsion pulse to stir the field.
    acc += uBlast * (pos / (r * r + 0.05));

    vel += acc * uDt;
    vel *= uDrag;
    pos += vel * uDt;

    if (abs(pos.x) > 1.02) {
      pos.x = clamp(pos.x, -1.02, 1.02);
      vel.x *= -0.78;
    }
    if (abs(pos.y) > 1.02) {
      pos.y = clamp(pos.y, -1.02, 1.02);
      vel.y *= -0.78;
    }

    fragColor = vec4(pos, vel);
  }
  `;

  const renderVS = `#version 300 es
  precision highp float;

  uniform sampler2D uState;
  uniform float uPointSize;

  out float vSpeed;

  void main() {
    int id = gl_VertexID;
    int x = id % ${SIZE};
    int y = id / ${SIZE};
    vec4 s = texelFetch(uState, ivec2(x, y), 0);

    vec2 pos = s.xy;
    vec2 vel = s.zw;
    vSpeed = length(vel);

    gl_Position = vec4(pos, 0.0, 1.0);
    gl_PointSize = uPointSize;
  }
  `;

  const renderFS = `#version 300 es
  precision highp float;

  in float vSpeed;
  out vec4 fragColor;

  void main() {
    vec2 p = gl_PointCoord - vec2(0.5);
    float d = length(p);
    if (d > 0.5) {
      discard;
    }

    float t = clamp(vSpeed * 1.6, 0.0, 1.0);
    vec3 low = vec3(0.89, 0.64, 0.25);
    vec3 high = vec3(0.22, 0.86, 0.95);
    vec3 c = mix(low, high, t);
    float alpha = smoothstep(0.52, 0.08, d);
    fragColor = vec4(c, alpha);
  }
  `;

  let updateProgram;
  let renderProgram;

  try {
    updateProgram = makeProgram(updateVS, updateFS);
    renderProgram = makeProgram(renderVS, renderFS);
  } catch (err) {
    status.textContent = `Shader error: ${err.message}`;
    return;
  }

  const stateA = createStateTexture();
  const stateB = createStateTexture();
  const fboA = createFramebuffer(stateA);
  const fboB = createFramebuffer(stateB);

  let readState = stateA;
  let writeState = stateB;
  let writeFbo = fboB;

  seedTextures();

  function swap() {
    const prevRead = readState;
    readState = writeState;
    writeState = prevRead;
    writeFbo = writeState === stateA ? fboA : fboB;
  }

  const updateUniforms = {
    state: gl.getUniformLocation(updateProgram, "uState"),
    dt: gl.getUniformLocation(updateProgram, "uDt"),
    g: gl.getUniformLocation(updateProgram, "uG"),
    drag: gl.getUniformLocation(updateProgram, "uDrag"),
    mouse: gl.getUniformLocation(updateProgram, "uMouse"),
    mouseMass: gl.getUniformLocation(updateProgram, "uMouseMass"),
    blast: gl.getUniformLocation(updateProgram, "uBlast")
  };

  const renderUniforms = {
    state: gl.getUniformLocation(renderProgram, "uState"),
    pointSize: gl.getUniformLocation(renderProgram, "uPointSize")
  };

  function updateReadouts() {
    gravityValue.textContent = Number(gravityInput.value).toFixed(2);
    dragValue.textContent = Number(dragInput.value).toFixed(3);
    timeValue.textContent = Number(timeInput.value).toFixed(2);
    pointValue.textContent = Number(pointInput.value).toFixed(1);
  }

  [gravityInput, dragInput, timeInput, pointInput].forEach((el) => {
    el.addEventListener("input", updateReadouts);
  });

  resetButton.addEventListener("click", () => {
    seedTextures();
    blast = 0;
  });

  burstButton.addEventListener("click", () => {
    blast = Math.min(blast + 1.2, 3.5);
  });

  canvas.addEventListener("pointerdown", (event) => {
    mouse.active = true;
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = 1 - ((event.clientY - rect.top) / rect.height) * 2;
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!mouse.active) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = 1 - ((event.clientY - rect.top) / rect.height) * 2;
  });

  window.addEventListener("pointerup", () => {
    mouse.active = false;
  });

  window.addEventListener("resize", resize);

  let previousTime = performance.now();

  function tick(now) {
    resize();
    const elapsed = Math.min((now - previousTime) / 1000, 0.033);
    previousTime = now;

    const dt = elapsed * Number(timeInput.value);
    const gravity = Number(gravityInput.value);
    const drag = Number(dragInput.value);
    const pointSize = Number(pointInput.value);
    const mouseMass = mouse.active ? 0.75 : 0;

    gl.viewport(0, 0, SIZE, SIZE);
    gl.useProgram(updateProgram);
    gl.bindFramebuffer(gl.FRAMEBUFFER, writeFbo);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, readState);
    gl.uniform1i(updateUniforms.state, 0);
    gl.uniform1f(updateUniforms.dt, dt);
    gl.uniform1f(updateUniforms.g, gravity);
    gl.uniform1f(updateUniforms.drag, drag);
    gl.uniform2f(updateUniforms.mouse, mouse.x, mouse.y);
    gl.uniform1f(updateUniforms.mouseMass, mouseMass);
    gl.uniform1f(updateUniforms.blast, blast);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    swap();

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.02, 0.04, 0.08, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(renderProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, readState);
    gl.uniform1i(renderUniforms.state, 0);
    gl.uniform1f(renderUniforms.pointSize, pointSize);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.drawArrays(gl.POINTS, 0, COUNT);

    blast *= 0.94;

    status.textContent = `Particles: ${COUNT.toLocaleString()} | Hold and drag to pull orbits | Burst level: ${blast.toFixed(2)}`;
    requestAnimationFrame(tick);
  }

  updateReadouts();
  resize();
  requestAnimationFrame(tick);
})();
