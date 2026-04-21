(() => {
  const DATA = [
    {
      id: "inuktitut",
      name: "Inuktitut (Inuit language continuum)",
      region: "Arctic regions including Nunavut and Nunavik",
      family: "Eskimo-Aleut family",
      context: "Many communities use Inuktitut, Inuinnaqtun, and related varieties. Orthographies and pronunciation vary by region.",
      tags: ["Inuit Nunangat", "Syllabics", "Oral teaching"],
      phrases: [
        {
          key: "hello",
          label: "Greeting",
          script: "ai, uvlaakkut",
          syllabics: "ᐊᐃ, ᐅᕙᓚᒃᑯᑦ",
          phonetic: "eye oo-vlaak-koot",
          meaning: "Hello, good morning.",
          source: "Common greeting form (regional variation exists)."
        },
        {
          key: "thanks",
          label: "Thanks",
          script: "qujannamiik",
          syllabics: "ᖁᔭᓐᓇᒦᒃ",
          phonetic: "koo-yan-na-meek",
          meaning: "Thank you.",
          source: "Widely used appreciation phrase."
        },
        {
          key: "howareyou",
          label: "How are you?",
          script: "qanuitpit?",
          syllabics: "ᖃᓄᐃᑦᐱᑦ?",
          phonetic: "ka-noo-it-pit",
          meaning: "How are you?",
          source: "Everyday conversational phrase."
        }
      ]
    },
    {
      id: "mohawk",
      name: "Kanien'keha (Mohawk)",
      region: "Haudenosaunee territories in present-day NY, Quebec, Ontario",
      family: "Iroquoian family",
      context: "Kanien'keha is a living Haudenosaunee language with rich ceremonial and relational speech contexts.",
      tags: ["Haudenosaunee", "Iroquoian", "Ceremonial protocols"],
      phrases: [
        {
          key: "hello",
          label: "Greeting",
          script: "She:kon",
          syllabics: "-",
          phonetic: "shay-gohn",
          meaning: "Hello.",
          source: "Common greeting in many learning materials."
        },
        {
          key: "thanks",
          label: "Thanks",
          script: "Nia:wen",
          syllabics: "-",
          phonetic: "nee-ah-wen",
          meaning: "Thank you.",
          source: "Widely taught expression of thanks."
        },
        {
          key: "peace",
          label: "Peace",
          script: "Skennen",
          syllabics: "-",
          phonetic: "sken-nen",
          meaning: "Peace.",
          source: "Used in values and greeting contexts."
        }
      ]
    },
    {
      id: "ojibwe",
      name: "Anishinaabemowin (Ojibwe/Chippewa)",
      region: "Great Lakes and central Canada/US regions",
      family: "Algonquian family",
      context: "Anishinaabemowin has many local dialects. Respect local elders and speakers for pronunciation and spelling preference.",
      tags: ["Anishinaabe", "Great Lakes", "Dialect diversity"],
      phrases: [
        {
          key: "hello",
          label: "Greeting",
          script: "Aaniin",
          syllabics: "-",
          phonetic: "aa-neen",
          meaning: "Hello.",
          source: "Common learner greeting."
        },
        {
          key: "thanks",
          label: "Thanks",
          script: "Miigwech",
          syllabics: "-",
          phonetic: "mee-gwetch",
          meaning: "Thank you.",
          source: "Common appreciation phrase."
        },
        {
          key: "howareyou",
          label: "How are you?",
          script: "Aaniin ezhi-ayaayan?",
          syllabics: "-",
          phonetic: "aa-neen eh-zhi ah-yaa-yan",
          meaning: "How are you?",
          source: "Basic conversational form; local variation applies."
        }
      ]
    },
    {
      id: "cree",
      name: "nehiyawewin (Cree)",
      region: "Wide regions across central and northern Canada",
      family: "Algonquian family",
      context: "Cree includes several dialects and writing systems, including syllabics in many communities.",
      tags: ["Plains/Woods Cree", "Syllabics", "Oral and written forms"],
      phrases: [
        {
          key: "hello",
          label: "Greeting",
          script: "taansi",
          syllabics: "ᑖᓂᓯ",
          phonetic: "taan-si",
          meaning: "Hello / How are things?",
          source: "Commonly taught Plains Cree greeting."
        },
        {
          key: "thanks",
          label: "Thanks",
          script: "kinanaskomitin",
          syllabics: "ᑭᓇᓈᐢᑯᒥᑎᐣ",
          phonetic: "ki-na-nah-sko-mi-tin",
          meaning: "I thank you.",
          source: "Common thank-you form in learning contexts."
        },
        {
          key: "goodday",
          label: "Good day",
          script: "miyo kisikaw",
          syllabics: "ᒥᔪ ᑭᓯᑳᐤ",
          phonetic: "mee-yo ki-si-kaaw",
          meaning: "It is a good day.",
          source: "Daily expression; dialect and spelling vary."
        }
      ]
    },
    {
      id: "navajo",
      name: "Dine Bizaad (Navajo)",
      region: "Dine homelands in the US Southwest",
      family: "Athabaskan (Na-Dene) family",
      context: "Dine Bizaad carries deep cultural and ceremonial meaning; context and respectful use matter.",
      tags: ["Dine", "Tone and vowel length", "Living language"],
      phrases: [
        {
          key: "hello",
          label: "Greeting",
          script: "Ya'at'eeh",
          syllabics: "-",
          phonetic: "yah-ah-teh",
          meaning: "Hello / It is good.",
          source: "Common everyday greeting."
        },
        {
          key: "thanks",
          label: "Thanks",
          script: "Ahehee'",
          syllabics: "-",
          phonetic: "ah-heh-heh",
          meaning: "Thank you.",
          source: "Common expression of thanks."
        },
        {
          key: "goodbye",
          label: "Goodbye",
          script: "Hagoonee'",
          syllabics: "-",
          phonetic: "hah-go-neh",
          meaning: "Goodbye / See you again.",
          source: "Common farewell form in learning contexts."
        }
      ]
    }
  ];

  const els = {
    languageSelect: document.getElementById("languageSelect"),
    phraseSelect: document.getElementById("phraseSelect"),
    phrasePool: document.getElementById("phrasePool"),
    phraseLabel: document.getElementById("phraseLabel"),
    phraseSource: document.getElementById("phraseSource"),
    phraseScript: document.getElementById("phraseScript"),
    syllabicsLine: document.getElementById("syllabicsLine"),
    phoneticLine: document.getElementById("phoneticLine"),
    meaningLine: document.getElementById("meaningLine"),
    langName: document.getElementById("langName"),
    langRegion: document.getElementById("langRegion"),
    langFamily: document.getElementById("langFamily"),
    langContext: document.getElementById("langContext"),
    langTags: document.getElementById("langTags"),
    paceRange: document.getElementById("paceRange"),
    paceValue: document.getElementById("paceValue"),
    playGuide: document.getElementById("playGuide"),
    pauseGuide: document.getElementById("pauseGuide"),
    speakPhrase: document.getElementById("speakPhrase"),
    speakPhonetic: document.getElementById("speakPhonetic"),
    ballCanvas: document.getElementById("ballCanvas")
  };

  const ctx = els.ballCanvas.getContext("2d");

  let languageIndex = 0;
  let phraseIndex = 0;
  let wordEls = [];
  let activeWord = 0;
  let guidePlaying = true;
  let lastTime = performance.now();
  let nextWordTime = performance.now();
  let ballX = 80;
  let voices = [];

  function wordsPerMinute() {
    return Math.max(40, Number(els.paceRange.value));
  }

  function msPerWord() {
    return 60000 / wordsPerMinute();
  }

  function getCurrentLanguage() {
    return DATA[languageIndex];
  }

  function getCurrentPhrase() {
    return getCurrentLanguage().phrases[phraseIndex];
  }

  function populateLanguageSelect() {
    els.languageSelect.innerHTML = DATA.map((lang, i) =>
      `<option value="${i}">${lang.name}</option>`
    ).join("");
  }

  function populatePhraseSelect() {
    const lang = getCurrentLanguage();
    els.phraseSelect.innerHTML = lang.phrases.map((p, i) =>
      `<option value="${i}">${p.label}</option>`
    ).join("");

    els.phrasePool.innerHTML = lang.phrases.map((p, i) =>
      `<button class="phrase-pick ${i === phraseIndex ? "active" : ""}" data-index="${i}">${p.label}</button>`
    ).join("");
  }

  function renderLanguageMeta() {
    const lang = getCurrentLanguage();
    els.langName.textContent = lang.name;
    els.langRegion.textContent = `Region: ${lang.region}`;
    els.langFamily.textContent = `Language family: ${lang.family}`;
    els.langContext.textContent = lang.context;
    els.langTags.innerHTML = lang.tags.map((tag) => `<span class="chip">${tag}</span>`).join("");
  }

  function renderPhrase() {
    const phrase = getCurrentPhrase();
    els.phraseLabel.textContent = phrase.label;
    els.phraseSource.textContent = phrase.source;

    const words = phrase.script.trim().split(/\s+/);
    els.phraseScript.innerHTML = words
      .map((w, i) => `<span class="word ${i === 0 ? "active" : ""}" data-word="${i}">${w}</span>`)
      .join(" ");

    wordEls = Array.from(els.phraseScript.querySelectorAll(".word"));
    activeWord = 0;

    if (phrase.syllabics && phrase.syllabics !== "-") {
      els.syllabicsLine.textContent = `Syllabics/Symbols: ${phrase.syllabics}`;
    } else {
      els.syllabicsLine.textContent = "Syllabics/Symbols: not shown for this phrase variant";
    }

    els.phoneticLine.textContent = `Phonetic guide: ${phrase.phonetic}`;
    els.meaningLine.textContent = `Meaning: ${phrase.meaning}`;

    els.phrasePool.querySelectorAll(".phrase-pick").forEach((btn, i) => {
      btn.classList.toggle("active", i === phraseIndex);
    });

    nextWordTime = performance.now() + msPerWord();
  }

  function setActiveWord(i) {
    if (!wordEls.length) return;
    wordEls.forEach((el, idx) => el.classList.toggle("active", idx === i));
  }

  function resizeCanvas() {
    const rect = els.ballCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    els.ballCanvas.width = Math.floor(rect.width * dpr);
    els.ballCanvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawBall(now) {
    const rect = els.ballCanvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (!wordEls.length) return;

    const phraseRect = els.phraseScript.getBoundingClientRect();
    const active = wordEls[Math.min(activeWord, wordEls.length - 1)];
    const activeRect = active.getBoundingClientRect();

    const targetX = (activeRect.left + activeRect.width * 0.5) - phraseRect.left;
    ballX += (targetX - ballX) * 0.14;

    const bounceY = 38 + Math.sin(now * 0.011) * 14;

    ctx.beginPath();
    ctx.setLineDash([4, 5]);
    ctx.moveTo(ballX, bounceY + 10);
    ctx.lineTo(ballX, rect.height);
    ctx.strokeStyle = "rgba(240,157,69,0.36)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);

    const halo = ctx.createRadialGradient(ballX, bounceY, 0, ballX, bounceY, 18);
    halo.addColorStop(0, "rgba(240,157,69,0.65)");
    halo.addColorStop(1, "rgba(240,157,69,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(ballX, bounceY, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(ballX, bounceY, 8.5, 0, Math.PI * 2);
    ctx.fillStyle = "#f2b257";
    ctx.fill();

    ctx.strokeStyle = "rgba(108,167,201,0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10, rect.height - 12);
    ctx.quadraticCurveTo(rect.width * 0.3, rect.height - 20, rect.width * 0.5, rect.height - 12);
    ctx.quadraticCurveTo(rect.width * 0.7, rect.height - 6, rect.width - 10, rect.height - 12);
    ctx.stroke();
  }

  function stepGuide(now) {
    if (!guidePlaying || !wordEls.length) return;
    if (now < nextWordTime) return;

    activeWord = (activeWord + 1) % wordEls.length;
    setActiveWord(activeWord);
    nextWordTime = now + msPerWord();
  }

  function chooseVoice() {
    if (!voices.length) return null;
    const preferred = voices.find((v) => /en-|english/i.test(v.lang));
    return preferred || voices[0];
  }

  function speak(text, rate = 0.86) {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = rate;
    utter.pitch = 1.0;
    const voice = chooseVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  function handleLanguageChange(i) {
    languageIndex = Number(i);
    phraseIndex = 0;
    populatePhraseSelect();
    renderLanguageMeta();
    renderPhrase();
  }

  function handlePhraseChange(i) {
    phraseIndex = Number(i);
    renderPhrase();
  }

  function attachEvents() {
    els.languageSelect.addEventListener("change", (e) => {
      handleLanguageChange(e.target.value);
    });

    els.phraseSelect.addEventListener("change", (e) => {
      handlePhraseChange(e.target.value);
    });

    els.phrasePool.addEventListener("click", (e) => {
      const btn = e.target.closest(".phrase-pick");
      if (!btn) return;
      handlePhraseChange(btn.dataset.index);
      els.phraseSelect.value = String(phraseIndex);
    });

    els.paceRange.addEventListener("input", () => {
      els.paceValue.textContent = String(wordsPerMinute());
      nextWordTime = performance.now() + msPerWord();
    });

    els.playGuide.addEventListener("click", () => {
      guidePlaying = true;
      nextWordTime = performance.now() + msPerWord();
    });

    els.pauseGuide.addEventListener("click", () => {
      guidePlaying = false;
    });

    els.speakPhrase.addEventListener("click", () => {
      const phrase = getCurrentPhrase();
      speak(phrase.script, 0.84);
    });

    els.speakPhonetic.addEventListener("click", () => {
      const phrase = getCurrentPhrase();
      speak(phrase.phonetic, 0.77);
    });

    window.addEventListener("resize", resizeCanvas);

    if ("speechSynthesis" in window) {
      voices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
      };
    }
  }

  function frame(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    if (dt >= 0) {
      stepGuide(now);
      drawBall(now);
    }
    requestAnimationFrame(frame);
  }

  function init() {
    populateLanguageSelect();
    populatePhraseSelect();
    renderLanguageMeta();
    renderPhrase();
    resizeCanvas();
    els.paceValue.textContent = String(wordsPerMinute());
    attachEvents();
    requestAnimationFrame(frame);
  }

  init();
})();