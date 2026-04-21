(() => {
  const canvas = document.getElementById("mercatorCanvas");
  const ctx = canvas.getContext("2d");
  const tileImage = document.getElementById("tileImage");
  const refreshButton = document.getElementById("refreshTile");
  const zoomRange = document.getElementById("zoomRange");
  const zoomValue = document.getElementById("zoomValue");
  const tileMeta = document.getElementById("tileMeta");
  const status = document.getElementById("mercatorStatus");

  const layers = [
    { name: "MODIS_Terra_CorrectedReflectance_TrueColor", format: "jpg" },
    { name: "VIIRS_SNPP_CorrectedReflectance_TrueColor", format: "jpg" },
    { name: "MODIS_Aqua_CorrectedReflectance_TrueColor", format: "jpg" }
  ];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(380, Math.floor(canvas.clientWidth * dpr));
    const height = Math.max(280, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function tileToLon(x, z) {
    return (x / Math.pow(2, z)) * 360 - 180;
  }

  function tileToLat(y, z) {
    const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }

  function lonLatToPixel(lon, lat, w, h) {
    const x = ((lon + 180) / 360) * w;
    const clamped = Math.max(-85.05112878, Math.min(85.05112878, lat));
    const latRad = (clamped * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = (1 - mercN / Math.PI) * 0.5 * h;
    return { x, y };
  }

  function drawWorld() {
    resize();
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#112033");
    bg.addColorStop(1, "#08131f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(206, 184, 140, 0.24)";
    ctx.lineWidth = 1;

    for (let lon = -180; lon <= 180; lon += 30) {
      const x = ((lon + 180) / 360) * w;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    for (let lat = -75; lat <= 75; lat += 15) {
      const p = lonLatToPixel(0, lat, w, h);
      ctx.beginPath();
      ctx.moveTo(0, p.y);
      ctx.lineTo(w, p.y);
      ctx.stroke();
    }
  }

  function randomDateString() {
    const now = new Date();
    const backDays = Math.floor(Math.random() * 18);
    const d = new Date(now.getTime() - backDays * 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  }

  function buildRandomTile() {
    const z = Number(zoomRange.value);
    const n = Math.pow(2, z);
    const x = Math.floor(Math.random() * n);
    const y = Math.floor(Math.random() * n);

    const layer = layers[Math.floor(Math.random() * layers.length)];
    const date = randomDateString();
    const url = `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer.name}/default/${date}/GoogleMapsCompatible_Level${z}/${z}/${y}/${x}.${layer.format}`;

    return { z, x, y, layer, date, url };
  }

  function drawTileFootprint(tile) {
    drawWorld();
    const w = canvas.width;
    const h = canvas.height;

    const leftLon = tileToLon(tile.x, tile.z);
    const rightLon = tileToLon(tile.x + 1, tile.z);
    const topLat = tileToLat(tile.y, tile.z);
    const bottomLat = tileToLat(tile.y + 1, tile.z);

    const p1 = lonLatToPixel(leftLon, topLat, w, h);
    const p2 = lonLatToPixel(rightLon, bottomLat, w, h);

    ctx.fillStyle = "rgba(88, 206, 214, 0.28)";
    ctx.strokeStyle = "rgba(255, 202, 96, 0.95)";
    ctx.lineWidth = 2;

    const rw = Math.max(2, p2.x - p1.x);
    const rh = Math.max(2, p2.y - p1.y);
    ctx.fillRect(p1.x, p1.y, rw, rh);
    ctx.strokeRect(p1.x, p1.y, rw, rh);

    ctx.fillStyle = "#f5ddb0";
    ctx.font = `${Math.max(14, Math.floor(h * 0.04))}px Trebuchet MS`;
    ctx.fillText(`Tile footprint z/x/y: ${tile.z}/${tile.x}/${tile.y}`, 14, 26);
  }

  function setMeta(tile) {
    tileMeta.innerHTML = [
      `<p><strong>Layer:</strong> ${tile.layer.name}</p>`,
      `<p><strong>Date:</strong> ${tile.date}</p>`,
      `<p><strong>Tile:</strong> ${tile.z}/${tile.x}/${tile.y}</p>`,
      `<p><strong>URL:</strong> <a href="${tile.url}" target="_blank" rel="noopener noreferrer">Open source tile</a></p>`
    ].join("");
  }

  function tryLoadRandomTile(attempt = 0) {
    const tile = buildRandomTile();
    zoomValue.textContent = String(tile.z);

    status.textContent = `Loading ${tile.layer.name} (${tile.date}) at z/x/y ${tile.z}/${tile.x}/${tile.y}...`;

    tileImage.onload = () => {
      drawTileFootprint(tile);
      setMeta(tile);
      status.textContent = "Loaded random NASA GIBS tile and projected its Web Mercator footprint.";
    };

    tileImage.onerror = () => {
      if (attempt < 5) {
        tryLoadRandomTile(attempt + 1);
      } else {
        status.textContent = "Could not fetch a random tile after several tries. Try refreshing again.";
      }
    };

    tileImage.src = tile.url;
  }

  refreshButton.addEventListener("click", () => tryLoadRandomTile(0));

  zoomRange.addEventListener("input", () => {
    zoomValue.textContent = zoomRange.value;
    tryLoadRandomTile(0);
  });

  window.addEventListener("resize", () => {
    drawWorld();
  });

  drawWorld();
  tryLoadRandomTile(0);
})();
