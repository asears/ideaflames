(() => {
  const N = 256;
  const TWO_PI = Math.PI * 2;

  const waveCanvas = document.getElementById("waveCanvas");
  const spectrumCanvas = document.getElementById("spectrumCanvas");
  const waveCtx = waveCanvas.getContext("2d");
  const spectrumCtx = spectrumCanvas.getContext("2d");

  const baseFreqInput = document.getElementById("baseFreq");
  const richnessInput = document.getElementById("richness");
  const noiseInput = document.getElementById("noise");
  const filterTypeInput = document.getElementById("filterType");
  const cutAInput = document.getElementById("cutA");
  const cutBInput = document.getElementById("cutB");

  const baseFreqValue = document.getElementById("baseFreqValue");
  const richnessValue = document.getElementById("richnessValue");
  const noiseValue = document.getElementById("noiseValue");
  const cutAValue = document.getElementById("cutAValue");
  const cutBValue = document.getElementById("cutBValue");

  const status = document.getElementById("fourierStatus");

  const textTrack = document.getElementById("textTrack");
  let textOffset = 0;

  function resizeCanvas(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(320, Math.floor(canvas.clientWidth * dpr));
    const height = Math.max(220, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function drawGrid(ctx, width, height) {
    ctx.save();
    ctx.strokeStyle = "rgba(212, 167, 74, 0.2)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 8; i++) {
      const y = (height / 8) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    for (let i = 1; i < 12; i++) {
      const x = (width / 12) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    ctx.restore();
  }

  function generateSignal() {
    const base = Number(baseFreqInput.value);
    const richness = Number(richnessInput.value);
    const noise = Number(noiseInput.value);

    const signal = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const t = i / N;
      const v1 = Math.sin(TWO_PI * base * t);
      const v2 = 0.7 * richness * Math.sin(TWO_PI * (base * 2.5) * t + 0.4);
      const v3 = 0.45 * richness * Math.sin(TWO_PI * (base * 5.0) * t + 1.2);
      const v4 = 0.35 * richness * Math.sin(TWO_PI * (base * 8.0) * t + 0.2);
      const n = (Math.random() * 2 - 1) * noise;
      signal[i] = v1 + v2 + v3 + v4 + n;
    }

    return signal;
  }

  function dft(signal) {
    const re = new Float32Array(N);
    const im = new Float32Array(N);
    const mag = new Float32Array(N / 2);

    for (let k = 0; k < N; k++) {
      let sr = 0;
      let si = 0;
      for (let n = 0; n < N; n++) {
        const angle = (TWO_PI * k * n) / N;
        sr += signal[n] * Math.cos(angle);
        si -= signal[n] * Math.sin(angle);
      }
      re[k] = sr;
      im[k] = si;
      if (k < N / 2) {
        mag[k] = Math.sqrt(sr * sr + si * si) / N;
      }
    }

    return { re, im, mag };
  }

  function applyFilter(spec) {
    const type = filterTypeInput.value;
    const cutA = Number(cutAInput.value);
    const cutB = Number(cutBInput.value);

    const re = new Float32Array(spec.re);
    const im = new Float32Array(spec.im);

    for (let k = 0; k < N; k++) {
      const bandK = Math.min(k, N - k);
      let keep = true;

      if (type === "low") {
        keep = bandK <= cutA;
      } else if (type === "high") {
        keep = bandK >= cutA;
      } else if (type === "band") {
        keep = bandK >= Math.min(cutA, cutB) && bandK <= Math.max(cutA, cutB);
      } else if (type === "notch") {
        keep = !(bandK >= Math.min(cutA, cutB) && bandK <= Math.max(cutA, cutB));
      }

      if (!keep) {
        re[k] = 0;
        im[k] = 0;
      }
    }

    const mag = new Float32Array(N / 2);
    for (let k = 0; k < N / 2; k++) {
      mag[k] = Math.sqrt(re[k] * re[k] + im[k] * im[k]) / N;
    }

    return { re, im, mag };
  }

  function idft(spec) {
    const signal = new Float32Array(N);
    for (let n = 0; n < N; n++) {
      let value = 0;
      for (let k = 0; k < N; k++) {
        const angle = (TWO_PI * k * n) / N;
        value += spec.re[k] * Math.cos(angle) - spec.im[k] * Math.sin(angle);
      }
      signal[n] = value / N;
    }
    return signal;
  }

  function drawWave(original, filtered) {
    resizeCanvas(waveCanvas);
    const w = waveCanvas.width;
    const h = waveCanvas.height;

    waveCtx.clearRect(0, 0, w, h);
    drawGrid(waveCtx, w, h);

    let maxAbs = 0.0001;
    for (let i = 0; i < N; i++) {
      maxAbs = Math.max(maxAbs, Math.abs(original[i]), Math.abs(filtered[i]));
    }

    function plot(arr, color) {
      waveCtx.beginPath();
      for (let i = 0; i < N; i++) {
        const x = (i / (N - 1)) * w;
        const y = h * 0.5 - (arr[i] / maxAbs) * h * 0.42;
        if (i === 0) {
          waveCtx.moveTo(x, y);
        } else {
          waveCtx.lineTo(x, y);
        }
      }
      waveCtx.strokeStyle = color;
      waveCtx.lineWidth = 2.2;
      waveCtx.stroke();
    }

    plot(original, "#f9b34e");
    plot(filtered, "#57d1db");

    waveCtx.fillStyle = "#d7e3f3";
    waveCtx.font = `${Math.max(14, Math.floor(h * 0.05))}px Trebuchet MS`;
    waveCtx.fillText("Original", 14, 24);
    waveCtx.fillStyle = "#57d1db";
    waveCtx.fillText("Filtered", 104, 24);
  }

  function drawSpectrum(originalMag, filteredMag) {
    resizeCanvas(spectrumCanvas);
    const w = spectrumCanvas.width;
    const h = spectrumCanvas.height;

    spectrumCtx.clearRect(0, 0, w, h);
    drawGrid(spectrumCtx, w, h);

    const bins = originalMag.length;
    const drawBins = Math.min(64, bins);
    const barW = w / drawBins;

    let maxMag = 0.0001;
    for (let i = 0; i < drawBins; i++) {
      maxMag = Math.max(maxMag, originalMag[i], filteredMag[i]);
    }

    for (let i = 0; i < drawBins; i++) {
      const x = i * barW;
      const h1 = (originalMag[i] / maxMag) * (h * 0.88);
      const h2 = (filteredMag[i] / maxMag) * (h * 0.88);

      spectrumCtx.fillStyle = "rgba(249, 179, 78, 0.32)";
      spectrumCtx.fillRect(x + 1, h - h1, barW - 2, h1);

      spectrumCtx.fillStyle = "rgba(87, 209, 219, 0.68)";
      spectrumCtx.fillRect(x + barW * 0.2, h - h2, barW * 0.6, h2);
    }

    spectrumCtx.fillStyle = "#d7e3f3";
    spectrumCtx.font = `${Math.max(14, Math.floor(h * 0.05))}px Trebuchet MS`;
    spectrumCtx.fillText("Spectrum: Original (amber) vs Filtered (cyan)", 14, 24);
  }

  function updateReadouts() {
    baseFreqValue.textContent = baseFreqInput.value;
    richnessValue.textContent = Number(richnessInput.value).toFixed(2);
    noiseValue.textContent = Number(noiseInput.value).toFixed(2);
    cutAValue.textContent = cutAInput.value;
    cutBValue.textContent = cutBInput.value;
  }

  function recompute() {
    updateReadouts();
    const signal = generateSignal();
    const originalSpec = dft(signal);
    const filteredSpec = applyFilter(originalSpec);
    const filteredSignal = idft(filteredSpec);

    drawWave(signal, filteredSignal);
    drawSpectrum(originalSpec.mag, filteredSpec.mag);

    status.textContent = `N = ${N} samples | filter: ${filterTypeInput.value} | cutoff A/B: ${cutAInput.value}/${cutBInput.value}`;
  }

  function animateText() {
    const storyBox = textTrack.parentElement;
    const scrollable = textTrack.scrollHeight - storyBox.clientHeight;
    textOffset += 0.25;
    if (textOffset > scrollable + 36) {
      textOffset = -20;
    }
    textTrack.style.transform = `translate3d(0, ${-textOffset}px, 0)`;
    requestAnimationFrame(animateText);
  }

  window.addEventListener("resize", recompute);

  [
    baseFreqInput,
    richnessInput,
    noiseInput,
    filterTypeInput,
    cutAInput,
    cutBInput
  ].forEach((el) => el.addEventListener("input", recompute));

  recompute();
  requestAnimationFrame(animateText);
})();
