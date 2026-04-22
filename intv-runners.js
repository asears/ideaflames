(() => {
  const canvas = document.getElementById("intvCanvas");
  const status = document.getElementById("status");
  const audioStatus = document.getElementById("audioStatus");

  const runnerCountInput = document.getElementById("runnerCount");
  const speedScaleInput = document.getElementById("speedScale");
  const trapCadenceInput = document.getElementById("trapCadence");
  const vcrIntensityInput = document.getElementById("vcrIntensity");

  const runnerCountValue = document.getElementById("runnerCountValue");
  const speedScaleValue = document.getElementById("speedScaleValue");
  const trapCadenceValue = document.getElementById("trapCadenceValue");
  const vcrIntensityValue = document.getElementById("vcrIntensityValue");

  const audioButton = document.getElementById("audioButton");
  const resetButton = document.getElementById("resetButton");

  const sceneW = 320;
  const sceneH = 200;
  const sceneCanvas = document.createElement("canvas");
  sceneCanvas.width = sceneW;
  sceneCanvas.height = sceneH;
  const scene = sceneCanvas.getContext("2d", { alpha: false, desynchronized: true });

  const palette = {
    black: "#070a0d",
    skyA: "#1f3052",
    skyB: "#3a2f6b",
    mountainBack: "#2a3f64",
    mountainMid: "#3f5e53",
    mountainFront: "#51705f",
    platform: "#2154d4",
    platformEdge: "#85a2ff",
    trapDark: "#081e55",
    spriteBlue: "#0a4eff",
    spriteHighlight: "#67a5ff",
    spriteShadow: "#03247a",
    hazard: "#f38f27",
    dust: "#dce3ea",
    scanlineTint: "#00131b"
  };

  const spriteFrames = [
    [
      "000001100000",
      "000001111000",
      "000111101000",
      "001111110000",
      "001111000000",
      "001111111110",
      "000111000000",
      "001111111100",
      "011111111110",
      "011101110010",
      "111001100010",
      "100001000000"
    ],
    [
      "000001100000",
      "000001111100",
      "000111101000",
      "001111110000",
      "001111100000",
      "011111111110",
      "011111000000",
      "001111111110",
      "011111111110",
      "111001110010",
      "100001100010",
      "100001000000"
    ],
    [
      "000001100000",
      "000001111000",
      "000111100000",
      "001111110000",
      "001111111000",
      "001111111110",
      "001111000000",
      "011111111100",
      "011111111110",
      "011101110010",
      "111001100010",
      "100001000000"
    ],
    [
      "000001100000",
      "000001111000",
      "000111101000",
      "001111110000",
      "001111000000",
      "001111111110",
      "000111000000",
      "001111111100",
      "011111111110",
      "011101110010",
      "011001100000",
      "110001000000"
    ]
  ];

  const blockerFrame = [
    "000001100000",
    "000001111000",
    "000111101000",
    "001111100000",
    "001111111000",
    "111111111100",
    "001111000000",
    "001111111100",
    "011111111110",
    "011101110010",
    "111001100010",
    "100001000000"
  ];

  const fallFrame = [
    "000000110000",
    "000001111000",
    "000111111000",
    "001111001000",
    "011111111110",
    "000111001100",
    "001111111000",
    "011111111100",
    "111001110000",
    "100001100000",
    "000001000000",
    "000010000000"
  ];

  function drawSprite(frame, x, y, scale, flip) {
    const w = frame[0].length;
    for (let j = 0; j < frame.length; j += 1) {
      const row = frame[j];
      for (let i = 0; i < w; i += 1) {
        if (row[i] !== "1") {
          continue;
        }
        const px = flip ? w - 1 - i : i;
        const sx = x + px * scale;
        const sy = y + j * scale;

        scene.fillStyle = palette.spriteBlue;
        scene.fillRect(sx, sy, scale, scale);

        if ((i + j) % 3 === 0) {
          scene.fillStyle = palette.spriteHighlight;
          scene.fillRect(sx, sy, Math.max(1, scale - 1), 1);
        }
        if ((i + j) % 4 === 0) {
          scene.fillStyle = palette.spriteShadow;
          scene.fillRect(sx, sy + scale - 1, scale, 1);
        }
      }
    }
  }

  const platformY = 136;
  const trap = {
    x: 148,
    width: 24,
    timer: 0,
    cadence: 7,
    openFor: 1.6,
    isOpen: false
  };

  const blocker = {
    x: 120,
    y: platformY - 36,
    enabled: true
  };

  const explosion = {
    active: false,
    x: 0,
    y: 0,
    life: 0,
    particles: []
  };

  const state = {
    runners: [],
    time: 0,
    last: performance.now(),
    speedScale: 1,
    vcrIntensity: 0.62,
    footstepTimer: 0,
    autoplayBlastDone: false
  };

  function randomDirection() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  function spawnRunner(index) {
    const dir = index % 2 === 0 ? 1 : -1;
    return {
      id: index,
      x: 20 + (index % 8) * 34,
      y: platformY - 36,
      vy: 0,
      dir,
      speed: (18 + Math.random() * 10) * dir,
      frame: Math.floor(Math.random() * spriteFrames.length),
      frameTimer: Math.random() * 0.2,
      state: "run",
      blockedFor: 0,
      alive: true,
      exploded: false
    };
  }

  function resetRunners() {
    state.runners = [];
    const total = Number(runnerCountInput.value);
    for (let i = 0; i < total; i += 1) {
      state.runners.push(spawnRunner(i));
    }
    state.autoplayBlastDone = false;
    explosion.active = false;
    explosion.particles = [];
  }

  function triggerExplosion(target) {
    target.alive = false;
    target.exploded = true;
    explosion.active = true;
    explosion.x = target.x + 10;
    explosion.y = target.y + 12;
    explosion.life = 0.85;
    explosion.particles = [];

    for (let i = 0; i < 24; i += 1) {
      const a = (Math.PI * 2 * i) / 24;
      const speed = 20 + Math.random() * 60;
      explosion.particles.push({
        x: explosion.x,
        y: explosion.y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed - 24,
        life: 0.6 + Math.random() * 0.45,
        color: i % 2 === 0 ? palette.hazard : palette.spriteHighlight
      });
    }

    if (audio) {
      audio.playExplosion();
    }
  }

  function drawMountains() {
    scene.fillStyle = palette.skyA;
    scene.fillRect(0, 0, sceneW, sceneH);

    const grad = scene.createLinearGradient(0, 0, 0, sceneH);
    grad.addColorStop(0, palette.skyB);
    grad.addColorStop(1, palette.skyA);
    scene.fillStyle = grad;
    scene.fillRect(0, 0, sceneW, sceneH);

    scene.fillStyle = palette.mountainBack;
    scene.beginPath();
    scene.moveTo(0, 120);
    for (let x = 0; x <= sceneW; x += 16) {
      const y = 94 + Math.sin((x + state.time * 10) * 0.04) * 8;
      scene.lineTo(x, y);
    }
    scene.lineTo(sceneW, sceneH);
    scene.lineTo(0, sceneH);
    scene.closePath();
    scene.fill();

    scene.fillStyle = palette.mountainMid;
    scene.beginPath();
    scene.moveTo(0, 132);
    for (let x = 0; x <= sceneW; x += 14) {
      const y = 108 + Math.sin((x + state.time * 18) * 0.05 + 0.8) * 7;
      scene.lineTo(x, y);
    }
    scene.lineTo(sceneW, sceneH);
    scene.lineTo(0, sceneH);
    scene.closePath();
    scene.fill();

    scene.fillStyle = palette.mountainFront;
    scene.beginPath();
    scene.moveTo(0, 150);
    for (let x = 0; x <= sceneW; x += 12) {
      const y = 128 + Math.sin((x + state.time * 26) * 0.06 + 1.6) * 5;
      scene.lineTo(x, y);
    }
    scene.lineTo(sceneW, sceneH);
    scene.lineTo(0, sceneH);
    scene.closePath();
    scene.fill();
  }

  function drawPlatform() {
    scene.fillStyle = palette.platform;
    scene.fillRect(0, platformY, sceneW, 28);

    scene.fillStyle = palette.platformEdge;
    for (let x = 0; x < sceneW; x += 6) {
      scene.fillRect(x, platformY, 4, 2);
    }

    if (trap.isOpen) {
      scene.fillStyle = palette.trapDark;
      scene.fillRect(trap.x, platformY, trap.width, 28);
      scene.fillStyle = "#0f0f10";
      scene.fillRect(trap.x + 2, platformY + 2, trap.width - 4, 26);
    }
  }

  function updateTrap(dt) {
    trap.cadence = Number(trapCadenceInput.value);
    trap.timer += dt;

    const cycle = trap.cadence + trap.openFor;
    const t = trap.timer % cycle;
    trap.isOpen = t > trap.cadence;
  }

  function updateRunner(runner, dt) {
    if (!runner.alive) {
      return;
    }

    runner.frameTimer += dt * Math.abs(runner.speed) * 0.06;
    runner.frame = Math.floor(runner.frameTimer) % spriteFrames.length;

    if (runner.state === "fall") {
      runner.vy += 180 * dt;
      runner.y += runner.vy * dt;
      if (runner.y > sceneH + 40) {
        const replacement = spawnRunner(runner.id);
        replacement.x = runner.dir > 0 ? -20 : sceneW + 20;
        replacement.dir = randomDirection();
        replacement.speed = (18 + Math.random() * 10) * replacement.dir;
        Object.assign(runner, replacement);
      }
      return;
    }

    const step = runner.speed * state.speedScale * dt;
    runner.x += step;

    if (runner.x < blocker.x + 8 && runner.x > blocker.x - 14 && runner.dir > 0 && blocker.enabled) {
      runner.state = "block";
      runner.blockedFor += dt;
      if (runner.blockedFor > 0.2) {
        runner.dir = -1;
        runner.speed = -Math.abs(runner.speed);
        runner.state = "run";
        runner.blockedFor = 0;
      }
    } else if (runner.x > blocker.x - 4 && runner.x < blocker.x + 20 && runner.dir < 0 && blocker.enabled) {
      runner.state = "block";
      runner.blockedFor += dt;
      if (runner.blockedFor > 0.2) {
        runner.dir = 1;
        runner.speed = Math.abs(runner.speed);
        runner.state = "run";
        runner.blockedFor = 0;
      }
    } else {
      runner.state = "run";
      runner.blockedFor = 0;
    }

    if (trap.isOpen && runner.x + 10 > trap.x && runner.x < trap.x + trap.width && runner.y >= platformY - 36) {
      runner.state = "fall";
      runner.vy = 10;
      if (audio) {
        audio.playDrop();
      }
    }

    if (runner.x > sceneW + 24) {
      runner.x = -18;
    }
    if (runner.x < -26) {
      runner.x = sceneW + 18;
    }
  }

  function updateExplosion(dt) {
    if (!explosion.active) {
      return;
    }

    explosion.life -= dt;
    explosion.particles = explosion.particles.filter((p) => p.life > 0);

    for (const p of explosion.particles) {
      p.life -= dt;
      p.vy += 110 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }

    if (explosion.life <= 0 && explosion.particles.length === 0) {
      explosion.active = false;
    }
  }

  function drawExplosion() {
    if (!explosion.active) {
      return;
    }

    for (const p of explosion.particles) {
      const size = p.life > 0.2 ? 2 : 1;
      scene.fillStyle = p.color;
      scene.fillRect(Math.floor(p.x), Math.floor(p.y), size, size);
    }
  }

  function drawRunners() {
    for (const runner of state.runners) {
      if (!runner.alive) {
        continue;
      }
      const frame = runner.state === "fall" ? fallFrame : runner.state === "block" ? blockerFrame : spriteFrames[runner.frame];
      drawSprite(frame, Math.floor(runner.x), Math.floor(runner.y), 2, runner.dir < 0);

      if (runner.state === "run") {
        scene.fillStyle = palette.dust;
        const dustX = runner.dir > 0 ? runner.x - 1 : runner.x + 20;
        scene.fillRect(Math.floor(dustX), platformY + 20, 2, 1);
      }
    }

    if (blocker.enabled) {
      drawSprite(blockerFrame, blocker.x, blocker.y, 2, false);
    }
  }

  function drawOverlayText() {
    scene.fillStyle = "rgba(1, 9, 15, 0.72)";
    scene.fillRect(5, 5, 174, 23);
    scene.fillStyle = palette.platformEdge;
    scene.font = "8px monospace";
    scene.fillText("INTV RUNNERS 1982 LAB", 10, 15);
    const door = trap.isOpen ? "OPEN" : "CLOSED";
    scene.fillText(`TRAP: ${door}  VCR:${state.vcrIntensity.toFixed(2)}`, 10, 24);
  }

  let gl = null;
  let shaderProgram = null;
  let texture = null;
  let posBuffer = null;

  function compileShader(glCtx, type, source) {
    const shader = glCtx.createShader(type);
    glCtx.shaderSource(shader, source);
    glCtx.compileShader(shader);
    if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
      throw new Error(glCtx.getShaderInfoLog(shader) || "shader compile failed");
    }
    return shader;
  }

  function initGl() {
    gl = canvas.getContext("webgl", { antialias: true, alpha: false, preserveDrawingBuffer: false });
    if (!gl) {
      status.textContent = "WebGL not available, falling back to direct canvas rendering.";
      return;
    }

    const vsSource = `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main() {
        vUv = (aPos + 1.0) * 0.5;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      uniform float uTime;
      uniform float uIntensity;
      uniform vec2 uResolution;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      void main() {
        vec2 uv = vUv;

        vec2 centered = uv * 2.0 - 1.0;
        float warp = dot(centered, centered) * 0.022 * uIntensity;
        uv += centered * warp;

        float jitter = (noise(vec2(uTime * 3.1, uv.y * 120.0)) - 0.5) * 0.008 * uIntensity;
        uv.x += jitter;

        float chroma = 0.0026 * uIntensity;
        vec3 color;
        color.r = texture2D(uTex, uv + vec2(chroma, 0.0)).r;
        color.g = texture2D(uTex, uv).g;
        color.b = texture2D(uTex, uv - vec2(chroma, 0.0)).b;

        float line = sin((uv.y * uResolution.y + uTime * 18.0) * 1.1) * 0.035 * uIntensity;
        color -= line;

        float staticNoise = (noise(uv * uResolution + uTime * 33.0) - 0.5) * 0.10 * uIntensity;
        color += staticNoise;

        float v = smoothstep(1.1, 0.2, length(centered));
        color *= mix(1.0, v, 0.42 * uIntensity);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "shader link failed");
    }

    shaderProgram = program;
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
  }

  function drawWithGl(nowSeconds) {
    if (!gl || !shaderProgram || !texture) {
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(sceneCanvas, 0, 0, canvas.width, canvas.height);
      return;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(shaderProgram);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, sceneCanvas);

    const uTex = gl.getUniformLocation(shaderProgram, "uTex");
    const uTime = gl.getUniformLocation(shaderProgram, "uTime");
    const uIntensity = gl.getUniformLocation(shaderProgram, "uIntensity");
    const uResolution = gl.getUniformLocation(shaderProgram, "uResolution");

    gl.uniform1i(uTex, 0);
    gl.uniform1f(uTime, nowSeconds);
    gl.uniform1f(uIntensity, state.vcrIntensity);
    gl.uniform2f(uResolution, canvas.width, canvas.height);

    const aPos = gl.getAttribLocation(shaderProgram, "aPos");
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(320, Math.floor(canvas.clientWidth * dpr));
    const h = Math.max(240, Math.floor(canvas.clientHeight * dpr));

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  let audio = null;

  function createAudioEngine() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) {
      audioStatus.textContent = "Web Audio is unavailable in this browser.";
      return null;
    }

    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 780;
    lowpass.Q.value = 0.6;
    lowpass.connect(master);

    function makeNoiseBuffer() {
      const length = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * 0.65;
      }
      return buffer;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = makeNoiseBuffer();
    noise.loop = true;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.045;
    noise.connect(noiseGain);
    noiseGain.connect(lowpass);

    const rumbleLfo = ctx.createOscillator();
    rumbleLfo.type = "sine";
    rumbleLfo.frequency.value = 0.16;
    const rumbleDepth = ctx.createGain();
    rumbleDepth.gain.value = 120;
    rumbleLfo.connect(rumbleDepth);
    rumbleDepth.connect(lowpass.frequency);

    const sidOsc = ctx.createOscillator();
    sidOsc.type = "square";
    sidOsc.frequency.value = 110;
    const sidGain = ctx.createGain();
    sidGain.gain.value = 0.02;
    sidOsc.connect(sidGain);
    sidGain.connect(master);

    const sidLfo = ctx.createOscillator();
    sidLfo.type = "triangle";
    sidLfo.frequency.value = 4.8;
    const sidLfoGain = ctx.createGain();
    sidLfoGain.gain.value = 6;
    sidLfo.connect(sidLfoGain);
    sidLfoGain.connect(sidOsc.frequency);

    noise.start();
    rumbleLfo.start();
    sidOsc.start();
    sidLfo.start();

    function playThup() {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(170, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(78, ctx.currentTime + 0.08);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.11, ctx.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(master);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    }

    function playDrop() {
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(56, ctx.currentTime + 0.22);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.26);
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    }

    function playExplosion() {
      const boom = ctx.createBufferSource();
      boom.buffer = makeNoiseBuffer();
      const filt = ctx.createBiquadFilter();
      filt.type = "bandpass";
      filt.frequency.value = 240;
      filt.Q.value = 0.8;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      boom.connect(filt);
      filt.connect(gain);
      gain.connect(master);
      boom.start();
      boom.stop(ctx.currentTime + 0.55);
    }

    function setActive(active) {
      master.gain.setTargetAtTime(active ? 0.18 : 0.0001, ctx.currentTime, 0.06);
    }

    return {
      ctx,
      playThup,
      playDrop,
      playExplosion,
      setActive
    };
  }

  function updateReadouts() {
    runnerCountValue.textContent = String(Number(runnerCountInput.value));
    speedScaleValue.textContent = Number(speedScaleInput.value).toFixed(2);
    trapCadenceValue.textContent = `${Number(trapCadenceInput.value).toFixed(1)}s`;
    vcrIntensityValue.textContent = Number(vcrIntensityInput.value).toFixed(2);
  }

  [runnerCountInput, speedScaleInput, trapCadenceInput, vcrIntensityInput].forEach((input) => {
    input.addEventListener("input", () => {
      state.speedScale = Number(speedScaleInput.value);
      state.vcrIntensity = Number(vcrIntensityInput.value);
      updateReadouts();
    });
  });

  runnerCountInput.addEventListener("change", resetRunners);

  resetButton.addEventListener("click", () => {
    resetRunners();
    trap.timer = 0;
  });

  audioButton.addEventListener("click", async () => {
    if (!audio) {
      audio = createAudioEngine();
      if (!audio) {
        return;
      }
    }

    if (audio.ctx.state === "suspended") {
      await audio.ctx.resume();
    }

    const turningOn = audioButton.dataset.active !== "1";
    audioButton.dataset.active = turningOn ? "1" : "0";
    audioButton.textContent = turningOn ? "Mute Sound" : "Enable Sound";
    audioStatus.textContent = turningOn
      ? "Sound online: mountain rumble + chip rhythm + thup thup steps."
      : "Audio muted.";

    audio.setActive(turningOn);
  });

  function maybePlayFootsteps(dt) {
    if (!audio || audioButton.dataset.active !== "1") {
      return;
    }

    const runningCount = state.runners.filter((r) => r.alive && r.state === "run").length;
    const cadence = Math.max(0.09, 0.45 / Math.max(1, runningCount * 0.2) / state.speedScale);

    state.footstepTimer += dt;
    if (state.footstepTimer > cadence) {
      state.footstepTimer = 0;
      audio.playThup();
    }
  }

  function update(dt) {
    state.time += dt;
    state.speedScale = Number(speedScaleInput.value);
    state.vcrIntensity = Number(vcrIntensityInput.value);

    updateTrap(dt);

    for (const runner of state.runners) {
      updateRunner(runner, dt);
    }

    if (!state.autoplayBlastDone && state.time > 9) {
      const candidate = state.runners.find((r) => r.alive && r.state === "run");
      if (candidate) {
        triggerExplosion(candidate);
        state.autoplayBlastDone = true;
      }
    }

    updateExplosion(dt);
    maybePlayFootsteps(dt);
  }

  function render(nowMs) {
    drawMountains();
    drawPlatform();
    drawRunners();
    drawExplosion();
    drawOverlayText();

    drawWithGl(nowMs * 0.001);

    const running = state.runners.filter((r) => r.alive && r.state === "run").length;
    const falling = state.runners.filter((r) => r.alive && r.state === "fall").length;
    status.textContent = `Running: ${running} | Falling: ${falling} | Trap door: ${trap.isOpen ? "open" : "closed"}`;
  }

  function frame(now) {
    resize();

    const dt = Math.min(0.033, (now - state.last) / 1000);
    state.last = now;

    update(dt);
    render(now);

    requestAnimationFrame(frame);
  }

  function start() {
    try {
      initGl();
    } catch (err) {
      status.textContent = `WebGL filter error: ${err.message}`;
      gl = null;
    }

    updateReadouts();
    resetRunners();
    resize();
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  start();
})();
