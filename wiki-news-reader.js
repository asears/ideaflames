(() => {
  const articleTrack     = document.getElementById("articleTrack");
  const rsvpPhrase       = document.getElementById("rsvpPhrase");
  const rsvpProgressBar  = document.getElementById("rsvpProgressBar");
  const rsvpCounter      = document.getElementById("rsvpCounter");
  const readerVertical   = document.getElementById("readerVertical");
  const readerHorizontal = document.getElementById("readerHorizontal");

  const status      = document.getElementById("wikiStatus");
  const wikiMeta    = document.getElementById("wikiMeta");

  const loadButton  = document.getElementById("loadArticle");
  const pauseButton = document.getElementById("pauseScroll");
  const modeSelect  = document.getElementById("modeSelect");
  const speedRange  = document.getElementById("speedRange");
  const speedLabel  = document.getElementById("speedLabel");
  const speedValue  = document.getElementById("speedValue");
  const phraseSize  = document.getElementById("phraseSize");
  const phraseValue = document.getElementById("phraseValue");

  let paused = false;
  let articleOffset = 0;
  let lastFrame = performance.now();

  // RSVP state
  let rsvpPhrases = [];
  let rsvpIndex   = 0;
  let rsvpNextMs  = 0;

  function getWpm()         { return Math.max(30, Number(speedRange.value)); }
  function getPhraseWords() { return Math.max(1, Number(phraseSize.value)); }
  function msPerPhrase()    { return (getPhraseWords() / getWpm()) * 60000; }

  function updateReadouts() {
    speedValue.textContent  = String(speedRange.value);
    phraseValue.textContent = String(phraseSize.value);
    if (speedLabel) speedLabel.textContent = modeSelect.value === "horizontal" ? "Speed (WPM)" : "Scroll Speed";
  }

  // RSVP rendering
  function showRsvpPhrase(i) {
    if (!rsvpPhrases.length || !rsvpPhrase) return;
    rsvpPhrase.classList.remove("rsvp-flash");
    void rsvpPhrase.offsetWidth; // trigger reflow to restart CSS animation
    rsvpPhrase.textContent = rsvpPhrases[i] || "";
    rsvpPhrase.classList.add("rsvp-flash");
    if (rsvpCounter) rsvpCounter.textContent = `${i + 1}\u2009/\u2009${rsvpPhrases.length}`;
    if (rsvpProgressBar) {
      const pct = rsvpPhrases.length > 1 ? (i / (rsvpPhrases.length - 1)) * 100 : 100;
      rsvpProgressBar.style.width = `${pct}%`;
    }
  }

  function buildRsvpPhrases(text) {
    rsvpPhrases = chunkWords(text, getPhraseWords());
    rsvpIndex   = 0;
    showRsvpPhrase(0);
    rsvpNextMs  = performance.now() + msPerPhrase();
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

    buildRsvpPhrases(article.extract);

    articleOffset = 0;
    readerVertical.scrollTop = 0;

    wikiMeta.innerHTML = [
      `<p><strong>Title:</strong> ${article.title}</p>`,
      `<p><strong>Source:</strong> <a href="${article.articleUrl}" target="_blank" rel="noopener noreferrer">Wikipedia (English)</a></p>`,
      `<p><strong>RSVP mode:</strong> Showing ${getPhraseWords()} word(s) at a time at ${getWpm()} WPM.</p>`
    ].join("");
  }

  function animate(now) {
    const dt = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;

    if (!paused) {
      if (modeSelect.value === "vertical") {
        articleOffset += Number(speedRange.value) * dt;
        const maxScroll = Math.max(0, articleTrack.scrollHeight - readerVertical.clientHeight + 30);
        if (articleOffset > maxScroll) articleOffset = 0;
        readerVertical.scrollTop = articleOffset;
      } else {
        // RSVP: advance phrase on timer
        if (rsvpPhrases.length > 0 && now >= rsvpNextMs) {
          rsvpIndex = (rsvpIndex + 1) % rsvpPhrases.length;
          showRsvpPhrase(rsvpIndex);
          rsvpNextMs = now + msPerPhrase();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  function applyMode() {
    const isH = modeSelect.value === "horizontal";
    readerVertical.hidden   = isH;
    readerHorizontal.hidden = !isH;
    updateReadouts();
    if (isH && rsvpPhrases.length) {
      showRsvpPhrase(rsvpIndex);
      rsvpNextMs = performance.now() + msPerPhrase();
    }
  }

  function togglePause() {
    paused = !paused;
    pauseButton.textContent = paused ? "Resume" : "Pause";
    if (!paused) rsvpNextMs = performance.now() + msPerPhrase();
  }

  modeSelect.addEventListener("change", applyMode);

  speedRange.addEventListener("input", () => {
    updateReadouts();
  });

  phraseSize.addEventListener("input", () => {
    updateReadouts();
    const text = Array.from(articleTrack.querySelectorAll("p"))
      .map(p => p.textContent || "").join(" ").trim();
    if (text.length > 10) buildRsvpPhrases(text);
  });

  loadButton.addEventListener("click", loadRandomNewsArticle);
  pauseButton.addEventListener("click", togglePause);

  updateReadouts();
  applyMode();
  requestAnimationFrame(animate);
  loadRandomNewsArticle();
})();
