(() => {
  const DATA = [
    {
      id: "inuktitut",
      name: "Inuktitut (Inuit language continuum)",
      region: "Arctic regions including Nunavut and Nunavik",
      family: "Eskimo-Aleut family",
      context: "Regional pronunciation and writing vary. Use this as a starter and follow local teacher guidance.",
      tags: ["Inuit Nunangat", "Syllabics", "Oral teaching"],
      phrases: [
        {
          key: "hello",
          label: "Greeting",
          category: "Daily speech",
          setting: "Meeting someone",
          shareMode: "Spoken and written",
          script: "ai, uvlaakkut",
          syllabics: "ᐊᐃ, ᐅᕙᓚᒃᑯᑦ",
          phonetic: "eye oo-vlaak-koot",
          meaning: "Hello, good morning.",
          source: "Common greeting form (regional variation exists)."
        },
        {
          key: "thanks",
          label: "Thanks",
          category: "Daily speech",
          setting: "Community gratitude",
          shareMode: "Spoken and written",
          script: "qujannamiik",
          syllabics: "ᖁᔭᓐᓇᒦᒃ",
          phonetic: "koo-yan-na-meek",
          meaning: "Thank you.",
          source: "Widely used appreciation phrase."
        },
        {
          key: "howareyou",
          label: "How are you?",
          category: "Daily speech",
          setting: "Conversation",
          shareMode: "Spoken and written",
          script: "qanuitpit?",
          syllabics: "ᖃᓄᐃᑦᐱᑦ?",
          phonetic: "ka-noo-it-pit",
          meaning: "How are you?",
          source: "Everyday conversational phrase."
        },
        {
          key: "land",
          label: "Land",
          category: "Place terminology",
          setting: "Geography and stories",
          shareMode: "Spoken and written",
          script: "nuna",
          syllabics: "ᓄᓇ",
          phonetic: "noo-na",
          meaning: "Land / country.",
          source: "Foundational place term in many teaching resources."
        },
        {
          key: "seaice",
          label: "Sea Ice",
          category: "Place terminology",
          setting: "Travel and seasonal knowledge",
          shareMode: "Spoken and written",
          script: "siku",
          syllabics: "ᓯᑯ",
          phonetic: "see-koo",
          meaning: "Sea ice.",
          source: "Common environmental term."
        },
        {
          key: "inuksuk",
          label: "Inuksuk",
          category: "Cultural symbol",
          setting: "Navigation and memory",
          shareMode: "Spoken and written",
          script: "inuksuk",
          syllabics: "ᐃᓄᒃᓱᒃ",
          phonetic: "ee-nook-sook",
          meaning: "Stone marker associated with direction and presence.",
          source: "Publicly shared cultural symbol term."
        },
        {
          key: "nuliajuk",
          label: "Nuliajuk (story figure)",
          category: "Mythology and spirituality",
          setting: "Public story discussion",
          shareMode: "Public spoken/written reference",
          script: "Nuliajuk",
          syllabics: "-",
          phonetic: "noo-lee-ah-yook",
          meaning: "A well-known story figure in some Inuit traditions.",
          source: "Use only publicly shared narratives."
        }
      ]
    },
    {
      id: "mohawk",
      name: "Kanien'keha (Mohawk)",
      region: "Haudenosaunee territories in present-day NY, Quebec, Ontario",
      family: "Iroquoian family",
      context: "Kanien'keha is relational and place-based; dialect, spelling, and protocol vary by community.",
      tags: ["Haudenosaunee", "Iroquoian", "Ceremonial protocols"],
      phrases: [
        {
          key: "hello",
          label: "Greeting",
          category: "Daily speech",
          setting: "Meeting",
          shareMode: "Spoken and written",
          script: "She:kon",
          syllabics: "-",
          phonetic: "shay-gohn",
          meaning: "Hello.",
          source: "Common greeting in learner materials."
        },
        {
          key: "thanks",
          label: "Thanks",
          category: "Daily speech",
          setting: "Respect and gratitude",
          shareMode: "Spoken and written",
          script: "Nia:wen",
          syllabics: "-",
          phonetic: "nee-ah-wen",
          meaning: "Thank you.",
          source: "Widely taught expression of thanks."
        },
        {
          key: "peace",
          label: "Peace",
          category: "Values terminology",
          setting: "Community dialogue",
          shareMode: "Spoken and written",
          script: "Skennen",
          syllabics: "-",
          phonetic: "sken-nen",
          meaning: "Peace.",
          source: "Used in values and greeting contexts."
        },
        {
          key: "people",
          label: "The People",
          category: "Identity terminology",
          setting: "Ancestry context",
          shareMode: "Spoken and written",
          script: "Kanien'keha:ka",
          syllabics: "-",
          phonetic: "ga-nyen-geh-ha-gah",
          meaning: "People of the Flint (Mohawk people).",
          source: "Identity term used in public educational contexts."
        },
        {
          key: "river",
          label: "Great River term",
          category: "Place terminology",
          setting: "Place-based learning",
          shareMode: "Public spoken/written reference",
          script: "Kaniatarowanenneh",
          syllabics: "-",
          phonetic: "gah-nee-yah-dah-roh-wah-nen-neh",
          meaning: "A Mohawk name associated with the St. Lawrence River.",
          source: "Shared in public language resources; local pronunciation guidance preferred."
        },
        {
          key: "thanksgiving",
          label: "Thanksgiving Address",
          category: "Spiritual/civic tradition",
          setting: "Public teaching context",
          shareMode: "Name can be written; full ceremonial form follows protocol",
          script: "Ohen:ton Karihwatehkwen",
          syllabics: "-",
          phonetic: "oh-hen-don ga-ree-wah-teh-gwen",
          meaning: "Words before all else / Thanksgiving Address.",
          source: "Protocol-sensitive tradition; learn with community guidance."
        },
        {
          key: "skywoman",
          label: "Sky Woman (story figure)",
          category: "Mythology and spirituality",
          setting: "Public storytelling summaries",
          shareMode: "Public spoken/written reference",
          script: "Sky Woman",
          syllabics: "-",
          phonetic: "sky wo-man",
          meaning: "Story figure in Haudenosaunee creation narratives.",
          source: "Use community-approved versions of stories."
        }
      ]
    },
    {
      id: "ojibwe",
      name: "Anishinaabemowin (Ojibwe/Chippewa)",
      region: "Great Lakes and central Canada/US regions",
      family: "Algonquian family",
      context: "Anishinaabemowin has many local dialects and orthographies; local speaker guidance is essential.",
      tags: ["Anishinaabe", "Great Lakes", "Dialect diversity"],
      phrases: [
        {
          key: "hello",
          label: "Greeting",
          category: "Daily speech",
          setting: "Meeting",
          shareMode: "Spoken and written",
          script: "Aaniin",
          syllabics: "-",
          phonetic: "aa-neen",
          meaning: "Hello.",
          source: "Common learner greeting."
        },
        {
          key: "thanks",
          label: "Thanks",
          category: "Daily speech",
          setting: "Gratitude",
          shareMode: "Spoken and written",
          script: "Miigwech",
          syllabics: "-",
          phonetic: "mee-gwetch",
          meaning: "Thank you.",
          source: "Common appreciation phrase."
        },
        {
          key: "howareyou",
          label: "How are you?",
          category: "Daily speech",
          setting: "Conversation",
          shareMode: "Spoken and written",
          script: "Aaniin ezhi-ayaayan?",
          syllabics: "-",
          phonetic: "aa-neen eh-zhi ah-yaa-yan",
          meaning: "How are you?",
          source: "Basic conversational form; local variation applies."
        },
        {
          key: "land",
          label: "Land",
          category: "Place terminology",
          setting: "Territory and travel",
          shareMode: "Spoken and written",
          script: "Aki",
          syllabics: "-",
          phonetic: "ah-kee",
          meaning: "Earth / land.",
          source: "Common place term in public learning resources."
        },
        {
          key: "water",
          label: "Water",
          category: "Place terminology",
          setting: "Daily and ceremonial contexts",
          shareMode: "Spoken and written",
          script: "Nibi",
          syllabics: "-",
          phonetic: "nih-bih",
          meaning: "Water.",
          source: "Core environmental term."
        },
        {
          key: "nanabozho",
          label: "Nanabozho (story figure)",
          category: "Mythology and spirituality",
          setting: "Public storytelling",
          shareMode: "Public spoken/written reference",
          script: "Nanabozho",
          syllabics: "-",
          phonetic: "nah-nah-boh-zhoh",
          meaning: "Important story figure in many Anishinaabe narratives.",
          source: "Use community-approved versions of stories."
        },
        {
          key: "midewiwin",
          label: "Midewiwin",
          category: "Spiritual terminology",
          setting: "History and context",
          shareMode: "Name can be written; sacred teachings follow protocol",
          script: "Midewiwin",
          syllabics: "-",
          phonetic: "mih-day-wih-win",
          meaning: "Term connected to an Anishinaabe spiritual tradition.",
          source: "Protocol-sensitive topic; seek community instruction."
        }
      ]
    },
    {
      id: "cree",
      name: "nehiyawewin (Cree)",
      region: "Wide regions across central and northern Canada",
      family: "Algonquian family",
      context: "Cree includes several dialects and both Roman and syllabic writing systems.",
      tags: ["Plains/Woods Cree", "Syllabics", "Oral and written forms"],
      phrases: [
        {
          key: "hello",
          label: "Greeting",
          category: "Daily speech",
          setting: "Meeting",
          shareMode: "Spoken and written",
          script: "taansi",
          syllabics: "ᑖᓂᓯ",
          phonetic: "taan-si",
          meaning: "Hello / How are things?",
          source: "Commonly taught Plains Cree greeting."
        },
        {
          key: "thanks",
          label: "Thanks",
          category: "Daily speech",
          setting: "Gratitude",
          shareMode: "Spoken and written",
          script: "kinanaskomitin",
          syllabics: "ᑭᓇᓈᐢᑯᒥᑎᐣ",
          phonetic: "ki-na-nah-sko-mi-tin",
          meaning: "I thank you.",
          source: "Common thank-you form in learning contexts."
        },
        {
          key: "goodday",
          label: "Good day",
          category: "Daily speech",
          setting: "Conversation",
          shareMode: "Spoken and written",
          script: "miyo kisikaw",
          syllabics: "ᒥᔪ ᑭᓯᑳᐤ",
          phonetic: "mee-yo ki-si-kaaw",
          meaning: "It is a good day.",
          source: "Daily expression; dialect and spelling vary."
        },
        {
          key: "land",
          label: "Land",
          category: "Place terminology",
          setting: "Territory context",
          shareMode: "Spoken and written",
          script: "aski",
          syllabics: "ᐊᐢᑭ",
          phonetic: "ahs-ki",
          meaning: "Land / earth.",
          source: "Core place-based term."
        },
        {
          key: "water",
          label: "Water",
          category: "Place terminology",
          setting: "Travel and daily life",
          shareMode: "Spoken and written",
          script: "nipiy",
          syllabics: "ᓂᐱᕀ",
          phonetic: "nih-pee",
          meaning: "Water.",
          source: "Core environmental term."
        },
        {
          key: "sky",
          label: "Sky",
          category: "Place terminology",
          setting: "Story and weather language",
          shareMode: "Spoken and written",
          script: "kisik",
          syllabics: "ᑭᓯᐠ",
          phonetic: "kih-sik",
          meaning: "Sky.",
          source: "Common teaching term."
        },
        {
          key: "wisakedjak",
          label: "Wisakedjak (story figure)",
          category: "Mythology and spirituality",
          setting: "Public storytelling summaries",
          shareMode: "Public spoken/written reference",
          script: "Wisakedjak",
          syllabics: "-",
          phonetic: "wee-sah-ked-jak",
          meaning: "A story figure in many Cree narrative traditions.",
          source: "Narratives vary by nation and speaker."
        }
      ]
    },
    {
      id: "navajo",
      name: "Dine Bizaad (Navajo)",
      region: "Dine homelands in the US Southwest",
      family: "Athabaskan (Na-Dene) family",
      context: "Dine Bizaad carries deep ceremonial and relational meaning. Use terms with respect and context.",
      tags: ["Dine", "Tone and vowel length", "Living language"],
      phrases: [
        {
          key: "hello",
          label: "Greeting",
          category: "Daily speech",
          setting: "Meeting",
          shareMode: "Spoken and written",
          script: "Ya'at'eeh",
          syllabics: "-",
          phonetic: "yah-ah-teh",
          meaning: "Hello / It is good.",
          source: "Common everyday greeting."
        },
        {
          key: "thanks",
          label: "Thanks",
          category: "Daily speech",
          setting: "Gratitude",
          shareMode: "Spoken and written",
          script: "Ahehee'",
          syllabics: "-",
          phonetic: "ah-heh-heh",
          meaning: "Thank you.",
          source: "Common expression of thanks."
        },
        {
          key: "goodbye",
          label: "Goodbye",
          category: "Daily speech",
          setting: "Parting",
          shareMode: "Spoken and written",
          script: "Hagoonee'",
          syllabics: "-",
          phonetic: "hah-go-neh",
          meaning: "Goodbye / See you again.",
          source: "Common farewell form in learning contexts."
        },
        {
          key: "water",
          label: "Water",
          category: "Place terminology",
          setting: "Land and travel",
          shareMode: "Spoken and written",
          script: "To",
          syllabics: "-",
          phonetic: "toh",
          meaning: "Water.",
          source: "Core place-based term."
        },
        {
          key: "earth",
          label: "Earth",
          category: "Place terminology",
          setting: "Ancestral context",
          shareMode: "Spoken and written",
          script: "Nahasdzan",
          syllabics: "-",
          phonetic: "nah-hahs-zdahn",
          meaning: "Earth.",
          source: "Commonly referenced in learning resources."
        },
        {
          key: "sun",
          label: "Sun",
          category: "Sky terminology",
          setting: "Story and ceremony context",
          shareMode: "Spoken and written",
          script: "Johonaa'ei",
          syllabics: "-",
          phonetic: "jo-hoh-naah-eh-ee",
          meaning: "Sun.",
          source: "Public teaching term; pronunciation varies with speakers."
        },
        {
          key: "changingwoman",
          label: "Changing Woman (story figure)",
          category: "Mythology and spirituality",
          setting: "Public story discussion",
          shareMode: "Public spoken/written reference",
          script: "Asdzaa Nadleehe",
          syllabics: "-",
          phonetic: "ahs-dzah nah-dleh-heh",
          meaning: "A central story figure in many Dine narratives.",
          source: "Follow community guidance for deeper teachings."
        },
        {
          key: "dinetah",
          label: "Dinetah",
          category: "Place terminology",
          setting: "Ancestral homeland reference",
          shareMode: "Spoken and written",
          script: "Dinetah",
          syllabics: "-",
          phonetic: "dee-neh-tah",
          meaning: "Ancestral homeland term.",
          source: "Publicly used geographic and cultural reference."
        }
      ]
    }
  ];

  const STYLE_MAP = {
    classic: {
      scriptFont: '"Marcellus", serif',
      syllabicsFont: '"Noto Sans Canadian Aboriginal", "DM Sans", sans-serif'
    },
    field: {
      scriptFont: '"DM Sans", sans-serif',
      syllabicsFont: '"Noto Sans Canadian Aboriginal", "DM Sans", sans-serif'
    },
    ceremony: {
      scriptFont: '"Cormorant Garamond", serif',
      syllabicsFont: '"Alegreya Sans SC", "Noto Sans Canadian Aboriginal", sans-serif'
    }
  };

  const els = {
    languageSelect: document.getElementById("languageSelect"),
    phraseSelect: document.getElementById("phraseSelect"),
    voiceSelect: document.getElementById("voiceSelect"),
    styleSelect: document.getElementById("styleSelect"),
    phrasePool: document.getElementById("phrasePool"),
    phraseLabel: document.getElementById("phraseLabel"),
    phraseSource: document.getElementById("phraseSource"),
    phraseMeta: document.getElementById("phraseMeta"),
    phraseScript: document.getElementById("phraseScript"),
    syllabicsLine: document.getElementById("syllabicsLine"),
    phoneticLine: document.getElementById("phoneticLine"),
    meaningLine: document.getElementById("meaningLine"),
    usageLine: document.getElementById("usageLine"),
    langName: document.getElementById("langName"),
    langRegion: document.getElementById("langRegion"),
    langFamily: document.getElementById("langFamily"),
    langContext: document.getElementById("langContext"),
    langTags: document.getElementById("langTags"),
    paceRange: document.getElementById("paceRange"),
    paceValue: document.getElementById("paceValue"),
    syllabicsRange: document.getElementById("syllabicsRange"),
    syllabicsValue: document.getElementById("syllabicsValue"),
    playGuide: document.getElementById("playGuide"),
    pauseGuide: document.getElementById("pauseGuide"),
    speakPhrase: document.getElementById("speakPhrase"),
    speakPhonetic: document.getElementById("speakPhonetic"),
    ballCanvas: document.getElementById("ballCanvas")
  };

  const ctx = els.ballCanvas.getContext("2d");
  const rootStyle = document.documentElement.style;

  let languageIndex = 0;
  let phraseIndex = 0;
  let wordEls = [];
  let activeWord = 0;
  let guidePlaying = true;
  let lastTime = performance.now();
  let nextWordTime = performance.now();
  let ballX = 80;
  let voices = [];
  let selectedVoiceURI = "";

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
      `<option value="${i}">${p.category} · ${p.label}</option>`
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
    els.phraseSelect.value = String(phraseIndex);
    els.phraseLabel.textContent = phrase.label;
    els.phraseSource.textContent = phrase.source;
    els.phraseMeta.textContent = `Category: ${phrase.category} | Setting: ${phrase.setting}`;

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
    els.usageLine.textContent = `Share guidance: ${phrase.shareMode}`;

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

  function populateVoiceSelect() {
    if (!("speechSynthesis" in window)) {
      els.voiceSelect.innerHTML = '<option value="">Speech not supported in this browser</option>';
      els.voiceSelect.disabled = true;
      return;
    }

    voices = window.speechSynthesis.getVoices().slice().sort((a, b) => {
      const la = `${a.lang} ${a.name}`.toLowerCase();
      const lb = `${b.lang} ${b.name}`.toLowerCase();
      return la.localeCompare(lb);
    });

    if (!voices.length) {
      els.voiceSelect.innerHTML = '<option value="">Loading voices...</option>';
      return;
    }

    els.voiceSelect.innerHTML = voices.map((v) => {
      const tag = `${v.lang} - ${v.name}`;
      return `<option value="${v.voiceURI}">${tag}</option>`;
    }).join("");

    if (!selectedVoiceURI) {
      const preferred = voices.find((v) => /en-|english/i.test(v.lang));
      selectedVoiceURI = (preferred || voices[0]).voiceURI;
    }

    els.voiceSelect.value = selectedVoiceURI;
  }

  function chooseVoice() {
    if (!voices.length) return null;
    return voices.find((v) => v.voiceURI === selectedVoiceURI) || voices[0];
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

  function applyWritingStyle(styleKey) {
    const style = STYLE_MAP[styleKey] || STYLE_MAP.classic;
    rootStyle.setProperty("--script-font", style.scriptFont);
    rootStyle.setProperty("--syllabics-font", style.syllabicsFont);
  }

  function applySyllabicsScale(pct) {
    const numeric = Math.max(85, Math.min(190, Number(pct)));
    const scale = (numeric / 100).toFixed(2);
    rootStyle.setProperty("--syllabics-scale", String(scale));
    els.syllabicsValue.textContent = String(numeric);
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

    els.voiceSelect.addEventListener("change", (e) => {
      selectedVoiceURI = e.target.value;
    });

    els.styleSelect.addEventListener("change", (e) => {
      applyWritingStyle(e.target.value);
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

    els.syllabicsRange.addEventListener("input", () => {
      applySyllabicsScale(els.syllabicsRange.value);
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
      populateVoiceSelect();
      window.speechSynthesis.onvoiceschanged = () => {
        populateVoiceSelect();
      };
    }
  }

  function frame(now) {
    lastTime = now;
    stepGuide(now);
    drawBall(now);
    requestAnimationFrame(frame);
  }

  function init() {
    populateLanguageSelect();
    populatePhraseSelect();
    renderLanguageMeta();
    renderPhrase();
    applyWritingStyle("classic");
    applySyllabicsScale(els.syllabicsRange.value);
    resizeCanvas();
    els.paceValue.textContent = String(wordsPerMinute());
    attachEvents();
    requestAnimationFrame(frame);
  }

  init();
})();