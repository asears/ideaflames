(() => {
'use strict';

// ── Quote database ────────────────────────────────────────────────────────
const QUOTES = [
  // Sun Tzu
  { text: "The supreme art of war is to subdue the enemy without fighting.", author: "Sun Tzu", wikiTitle: "Sun Tzu", tags: ["strategy", "wisdom"], source: "The Art of War" },
  { text: "In the midst of chaos, there is also opportunity.", author: "Sun Tzu", wikiTitle: "Sun Tzu", tags: ["strategy", "chaos", "opportunity"], source: "The Art of War" },
  { text: "He who knows when he can fight and when he cannot will be victorious.", author: "Sun Tzu", wikiTitle: "Sun Tzu", tags: ["strategy", "wisdom"], source: "The Art of War" },
  // Warren Buffett
  { text: "Price is what you pay. Value is what you get.", author: "Warren Buffett", wikiTitle: "Warren Buffett", tags: ["investing", "value"], source: "" },
  { text: "Rule No. 1: Never lose money. Rule No. 2: Never forget Rule No. 1.", author: "Warren Buffett", wikiTitle: "Warren Buffett", tags: ["investing", "risk"], source: "" },
  { text: "Someone's sitting in the shade today because someone planted a tree a long time ago.", author: "Warren Buffett", wikiTitle: "Warren Buffett", tags: ["patience", "investing", "time"], source: "" },
  { text: "The stock market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett", wikiTitle: "Warren Buffett", tags: ["investing", "patience"], source: "" },
  // Charlie Munger
  { text: "Invert, always invert.", author: "Charlie Munger", wikiTitle: "Charlie Munger", tags: ["thinking", "problem-solving", "wisdom"], source: "" },
  { text: "All I want to know is where I'm going to die, so I'll never go there.", author: "Charlie Munger", wikiTitle: "Charlie Munger", tags: ["risk", "wisdom", "humor"], source: "" },
  { text: "It's not supposed to be easy. Anyone who finds it easy is stupid.", author: "Charlie Munger", wikiTitle: "Charlie Munger", tags: ["wisdom", "challenge"], source: "" },
  { text: "Show me the incentive and I'll show you the outcome.", author: "Charlie Munger", wikiTitle: "Charlie Munger", tags: ["incentives", "behavior", "thinking"], source: "" },
  // Richard Feynman
  { text: "The first principle is that you must not fool yourself — and you are the easiest person to fool.", author: "Richard Feynman", wikiTitle: "Richard Feynman", tags: ["science", "honesty", "physics"], source: "" },
  { text: "I would rather have questions that can't be answered than answers that can't be questioned.", author: "Richard Feynman", wikiTitle: "Richard Feynman", tags: ["curiosity", "science", "questioning"], source: "" },
  { text: "Study hard what interests you in the most undisciplined, irreverent and original manner possible.", author: "Richard Feynman", wikiTitle: "Richard Feynman", tags: ["learning", "curiosity"], source: "" },
  // Marcus Aurelius
  { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", wikiTitle: "Marcus Aurelius", tags: ["stoicism", "mind", "strength"], source: "Meditations" },
  { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius", wikiTitle: "Marcus Aurelius", tags: ["stoicism", "obstacles", "action"], source: "Meditations" },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius", wikiTitle: "Marcus Aurelius", tags: ["action", "virtue", "stoicism"], source: "Meditations" },
  { text: "If it is not right, do not do it; if it is not true, do not say it.", author: "Marcus Aurelius", wikiTitle: "Marcus Aurelius", tags: ["ethics", "truth", "stoicism"], source: "Meditations" },
  // Seneca
  { text: "Nusquam est qui ubique est. He who is everywhere is nowhere.", author: "Seneca", wikiTitle: "Seneca the Younger", tags: ["focus", "philosophy", "wisdom"], source: "Letters to Lucilius" },
  { text: "Dum differtur vita transcurrit. While we delay, life speeds by.", author: "Seneca", wikiTitle: "Seneca the Younger", tags: ["time", "urgency", "philosophy"], source: "Letters to Lucilius" },
  { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca", wikiTitle: "Seneca the Younger", tags: ["time", "living", "philosophy"], source: "Letters to Lucilius" },
  // Albert Einstein
  { text: "Imagination is more important than knowledge.", author: "Albert Einstein", wikiTitle: "Albert Einstein", tags: ["creativity", "science", "imagination"], source: "" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein", wikiTitle: "Albert Einstein", tags: ["learning", "courage", "mistakes"], source: "" },
  { text: "Logic will get you from A to Z; imagination will get you everywhere.", author: "Albert Einstein", wikiTitle: "Albert Einstein", tags: ["imagination", "logic"], source: "" },
  { text: "Life is like riding a bicycle. To keep your balance you must keep moving.", author: "Albert Einstein", wikiTitle: "Albert Einstein", tags: ["life", "perseverance", "balance"], source: "" },
  // Carl Sagan
  { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan", wikiTitle: "Carl Sagan", tags: ["science", "discovery", "cosmos"], source: "" },
  { text: "We are made of star-stuff.", author: "Carl Sagan", wikiTitle: "Carl Sagan", tags: ["cosmos", "universe", "humanity"], source: "Cosmos" },
  { text: "Extraordinary claims require extraordinary evidence.", author: "Carl Sagan", wikiTitle: "Carl Sagan", tags: ["science", "skepticism", "truth"], source: "" },
  // Oscar Wilde
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", wikiTitle: "Oscar Wilde", tags: ["identity", "humor", "individuality"], source: "" },
  { text: "We are all in the gutter, but some of us are looking at the stars.", author: "Oscar Wilde", wikiTitle: "Oscar Wilde", tags: ["hope", "optimism", "stars"], source: "Lady Windermere's Fan" },
  { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde", wikiTitle: "Oscar Wilde", tags: ["living", "existence", "philosophy"], source: "" },
  // Mark Twain
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", wikiTitle: "Mark Twain", tags: ["action", "progress", "motivation"], source: "" },
  { text: "Whenever you find yourself on the side of the majority, it is time to pause and reflect.", author: "Mark Twain", wikiTitle: "Mark Twain", tags: ["thinking", "independence", "wisdom"], source: "" },
  { text: "Twenty years from now you will be more disappointed by the things you didn't do than the ones you did.", author: "Mark Twain", wikiTitle: "Mark Twain", tags: ["regret", "action", "courage"], source: "" },
  // Lao Tzu
  { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu", wikiTitle: "Laozi", tags: ["journey", "beginning", "wisdom"], source: "Tao Te Ching" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu", wikiTitle: "Laozi", tags: ["nature", "patience", "flow"], source: "Tao Te Ching" },
  { text: "Knowing others is intelligence. Knowing yourself is true wisdom.", author: "Lao Tzu", wikiTitle: "Laozi", tags: ["wisdom", "self-knowledge"], source: "Tao Te Ching" },
  // Rumi
  { text: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.", author: "Rumi", wikiTitle: "Rumi", tags: ["love", "spirituality", "poetry", "openness"], source: "" },
  { text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi", wikiTitle: "Rumi", tags: ["wisdom", "change", "self"], source: "" },
  // Winston Churchill
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", wikiTitle: "Winston Churchill", tags: ["courage", "perseverance", "success", "failure"], source: "" },
  { text: "We make a living by what we get, but we make a life by what we give.", author: "Winston Churchill", wikiTitle: "Winston Churchill", tags: ["generosity", "life", "giving"], source: "" },
  // Nikola Tesla
  { text: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.", author: "Nikola Tesla", wikiTitle: "Nikola Tesla", tags: ["energy", "universe", "science"], source: "" },
  { text: "The present is theirs; the future, for which I really worked, is mine.", author: "Nikola Tesla", wikiTitle: "Nikola Tesla", tags: ["future", "vision", "invention"], source: "" },
  // Bruce Lee
  { text: "Be like water making its way through cracks.", author: "Bruce Lee", wikiTitle: "Bruce Lee", tags: ["adaptability", "philosophy", "martial arts"], source: "" },
  { text: "Absorb what is useful, discard what is not, add what is uniquely your own.", author: "Bruce Lee", wikiTitle: "Bruce Lee", tags: ["learning", "philosophy", "creativity"], source: "" },
  // Maya Angelou
  { text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou", wikiTitle: "Maya Angelou", tags: ["empathy", "humanity", "feelings"], source: "" },
  { text: "You may not control all the events that happen to you, but you can decide not to be reduced by them.", author: "Maya Angelou", wikiTitle: "Maya Angelou", tags: ["resilience", "choice", "courage"], source: "" },
  // Stephen Hawking
  { text: "Intelligence is the ability to adapt to change.", author: "Stephen Hawking", wikiTitle: "Stephen Hawking", tags: ["intelligence", "adaptation", "change"], source: "" },
  { text: "Remember to look up at the stars and not down at your feet.", author: "Stephen Hawking", wikiTitle: "Stephen Hawking", tags: ["curiosity", "wonder", "cosmos"], source: "" },
  // Shakespeare
  { text: "All the world's a stage, and all the men and women merely players.", author: "William Shakespeare", wikiTitle: "William Shakespeare", tags: ["theater", "life", "philosophy"], source: "As You Like It" },
  { text: "To thine own self be true.", author: "William Shakespeare", wikiTitle: "William Shakespeare", tags: ["identity", "honesty", "virtue"], source: "Hamlet" },
  { text: "We know what we are, but know not what we may be.", author: "William Shakespeare", wikiTitle: "William Shakespeare", tags: ["potential", "self", "philosophy"], source: "Hamlet" },
  // Benjamin Franklin
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", wikiTitle: "Benjamin Franklin", tags: ["knowledge", "learning", "investing"], source: "" },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin", wikiTitle: "Benjamin Franklin", tags: ["learning", "teaching", "education"], source: "" },
  // Leonardo da Vinci
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci", wikiTitle: "Leonardo da Vinci", tags: ["learning", "curiosity", "mind"], source: "" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", wikiTitle: "Leonardo da Vinci", tags: ["simplicity", "design", "elegance"], source: "" },
];

// ── Author accent colors [R, G, B] 0‥1 ───────────────────────────────────
const AUTHOR_COLORS = {
  "Sun Tzu":             [0.85, 0.18, 0.12],
  "Warren Buffett":      [0.88, 0.72, 0.18],
  "Charlie Munger":      [0.80, 0.62, 0.12],
  "Richard Feynman":     [0.18, 0.72, 0.90],
  "Marcus Aurelius":     [0.65, 0.45, 0.82],
  "Seneca":              [0.80, 0.80, 0.60],
  "Albert Einstein":     [0.95, 0.90, 0.25],
  "Carl Sagan":          [0.28, 0.50, 0.92],
  "Oscar Wilde":         [0.90, 0.30, 0.55],
  "Mark Twain":          [0.78, 0.50, 0.22],
  "Lao Tzu":             [0.28, 0.80, 0.52],
  "Rumi":                [0.95, 0.58, 0.18],
  "Winston Churchill":   [0.12, 0.42, 0.82],
  "Nikola Tesla":        [0.38, 0.92, 1.00],
  "Bruce Lee":           [0.92, 0.80, 0.10],
  "Maya Angelou":        [0.92, 0.38, 0.50],
  "Stephen Hawking":     [0.48, 0.82, 0.95],
  "William Shakespeare": [0.72, 0.30, 0.65],
  "Benjamin Franklin":   [0.90, 0.72, 0.12],
  "Leonardo da Vinci":   [0.55, 0.88, 0.70],
};

const DEFAULT_ACCENT = [0.83, 0.65, 0.29];

// ── State ─────────────────────────────────────────────────────────────────
let filteredQuotes  = [...QUOTES];
let quoteIndex      = 0;
let wordIndex       = 0;
let wordSpans       = [];
let wpm             = 80;
let paused          = false;
let wordScheduleMs  = 0;
let ballX           = 0;
let ballTargetX     = 0;
let currentAccent   = DEFAULT_ACCENT;
let currentEffect   = 0;
let animRunning     = false;

// ── WebGL setup ───────────────────────────────────────────────────────────
const bgCanvas = document.getElementById("bgCanvas");
let gl, prog, uTime, uRes, uEffect, uAccent;

const VS = `#version 300 es
const vec2 V[6]=vec2[6](vec2(-1,-1),vec2(1,-1),vec2(-1,1),vec2(-1,1),vec2(1,-1),vec2(1,1));
void main(){gl_Position=vec4(V[gl_VertexID],0,1);}`;

const FS = `#version 300 es
precision mediump float;
uniform float uTime;
uniform vec2 uRes;
uniform int uEffect;
uniform vec3 uAccent;
out vec4 fragColor;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}

void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  vec2 uvc=uv-0.5;
  vec3 col;

  if(uEffect==0){
    // ── Cosmos
    col=vec3(0.02,0.03,0.08);
    col+=uAccent*noise(uvc*3.0+uTime*0.05)*0.13;
    for(int i=0;i<3;i++){
      float s=float(i+1)*45.0;
      vec2 g=floor(uv*s),f=fract(uv*s)-0.5;
      float h=hash(g+float(i)*7.3);
      col+=vec3(smoothstep(0.05*h,0.0,length(f))*step(0.94,h)*(0.6+0.4*h));
    }
    col+=uAccent*0.10*exp(-length(uvc)*4.0)*(0.55+0.45*sin(uTime*0.35));

  } else if(uEffect==1){
    // ── Plasma
    float v=(sin(uv.x*8.0+uTime)+sin(uv.y*6.5-uTime*0.8)
            +sin((uv.x+uv.y)*5.5+uTime*1.3)
            +sin(length(uvc)*14.0-uTime*1.8))*0.25;
    col=0.15+0.10*vec3(sin(v*6.28),sin(v*6.28+2.09),sin(v*6.28+4.19));
    col=mix(col,uAccent*0.22,0.45);

  } else if(uEffect==2){
    // ── Waves
    float r=length(uvc);
    float a=atan(uvc.y,uvc.x);
    float w1=sin(r*18.0-uTime*2.5)*0.5+0.5;
    float w2=sin(uvc.x*10.0-uTime*1.5)*sin(uvc.y*8.0+uTime*0.8)*0.5+0.5;
    float w3=sin(a*3.0+uTime*0.7)*0.5+0.5;
    col=mix(vec3(0.03,0.06,0.12),uAccent*0.45,(w1*0.5+w2*0.3+w3*0.2)*0.42);

  } else {
    // ── Circuit
    vec2 g=fract(uv*13.0);
    float mx=min(min(g.x,1.0-g.x),min(g.y,1.0-g.y));
    float line=1.0-smoothstep(0.0,0.055,mx);
    float pulse=0.5+0.5*sin(uTime*2.8+uv.x*7.0+uv.y*5.5);
    col=vec3(0.02,0.05,0.04)+uAccent*line*(0.28+0.22*pulse);
    vec2 jg=fract(uv*13.0+0.5);
    col+=uAccent*smoothstep(0.22,0.14,length(jg-0.5))*pulse*0.32;
  }

  col*=1.0-length(uvc)*0.75;
  fragColor=vec4(col,1.0);
}`;

function compileShader(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function initWebGL() {
  gl = bgCanvas.getContext("webgl2");
  if (!gl) return;
  prog = gl.createProgram();
  gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  uTime   = gl.getUniformLocation(prog, "uTime");
  uRes    = gl.getUniformLocation(prog, "uRes");
  uEffect = gl.getUniformLocation(prog, "uEffect");
  uAccent = gl.getUniformLocation(prog, "uAccent");
  gl.createVertexArray(); // silent VAO for WebGL2
}

function resizeGL() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  bgCanvas.width  = Math.floor(window.innerWidth  * dpr);
  bgCanvas.height = Math.floor(window.innerHeight * dpr);
  if (gl) gl.viewport(0, 0, bgCanvas.width, bgCanvas.height);
}

function drawBG(t) {
  if (!gl) return;
  gl.useProgram(prog);
  gl.uniform1f(uTime, t * 0.001);
  gl.uniform2f(uRes, bgCanvas.width, bgCanvas.height);
  gl.uniform1i(uEffect, currentEffect);
  gl.uniform3f(uAccent, ...currentAccent);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

// ── Bouncing ball canvas ──────────────────────────────────────────────────
const bounceCanvas = document.getElementById("bounceCanvas");
const ballCtx = bounceCanvas.getContext("2d");
const BALL_H = 70;
const BALL_R = 9;

function drawBall(t) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const wrap = document.getElementById("quoteTextWrap");
  const wRect = wrap.getBoundingClientRect();
  bounceCanvas.width  = Math.floor(wRect.width * dpr);
  bounceCanvas.height = Math.floor(BALL_H * dpr);
  bounceCanvas.style.width  = `${wRect.width}px`;
  bounceCanvas.style.height = `${BALL_H}px`;

  const ctx = ballCtx;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, wRect.width, BALL_H);

  if (!wordSpans.length) return;

  // Target X: center of active word in local coordinates
  const activeSpan = wordSpans[Math.min(wordIndex, wordSpans.length - 1)];
  const sRect = activeSpan.getBoundingClientRect();
  const targetX = (sRect.left + sRect.width / 2) - wRect.left;
  ballTargetX = isFinite(targetX) ? targetX : ballX;

  // Lerp ball to target
  ballX += (ballTargetX - ballX) * 0.12;

  // Bounce Y: sinusoidal
  const bounceAmt = BALL_H * 0.28;
  const baseY = BALL_H * 0.62;
  const by = baseY + Math.sin(t * 0.007) * bounceAmt;

  const [r, g, b] = currentAccent.map(v => Math.round(v * 255));
  const col = `rgb(${r},${g},${b})`;

  // Drop line
  ctx.beginPath();
  ctx.setLineDash([3, 5]);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.35)`;
  ctx.lineWidth = 1.5;
  ctx.moveTo(ballX, by + BALL_R);
  ctx.lineTo(ballX, BALL_H);
  ctx.stroke();
  ctx.setLineDash([]);

  // Ball glow
  const grd = ctx.createRadialGradient(ballX, by, 0, ballX, by, BALL_R * 2.2);
  grd.addColorStop(0, `rgba(${r},${g},${b},0.5)`);
  grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.beginPath();
  ctx.arc(ballX, by, BALL_R * 2.2, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();

  // Ball
  ctx.shadowColor = col;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(ballX, by, BALL_R, 0, Math.PI * 2);
  ctx.fillStyle = col;
  ctx.fill();
  ctx.shadowBlur = 0;
}

// ── Quote display ─────────────────────────────────────────────────────────
const quoteText = document.getElementById("quoteText");
const authorName = document.getElementById("authorName");
const authorSource = document.getElementById("authorSource");
const authorImg = document.getElementById("authorImg");
const authorPlaceholder = document.getElementById("authorImgPlaceholder");
const tagBar = document.getElementById("tagBar");
const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");

const EMOJI_FALLBACK = {
  "Sun Tzu":             "⚔️",
  "Warren Buffett":      "💰",
  "Charlie Munger":      "🧠",
  "Richard Feynman":     "⚛️",
  "Marcus Aurelius":     "🏛️",
  "Seneca":              "📜",
  "Albert Einstein":     "🌀",
  "Carl Sagan":          "🔭",
  "Oscar Wilde":         "🎭",
  "Mark Twain":          "✍️",
  "Lao Tzu":             "☯️",
  "Rumi":                "🌹",
  "Winston Churchill":   "🎖️",
  "Nikola Tesla":        "⚡",
  "Bruce Lee":           "🥋",
  "Maya Angelou":        "🌟",
  "Stephen Hawking":     "🌌",
  "William Shakespeare": "🎭",
  "Benjamin Franklin":   "🦅",
  "Leonardo da Vinci":   "🎨",
};

async function fetchAuthorImage(wikiTitle, authorKey) {
  try {
    const resp = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`,
      { headers: { Accept: "application/json" } }
    );
    if (!resp.ok) throw new Error("no image");
    const data = await resp.json();
    const src = data.thumbnail?.source;
    if (!src) throw new Error("no thumbnail");
    return src;
  } catch (_) {
    return null;
  }
}

function setActiveWord(i) {
  wordSpans.forEach((s, j) => {
    s.classList.toggle("active", j === i);
    s.classList.toggle("context", j < i && j >= i - 3);
  });
  // Progress
  const pct = wordSpans.length > 1 ? (i / (wordSpans.length - 1)) * 100 : 100;
  progressFill.style.width = `${pct}%`;
  progressLabel.textContent = `${i + 1} / ${wordSpans.length}`;
}

async function loadQuote(q) {
  // Accent color
  currentAccent = AUTHOR_COLORS[q.author] || DEFAULT_ACCENT;
  const [r, g, b] = currentAccent.map(v => Math.round(v * 255));
  document.documentElement.style.setProperty("--accent", `rgb(${r},${g},${b})`);
  document.documentElement.style.setProperty("--accent-rgb", `${r},${g},${b}`);

  // Author info
  authorName.textContent = q.author;
  authorSource.textContent = q.source ? `— ${q.source}` : "";
  tagBar.innerHTML = q.tags.map(t => `<span class="tag-chip">${t}</span>`).join("");

  // Image (async, don't block)
  authorImg.hidden = true;
  authorPlaceholder.hidden = false;
  authorPlaceholder.textContent = EMOJI_FALLBACK[q.author] || "💬";
  fetchAuthorImage(q.wikiTitle, q.author).then(src => {
    if (src) {
      authorImg.src = src;
      authorImg.hidden = false;
      authorPlaceholder.hidden = true;
    }
  });

  // Word spans
  const words = q.text.trim().split(/\s+/);
  quoteText.innerHTML = words.map(w => `<span class="q-word">${w}</span>`).join(" ");
  wordSpans = Array.from(quoteText.querySelectorAll(".q-word"));

  // Reset word advance
  wordIndex = 0;
  ballX = 0;
  ballTargetX = 0;
  wordScheduleMs = performance.now() + msPerWord();
  setActiveWord(0);
}

function loadCurrent() {
  if (filteredQuotes.length === 0) return;
  quoteIndex = Math.max(0, Math.min(quoteIndex, filteredQuotes.length - 1));
  loadQuote(filteredQuotes[quoteIndex]);
}

function msPerWord() { return 60000 / Math.max(10, wpm); }

// ── Animation loop ────────────────────────────────────────────────────────
function animate(t) {
  drawBG(t);

  if (!paused && wordSpans.length && t >= wordScheduleMs) {
    wordIndex = (wordIndex + 1) % wordSpans.length;
    setActiveWord(wordIndex);
    wordScheduleMs = t + msPerWord();
  }

  drawBall(t);
  requestAnimationFrame(animate);
}

// ── Navigation ────────────────────────────────────────────────────────────
function prevQuote() {
  quoteIndex = (quoteIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
  loadCurrent();
}
function nextQuote() {
  quoteIndex = (quoteIndex + 1) % filteredQuotes.length;
  loadCurrent();
}
function randomQuote() {
  quoteIndex = Math.floor(Math.random() * filteredQuotes.length);
  loadCurrent();
}
function togglePause() {
  paused = !paused;
  document.getElementById("pauseBtn").textContent  = paused ? "Resume" : "Pause";
  document.getElementById("pauseBtn2").textContent = paused ? "Resume" : "Pause";
  document.getElementById("pauseBtn").classList.toggle("paused", paused);
  document.getElementById("pauseBtn2").classList.toggle("paused", paused);
  if (!paused) wordScheduleMs = performance.now() + msPerWord();
}

// ── Search ────────────────────────────────────────────────────────────────
let searchTimer = null;
document.getElementById("searchInput").addEventListener("input", e => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => runSearch(e.target.value), 280);
});

function runSearch(q) {
  const qResults = document.getElementById("searchResults");
  const term = q.toLowerCase().trim();
  if (!term) {
    filteredQuotes = [...QUOTES];
    qResults.innerHTML = "";
    return;
  }
  filteredQuotes = QUOTES.filter(qt =>
    qt.text.toLowerCase().includes(term) ||
    qt.author.toLowerCase().includes(term) ||
    qt.tags.some(t => t.toLowerCase().includes(term))
  );

  qResults.innerHTML = filteredQuotes.slice(0, 8).map((qt, i) =>
    `<button class="search-result-btn" data-i="${i}">${qt.author}: ${qt.text.slice(0, 55)}…</button>`
  ).join("");
  qResults.querySelectorAll(".search-result-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      quoteIndex = Number(btn.dataset.i);
      loadCurrent();
      document.getElementById("controlsPanel").classList.remove("open");
    });
  });
  quoteIndex = 0;
}

// ── Font picker ───────────────────────────────────────────────────────────
document.getElementById("fontPills").addEventListener("click", e => {
  const btn = e.target.closest(".font-pill");
  if (!btn) return;
  document.querySelectorAll(".font-pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  document.documentElement.style.setProperty("--quote-font", btn.dataset.font);
});

// ── Effect picker ─────────────────────────────────────────────────────────
document.getElementById("effectPicker").addEventListener("change", e => {
  currentEffect = Number(e.target.value);
});

// ── WPM slider ────────────────────────────────────────────────────────────
const wpmRange  = document.getElementById("wpmRange");
const wpmLabel  = document.getElementById("wpmLabel");
wpmRange.addEventListener("input", () => {
  wpm = Number(wpmRange.value);
  wpmLabel.textContent = wpm;
  wordScheduleMs = performance.now() + msPerWord();
});

// ── Controls toggle ───────────────────────────────────────────────────────
document.getElementById("ctrlToggle").addEventListener("click", () => {
  document.getElementById("controlsPanel").classList.toggle("open");
});

// ── Expose nav functions globally (called from HTML onclick) ──────────────
window.prevQuote   = prevQuote;
window.nextQuote   = nextQuote;
window.randomQuote = randomQuote;
window.togglePause = togglePause;

// ── Init ──────────────────────────────────────────────────────────────────
initWebGL();
resizeGL();
window.addEventListener("resize", () => { resizeGL(); });

// Pick a random starting quote
quoteIndex = Math.floor(Math.random() * QUOTES.length);
loadCurrent();
requestAnimationFrame(animate);
})();
