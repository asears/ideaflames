(() => {
  const articleTrack = document.getElementById("articleTrack");
  const phraseTrack = document.getElementById("phraseTrack");
  const readerVertical = document.getElementById("readerVertical");
  const readerHorizontal = document.getElementById("readerHorizontal");

  const status = document.getElementById("wikiStatus");
  const wikiMeta = document.getElementById("wikiMeta");

  const loadButton = document.getElementById("loadArticle");
  const pauseButton = document.getElementById("pauseScroll");
  const modeSelect = document.getElementById("modeSelect");
  const speedRange = document.getElementById("speedRange");
  const speedValue = document.getElementById("speedValue");
  const phraseSize = document.getElementById("phraseSize");
  const phraseValue = document.getElementById("phraseValue");

  let paused = false;
  let speed = Number(speedRange.value);
  let phraseWordCount = Number(phraseSize.value);

  let articleOffset = 0;
  let phraseOffset = 0;
  let lastFrame = performance.now();

  let phraseTextWidth = 0;

  function updateReadouts() {
    speed = Number(speedRange.value);
    phraseWordCount = Number(phraseSize.value);
    speedValue.textContent = String(speed);
    phraseValue.textContent = String(phraseWordCount);
  }

  function chunkWords(text, chunkSize) {
    const words = text
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean);

    const chunks = [];
    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(" "));
    }
    return chunks;
  }

  async function fetchCurrentEventLinks() {
    const endpoint = "https://en.wikipedia.org/w/api.php?action=parse&page=Portal:Current_events&prop=links&format=json&origin=*";
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Could not fetch current events links from Wikipedia.");
    }

    const data = await response.json();
    const links = data?.parse?.links || [];

    const candidates = links
      .filter((link) => link.ns === 0)
      .map((link) => link["*"])
      .filter((title) => !title.includes(":"))
      .filter((title) => title.length > 2)
      .filter((title) => !title.toLowerCase().includes("current events"));

    return [...new Set(candidates)];
  }

  async function fetchArticleByTitle(title) {
    const encoded = encodeURIComponent(title);
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
    const summaryResp = await fetch(summaryUrl);
    if (!summaryResp.ok) {
      throw new Error(`Failed to load article summary for ${title}.`);
    }
    const summary = await summaryResp.json();

    const extract = summary.extract || "";
    if (!extract || extract.length < 180) {
      throw new Error("Article text was too short for speed reading.");
    }

    const articleUrl = summary.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encoded}`;

    return {
      title: summary.title || title,
      extract,
      description: summary.description || "Wikipedia article linked from current events",
      articleUrl
    };
  }

  async function loadRandomNewsArticle() {
    status.textContent = "Fetching current events article links...";

    try {
      const links = await fetchCurrentEventLinks();
      if (links.length < 1) {
        throw new Error("No article links were found on current events.");
      }

      let article = null;
      let attempts = 0;
      while (!article && attempts < 12) {
        const title = links[Math.floor(Math.random() * links.length)];
        attempts += 1;
        try {
          article = await fetchArticleByTitle(title);
        } catch (_err) {
          // Retry until a good-length article from current events is found.
        }
      }

      if (!article) {
        throw new Error("Could not find a suitable news article after several attempts.");
      }

      renderArticle(article);
      status.textContent = "Loaded random Wikipedia current-events article.";
    } catch (err) {
      status.textContent = err.message;
    }
  }

  function renderArticle(article) {
    const paragraphs = article.extract
      .split(/(?<=[.!?])\s+/)
      .filter((line) => line.trim().length > 0)
      .map((line) => `<p>${line.trim()}</p>`)
      .join("");

    articleTrack.innerHTML = `
      <h2>${article.title}</h2>
      <p class="article-desc">${article.description}</p>
      ${paragraphs}
      <p><a href="${article.articleUrl}" target="_blank" rel="noopener noreferrer">Read full article on Wikipedia</a></p>
      <p class="article-tail">End of article. Auto-looping scroll enabled.</p>
    `;

    const phraseChunks = chunkWords(article.extract, phraseWordCount);
    phraseTrack.innerHTML = "";
    phraseChunks.forEach((chunk) => {
      const span = document.createElement("span");
      span.className = "phrase-chip";
      span.textContent = chunk;
      phraseTrack.appendChild(span);
    });

    articleOffset = 0;
    phraseOffset = 0;
    readerVertical.scrollTop = 0;

    requestAnimationFrame(() => {
      phraseTextWidth = phraseTrack.scrollWidth;
    });

    wikiMeta.innerHTML = [
      `<p><strong>Title:</strong> ${article.title}</p>`,
      `<p><strong>Source:</strong> <a href="${article.articleUrl}" target="_blank" rel="noopener noreferrer">Wikipedia (English)</a></p>`,
      `<p><strong>Mode Tip:</strong> Horizontal mode groups words into phrase chips for speed readers.</p>`
    ].join("");
  }

  function animate(now) {
    const dt = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;

    if (!paused) {
      if (modeSelect.value === "vertical") {
        articleOffset += speed * dt;
        const maxScroll = Math.max(0, articleTrack.scrollHeight - readerVertical.clientHeight + 30);
        if (articleOffset > maxScroll) {
          articleOffset = 0;
        }
        readerVertical.scrollTop = articleOffset;
      } else {
        phraseOffset += speed * dt;
        const width = Math.max(phraseTextWidth, readerHorizontal.clientWidth);
        const cycle = width + readerHorizontal.clientWidth + 40;
        if (phraseOffset > cycle) {
          phraseOffset = 0;
        }
        const x = readerHorizontal.clientWidth - phraseOffset;
        phraseTrack.style.transform = `translate3d(${x}px, 0, 0)`;
      }
    }

    requestAnimationFrame(animate);
  }

  function applyMode() {
    const mode = modeSelect.value;
    if (mode === "vertical") {
      readerVertical.hidden = false;
      readerHorizontal.hidden = true;
    } else {
      readerVertical.hidden = true;
      readerHorizontal.hidden = false;
      phraseTrack.style.transform = `translate3d(${readerHorizontal.clientWidth}px, 0, 0)`;
    }
  }

  function togglePause() {
    paused = !paused;
    pauseButton.textContent = paused ? "Resume" : "Pause";
  }

  modeSelect.addEventListener("change", applyMode);

  speedRange.addEventListener("input", () => {
    updateReadouts();
  });

  phraseSize.addEventListener("input", () => {
    updateReadouts();
    if (articleTrack.textContent.trim().length > 0) {
      const plainText = Array.from(articleTrack.querySelectorAll("p"))
        .map((p) => p.textContent || "")
        .join(" ");
      const chunks = chunkWords(plainText, phraseWordCount);
      phraseTrack.innerHTML = "";
      chunks.forEach((chunk) => {
        const span = document.createElement("span");
        span.className = "phrase-chip";
        span.textContent = chunk;
        phraseTrack.appendChild(span);
      });
      requestAnimationFrame(() => {
        phraseTextWidth = phraseTrack.scrollWidth;
      });
    }
  });

  loadButton.addEventListener("click", loadRandomNewsArticle);
  pauseButton.addEventListener("click", togglePause);

  window.addEventListener("resize", () => {
    phraseTextWidth = phraseTrack.scrollWidth;
  });

  updateReadouts();
  applyMode();
  requestAnimationFrame(animate);
  loadRandomNewsArticle();
})();
