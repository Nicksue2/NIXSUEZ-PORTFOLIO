// --- DATA ---
const kanaData = {
  hiragana: {
    Basic: {
      "あ a": [{j:"あ",r:"a"},{j:"い",r:"i"},{j:"う",r:"u"},{j:"え",r:"e"},{j:"お",r:"o"}],
      "か ka": [{j:"か",r:"ka"},{j:"き",r:"ki"},{j:"く",r:"ku"},{j:"け",r:"ke"},{j:"こ",r:"ko"}],
      "さ sa": [{j:"さ",r:"sa"},{j:"し",r:"shi"},{j:"す",r:"su"},{j:"せ",r:"se"},{j:"そ",r:"so"}],
      "た ta": [{j:"た",r:"ta"},{j:"ち",r:"chi"},{j:"つ",r:"tsu"},{j:"て",r:"te"},{j:"と",r:"to"}],
      "な na": [{j:"な",r:"na"},{j:"に",r:"ni"},{j:"ぬ",r:"nu"},{j:"ね",r:"ne"},{j:"の",r:"no"}],
      "は ha": [{j:"は",r:"ha"},{j:"ひ",r:"hi"},{j:"ふ",r:"fu"},{j:"へ",r:"he"},{j:"ほ",r:"ho"}],
      "ま ma": [{j:"ま",r:"ma"},{j:"み",r:"mi"},{j:"む",r:"mu"},{j:"め",r:"me"},{j:"も",r:"mo"}],
      "や ya": [{j:"や",r:"ya"},{j:"ゆ",r:"yu"},{j:"よ",r:"yo"}],
      "ら ra": [{j:"ら",r:"ra"},{j:"り",r:"ri"},{j:"る",r:"ru"},{j:"れ",r:"re"},{j:"ろ",r:"ro"}],
      "わ wa": [{j:"わ",r:"wa"},{j:"を",r:"wo"},{j:"ん",r:"n"}]
    },
    Dakuten: {
      "が ga": [{j:"が",r:"ga"},{j:"ぎ",r:"gi"},{j:"ぐ",r:"gu"},{j:"げ",r:"ge"},{j:"ご",r:"go"}],
      "ざ za": [{j:"ざ",r:"za"},{j:"じ",r:"ji"},{j:"ず",r:"zu"},{j:"ぜ",r:"ze"},{j:"ぞ",r:"zo"}],
      "だ da": [{j:"だ",r:"da"},{j:"ぢ",r:"ji"},{j:"づ",r:"zu"},{j:"で",r:"de"},{j:"ど",r:"do"}],
      "ば ba": [{j:"ば",r:"ba"},{j:"び",r:"bi"},{j:"ぶ",r:"bu"},{j:"べ",r:"be"},{j:"ぼ",r:"bo"}],
      "ぱ pa": [{j:"ぱ",r:"pa"},{j:"ぴ",r:"pi"},{j:"ぷ",r:"pu"},{j:"ぺ",r:"pe"},{j:"ぽ",r:"po"}]
    },
    Combinations: {
      "きゃ kya": [{j:"きゃ",r:"kya"},{j:"きゅ",r:"kyu"},{j:"きょ",r:"kyo"}],
      "しゃ sha": [{j:"しゃ",r:"sha"},{j:"しゅ",r:"shu"},{j:"しょ",r:"sho"}],
      "ちゃ cha": [{j:"ちゃ",r:"cha"},{j:"ちゅ",r:"chu"},{j:"ちょ",r:"cho"}],
      "にゃ nya": [{j:"にゃ",r:"nya"},{j:"にゅ",r:"nyu"},{j:"にょ",r:"nyo"}],
      "ひゃ hya": [{j:"ひゃ",r:"hya"},{j:"ひゅ",r:"hyu"},{j:"ひょ",r:"hyo"}],
      "みゃ mya": [{j:"みゃ",r:"mya"},{j:"みゅ",r:"myu"},{j:"みょ",r:"myo"}],
      "りゃ rya": [{j:"りゃ",r:"rya"},{j:"りゅ",r:"ryu"},{j:"りょ",r:"ryo"}],
      "ぎゃ gya": [{j:"ぎゃ",r:"gya"},{j:"ぎゅ",r:"gyu"},{j:"ぎょ",r:"gyo"}],
      "じゃ ja": [{j:"じゃ",r:"ja"},{j:"じゅ",r:"ju"},{j:"ジョ",r:"jo"}],
      "びゃ bya": [{j:"びゃ",r:"bya"},{j:"びゅ",r:"byu"},{j:"びょ",r:"byo"}],
      "ぴゃ pya": [{j:"ぴゃ",r:"pya"},{j:"ぴゅ",r:"pyu"},{j:"ぴょ",r:"pyo"}]
    }
  },
  katakana: {
    Basic: {
      "ア a": [{j:"ア",r:"a"},{j:"イ",r:"i"},{j:"ウ",r:"u"},{j:"エ",r:"e"},{j:"オ",r:"o"}],
      "カ ka": [{j:"カ",r:"ka"},{j:"キ",r:"ki"},{j:"ク",r:"ku"},{j:"ケ",r:"ke"},{j:"コ",r:"ko"}],
      "サ sa": [{j:"サ",r:"sa"},{j:"シ",r:"shi"},{j:"ス",r:"su"},{j:"セ",r:"se"},{j:"ソ",r:"so"}],
      "タ ta": [{j:"タ",r:"ta"},{j:"チ",r:"chi"},{j:"ツ",r:"tsu"},{j:"テ",r:"te"},{j:"ト",r:"to"}],
      "ナ na": [{j:"ナ",r:"na"},{j:"ニ",r:"ni"},{j:"ヌ",r:"nu"},{j:"ネ",r:"ne"},{j:"ノ",r:"no"}],
      "ハ ha": [{j:"ハ",r:"ha"},{j:"ヒ",r:"hi"},{j:"フ",r:"fu"},{j:"ヘ",r:"he"},{j:"ホ",r:"ho"}],
      "マ ma": [{j:"マ",r:"ma"},{j:"ミ",r:"mi"},{j:"ム",r:"mu"},{j:"メ",r:"me"},{j:"モ",r:"mo"}],
      "ヤ ya": [{j:"ヤ",r:"ya"},{j:"ユ",r:"yu"},{j:"ヨ",r:"yo"}],
      "ラ ra": [{j:"ラ",r:"ra"},{j:"リ",r:"ri"},{j:"ル",r:"ru"},{j:"レ",r:"re"},{j:"ロ",r:"ro"}],
      "ワ wa": [{j:"ワ",r:"wa"},{j:"ヲ",r:"wo"},{j:"ン",r:"n"}]
    },
    Dakuten: {
      "ガ ga": [{j:"ガ",r:"ga"},{j:"ギ",r:"gi"},{j:"グ",r:"gu"},{j:"ゲ",r:"ge"},{j:"ゴ",r:"go"}],
      "ザ za": [{j:"ザ",r:"za"},{j:"ジ",r:"ji"},{j:"ズ",r:"zu"},{j:"ゼ",r:"ze"},{j:"ゾ",r:"zo"}],
      "ダ da": [{j:"ダ",r:"da"},{j:"ヂ",r:"ji"},{j:"ヅ",r:"zu"},{j:"デ",r:"de"},{j:"ド",r:"do"}],
      "バ ba": [{j:"バ",r:"ba"},{j:"ビ",r:"bi"},{j:"ブ",r:"bu"},{j:"ベ",r:"be"},{j:"ボ",r:"bo"}],
      "パ pa": [{j:"パ",r:"pa"},{j:"ピ",r:"pi"},{j:"プ",r:"pu"},{j:"ペ",r:"pe"},{j:"ポ",r:"po"}]
    },
    Combinations: {
      "キャ kya": [{j:"キャ",r:"kya"},{j:"キュ",r:"kyu"},{j:"キョ",r:"kyo"}],
      "シャ sha": [{j:"シャ",r:"sha"},{j:"シュ",r:"shu"},{j:"ショ",r:"sho"}],
      "チャ cha": [{j:"チャ",r:"cha"},{j:"チュ",r:"chu"},{j:"チョ",r:"cho"}],
      "ニャ nya": [{j:"ニャ",r:"nya"},{j:"ニュ",r:"nyu"},{j:"ニョ",r:"nyo"}],
      "ヒャ hya": [{j:"ヒャ",r:"hya"},{j:"ヒュ",r:"hyu"},{j:"ヒョ",r:"hyo"}],
      "ミャ mya": [{j:"ミャ",r:"mya"},{j:"ミュ",r:"myu"},{j:"ミョ",r:"myo"}],
      "リャ rya": [{j:"リャ",r:"rya"},{j:"リュ",r:"ryu"},{j:"リョ",r:"ryo"}],
      "ギャ gya": [{j:"ギャ",r:"gya"},{j:"ギュ",r:"gyu"},{j:"ギョ",r:"gyo"}],
      "ジャ ja": [{j:"ジャ",r:"ja"},{j:"ジュ",r:"ju"},{j:"ジョ",r:"jo"}],
      "ビャ bya": [{j:"ビャ",r:"bya"},{j:"ビュ",r:"byu"},{j:"ビョ",r:"byo"}],
      "ピャ pya": [{j:"ピャ",r:"pya"},{j:"ピュ",r:"pyu"},{j:"ピョ",r:"pyo"}]
    }
  }
};

// --- STATE ---
let currentType = 'hiragana';
let selectedGroups = new Set(["あ a"]);
let activeModes = ['mcq']; // mcq, typing, listen, draw
let orderType = 'random'; // random, focus
let queue = [];
let reviewQueue = [];
let currentItem = null;
let currentCardMode = null;
let originalQueueSize = 0;
let isAnimating = false;

let stats = JSON.parse(localStorage.getItem('nixodesu_stats'));
if (!stats) {
    stats = { streak: 0, totalCorrect: 0, characterStats: { hiragana: {}, katakana: {} } };
}
if (!stats.characterStats) stats.characterStats = { hiragana: {}, katakana: {} };
if (!stats.characterStats.hiragana) stats.characterStats.hiragana = {};
if (!stats.characterStats.katakana) stats.characterStats.katakana = {};

// --- DOM ELEMENTS ---
const views = {
    setup: document.getElementById('setup-view'),
    review: document.getElementById('review-view'),
    quiz: document.getElementById('quiz-view')
};

function saveStats() {
    localStorage.setItem('nixodesu_stats', JSON.stringify(stats));
    if (document.getElementById('streak-val')) {
        document.getElementById('streak-val').textContent = stats.streak;
        document.getElementById('score-val').textContent = stats.totalCorrect;
    }
}

// --- INIT ---
function initApp() {
    try {
        initTheme();
        saveStats(); // render initial values
    
    // Type Toggle
    document.getElementById('seg-hiragana')?.addEventListener('change', e => { if(e.target.checked) { currentType = 'hiragana'; selectedGroups.clear(); renderGroups(); } });
    document.getElementById('seg-katakana')?.addEventListener('change', e => { if(e.target.checked) { currentType = 'katakana'; selectedGroups.clear(); renderGroups(); } });

    // Select All
    document.getElementById('select-all-btn')?.addEventListener('click', () => {
        const allGroups = [];
        Object.values(kanaData[currentType]).forEach(col => Object.keys(col).forEach(k => allGroups.push(k)));
        const allSelected = allGroups.every(g => selectedGroups.has(g));
        if (allSelected) selectedGroups.clear();
        else allGroups.forEach(g => selectedGroups.add(g));
        renderGroups();
    });

    // Game Modes
    document.querySelectorAll('input[name="game-mode"]').forEach(cb => {
        cb.addEventListener('change', () => {
            activeModes = Array.from(document.querySelectorAll('input[name="game-mode"]:checked')).map(el => el.value);
            if (activeModes.length === 0) {
                cb.checked = true; // force at least one
                activeModes = [cb.value];
            }
        });
    });

    // Order
    document.getElementById('order-random-btn')?.addEventListener('click', e => {
        orderType = 'random';
        e.target.classList.add('active');
        document.getElementById('order-focus-btn').classList.remove('active');
    });
    document.getElementById('order-focus-btn')?.addEventListener('click', e => {
        orderType = 'focus';
        e.target.classList.add('active');
        document.getElementById('order-random-btn').classList.remove('active');
    });

    // Session Size
    const sizeInput = document.getElementById('session-size');
    if (sizeInput) {
        sizeInput.addEventListener('input', e => {
            let v = parseInt(e.target.value);
            if(!isNaN(v)) { if(v > 200) e.target.value=200; if(v<1) e.target.value=1; }
        });
        sizeInput.addEventListener('blur', e => {
            if(isNaN(parseInt(e.target.value))) e.target.value = 20;
        });
        document.getElementById('size-dec')?.addEventListener('click', () => {
            let v = parseInt(sizeInput.value)||20;
            sizeInput.value = v > 5 ? v-5 : 1;
        });
        document.getElementById('size-inc')?.addEventListener('click', () => {
            let v = parseInt(sizeInput.value)||20;
            sizeInput.value = v < 196 ? v+5 : 200;
        });
    }

    // Start
    document.getElementById('start-btn')?.addEventListener('click', startPractice);
    document.getElementById('end-session-btn')?.addEventListener('click', () => { switchView('setup'); renderGroups(); });
    
    // Typing Input
    document.getElementById('romaji-input')?.addEventListener('input', e => {
        if (!isAnimating && currentCardMode === 'typing') {
            const val = e.target.value.trim().toLowerCase();
            if (val === currentItem.r) handleAnswer(val);
        }
    });
    document.getElementById('romaji-input')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleAnswer(e.target.value.trim().toLowerCase());
    });
    document.getElementById('typing-submit-btn')?.addEventListener('click', () => {
        handleAnswer(document.getElementById('romaji-input').value.trim().toLowerCase());
    });

    // Global Hint
    document.getElementById('global-hint-btn')?.addEventListener('click', () => {
        if(isAnimating || !currentItem) return;
        
        if(!stats.characterStats[currentType]) stats.characterStats[currentType] = {};
        if(!stats.characterStats[currentType][currentItem.j]) {
            stats.characterStats[currentType][currentItem.j] = {c:0, i:0, h:0};
        }
        stats.characterStats[currentType][currentItem.j].h = (stats.characterStats[currentType][currentItem.j].h || 0) + 1;
        saveStats();
        
        const toast = document.getElementById('feedback-toast');
        toast.className = 'feedback-toast';
        toast.style.background = 'var(--glass)';
        toast.style.color = 'var(--text-1)';
        toast.style.borderColor = 'var(--border-strong)';
        toast.textContent = `💡 Hint: ${currentCardMode === 'listen' ? currentItem.j : currentItem.r}`;
        toast.classList.remove('hidden');
        
        setTimeout(() => toast.classList.add('hidden'), 1500);
    });

    // Listen Replay
    document.getElementById('replay-btn')?.addEventListener('click', playAudio);

    // Draw Setup
    initDrawing();

    // Review Actions
    document.getElementById('review-skip-btn')?.addEventListener('click', startQuizPhase);
    document.getElementById('review-next-btn')?.addEventListener('click', nextReviewCard);

    // Initial render
    renderGroups();
    } catch(err) {
        console.error(err);
        alert("Initialization Error: " + err.message);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// --- THEME ---
function initTheme() {
    const toggle = document.getElementById('theme-toggle-btn');
    const icon = document.getElementById('theme-icon');
    let theme = localStorage.getItem('nixodesu_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    if(icon) {
        icon.innerHTML = theme === 'dark' ? 
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' : 
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    }

    toggle?.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nixodesu_theme', theme);
        if(icon) {
            icon.innerHTML = theme === 'dark' ? 
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' : 
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        }
    });
}

// --- RENDER GROUPS ---
function renderGroups() {
    const container = document.getElementById('kana-columns');
    if (!container) return;
    container.innerHTML = '';
    
    Object.entries(kanaData[currentType]).forEach(([colName, groups]) => {
        const colDiv = document.createElement('div');
        colDiv.className = 'kana-column';
        
        const header = document.createElement('div');
        header.className = 'kana-col-header';
        header.innerHTML = `<span class="col-title">${colName}</span>
            <button class="col-select-btn">Select All</button>`;
        
        header.querySelector('button').onclick = () => {
            const keys = Object.keys(groups);
            const allSel = keys.every(k => selectedGroups.has(k));
            keys.forEach(k => allSel ? selectedGroups.delete(k) : selectedGroups.add(k));
            renderGroups();
        };
        colDiv.appendChild(header);

        const cardWrap = document.createElement('div');
        // Use flex stack for Dakuten, grid for everything else
        cardWrap.className = colName === 'Dakuten' ? 'kana-column-flex' : 'kana-column-grid';
        colDiv.appendChild(cardWrap);

        Object.entries(groups).forEach(([gName, chars]) => {
            const isSel = selectedGroups.has(gName);
            const card = document.createElement('div');
            card.className = `group-card ${isSel ? 'selected' : ''}`;
            card.onclick = () => {
                isSel ? selectedGroups.delete(gName) : selectedGroups.add(gName);
                renderGroups();
            };

            const r1 = document.createElement('div'); r1.className = 'group-card-row1'; r1.textContent = chars[0].j;
            const r2 = document.createElement('div'); r2.className = 'group-card-row2';
            const r3 = document.createElement('div'); r3.className = 'group-romaji-row';

            let tC = 0, tA = 0;
            chars.forEach(c => {
                const jSp = document.createElement('span'); jSp.className = 'group-char'; jSp.textContent = c.j;
                if(isSel) jSp.style.color = "var(--green)";
                r2.appendChild(jSp);
                const rSp = document.createElement('span'); rSp.className = 'group-r-item'; rSp.textContent = c.r;
                r3.appendChild(rSp);

                const cSt = stats.characterStats[currentType]?.[c.j] || {c:0, i:0};
                tC += cSt.c; tA += (cSt.c + cSt.i);
            });

            card.append(r1, r2, r3);

            const pct = tA === 0 ? 0 : Math.round((tC/tA)*100);
            const track = document.createElement('div'); track.className = 'mastery-bar-track';
            const fill = document.createElement('div'); fill.className = 'mastery-bar-fill';
            fill.style.width = `${pct}%`;
            if(tA > 0) {
                if(pct < 40) fill.style.background = 'var(--red)';
                else if(pct < 80) fill.style.background = '#FF9500';
                else fill.style.background = 'var(--green)';
            }
            track.appendChild(fill);
            card.appendChild(track);
            cardWrap.appendChild(card);
        });
        container.appendChild(colDiv);
    });

    const sBtn = document.getElementById('start-btn');
    const sHint = document.getElementById('start-hint');
    if (sBtn && sHint) {
        if (selectedGroups.size > 0) {
            sBtn.disabled = false;
            sHint.textContent = `${selectedGroups.size} groups selected`;
        } else {
            sBtn.disabled = true;
            sHint.textContent = "Select kana groups to begin";
        }
    }
}

// --- SESSION LOGIC ---
function startPractice() {
    let pool = [];
    selectedGroups.forEach(g => {
        Object.values(kanaData[currentType]).forEach(col => {
            if(col[g]) pool.push(...col[g]);
        });
    });

    if (pool.length === 0) return;

    let targetSize = parseInt(document.getElementById('session-size').value) || 20;
    queue = [];

    // Fill queue
    if (orderType === 'random') {
        for(let i=0; i<targetSize; i++) {
            queue.push(pool[Math.floor(Math.random() * pool.length)]);
        }
    } else {
        // Focus (sort by lowest accuracy)
        pool.sort((a,b) => {
            const sA = stats.characterStats[currentType]?.[a.j] || {c:0,i:0};
            const sB = stats.characterStats[currentType]?.[b.j] || {c:0,i:0};
            const pA = sA.c+sA.i===0 ? -1 : sA.c/(sA.c+sA.i);
            const pB = sB.c+sB.i===0 ? -1 : sB.c/(sB.c+sB.i);
            return pA - pB;
        });
        for(let i=0; i<targetSize; i++) {
            queue.push(pool[i % pool.length]);
        }
        queue.sort(() => Math.random() - 0.5); // Shuffle final selection
    }

    originalQueueSize = queue.length;

    const doReview = document.getElementById('review-cb')?.checked;
    if (doReview) {
        // Distinct items for review
        const distinct = Array.from(new Set(queue.map(q=>JSON.stringify(q)))).map(s=>JSON.parse(s));
        reviewQueue = distinct;
        switchView('review');
        nextReviewCard();
    } else {
        startQuizPhase();
    }
}

function switchView(id) {
    Object.values(views).forEach(v => { if(v) v.classList.remove('active'); });
    if(views[id]) views[id].classList.add('active');
}

// --- REVIEW PHASE ---
function nextReviewCard() {
    if (reviewQueue.length === 0) {
        startQuizPhase();
        return;
    }
    const item = reviewQueue.shift();
    document.getElementById('review-kana-el').textContent = item.j;
    document.getElementById('review-romaji-el').textContent = item.r;
    document.getElementById('review-cur').textContent = originalQueueSize - queue.length + (originalQueueSize - reviewQueue.length); // approximate
}

// --- QUIZ PHASE ---
function startQuizPhase() {
    switchView('quiz');
    nextCard();
}

function nextCard() {
    if(isAnimating) return;
    if (queue.length === 0) {
        switchView('setup');
        renderGroups();
        return;
    }
    
    currentItem = queue.shift();
    
    // Pick mode
    currentCardMode = activeModes[Math.floor(Math.random() * activeModes.length)];
    
    document.getElementById('session-mode-badge').textContent = currentCardMode.toUpperCase();
    const rem = queue.length + 1;
    document.getElementById('session-progress-text').textContent = `${originalQueueSize - rem + 1} / ${originalQueueSize}`;
    document.getElementById('progress-bar').style.width = `${((originalQueueSize - rem) / originalQueueSize)*100}%`;

    // Hide all panels
    ['mcq','typing','listen','draw'].forEach(m => document.getElementById(`quiz-${m}`).classList.add('hidden'));
    document.getElementById(`quiz-${currentCardMode}`).classList.remove('hidden');

    // Reset styles
    document.querySelectorAll('.flashcard, .option-btn, #romaji-input').forEach(el => {
        el.classList.remove('correct', 'incorrect');
    });

    if (currentCardMode === 'draw') {
        document.getElementById('global-hint-btn')?.classList.add('hidden');
    } else {
        document.getElementById('global-hint-btn')?.classList.remove('hidden');
    }

    if (currentCardMode === 'mcq') setupMCQ();
    else if (currentCardMode === 'typing') setupTyping();
    else if (currentCardMode === 'listen') setupListen();
    else if (currentCardMode === 'draw') setupDraw();
}

function setupMCQ() {
    document.getElementById('kana-mcq').textContent = currentItem.j;
    const optsDiv = document.getElementById('mcq-options');
    optsDiv.innerHTML = '';
    
    const all = [];
    Object.values(kanaData[currentType]).forEach(col => Object.values(col).forEach(arr => all.push(...arr)));
    
    const opts = [currentItem.r];
    while(opts.length < 4) {
        const r = all[Math.floor(Math.random()*all.length)].r;
        if(!opts.includes(r)) opts.push(r);
    }
    opts.sort(()=>Math.random()-0.5);
    
    opts.forEach(o => {
        const b = document.createElement('button');
        b.className = 'option-btn';
        b.textContent = o;
        b.onclick = () => handleAnswer(o, b);
        optsDiv.appendChild(b);
    });
}

function setupTyping() {
    document.getElementById('kana-typing').textContent = currentItem.j;
    const inp = document.getElementById('romaji-input');
    inp.value = '';
    inp.className = '';
    setTimeout(() => inp.focus(), 100);
}

function setupListen() {
    const optsDiv = document.getElementById('listen-options');
    optsDiv.innerHTML = '';
    
    const all = [];
    Object.values(kanaData[currentType]).forEach(col => Object.values(col).forEach(arr => all.push(...arr)));
    
    const opts = [currentItem.j];
    while(opts.length < 4) {
        const j = all[Math.floor(Math.random()*all.length)].j;
        if(!opts.includes(j)) opts.push(j);
    }
    opts.sort(()=>Math.random()-0.5);
    
    opts.forEach(o => {
        const b = document.createElement('button');
        b.className = 'option-btn kana-font';
        b.textContent = o;
        b.onclick = () => handleAnswer(o === currentItem.j ? currentItem.r : 'wrong', b);
        optsDiv.appendChild(b);
    });

    playAudio();
}

function playAudio() {
    if(!currentItem) return;
    const msg = new SpeechSynthesisUtterance();
    msg.text = currentItem.j;
    msg.lang = 'ja-JP';
    window.speechSynthesis.speak(msg);
}

// Draw state
let isDrawing = false;
let ctx;
function initDrawing() {
    const cvs = document.getElementById('draw-canvas');
    if(!cvs) return;
    ctx = cvs.getContext('2d');
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';

    const startPos = (e) => { isDrawing = true; draw(e); };
    const endPos = () => { isDrawing = false; ctx.beginPath(); };
    const draw = (e) => {
        if(!isDrawing) return;
        e.preventDefault();
        const rect = cvs.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    cvs.addEventListener('mousedown', startPos);
    cvs.addEventListener('mouseup', endPos);
    cvs.addEventListener('mousemove', draw);
    cvs.addEventListener('touchstart', startPos, {passive:false});
    cvs.addEventListener('touchend', endPos);
    cvs.addEventListener('touchmove', draw, {passive:false});

    document.getElementById('clear-canvas-btn')?.addEventListener('click', () => {
        ctx.clearRect(0,0,cvs.width,cvs.height);
    });
    
    document.getElementById('reveal-answer-btn')?.addEventListener('click', () => {
        document.getElementById('draw-reveal').classList.remove('hidden');
        document.getElementById('draw-reveal-kana').textContent = currentItem.j;
        document.getElementById('reveal-answer-btn').classList.add('hidden');
    });

    document.getElementById('draw-correct-btn')?.addEventListener('click', () => handleAnswer(currentItem.r, null, true));
    document.getElementById('draw-wrong-btn')?.addEventListener('click', () => handleAnswer('wrong', null, true));
}

function setupDraw() {
    document.getElementById('draw-romaji-target').textContent = currentItem.r;
    const cvs = document.getElementById('draw-canvas');
    ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-1').trim() || '#FFF';
    document.getElementById('draw-reveal').classList.add('hidden');
    document.getElementById('reveal-answer-btn').classList.remove('hidden');
}

// --- EVALUATION ---
function handleAnswer(ans, btnEl=null, isDrawOverride=false) {
    if(isAnimating) return;
    isAnimating = true;

    const isCorrect = isDrawOverride ? (ans === currentItem.r) : (ans === currentItem.r);

    if(!stats.characterStats[currentType]) stats.characterStats[currentType] = {};
    if(!stats.characterStats[currentType][currentItem.j]) {
        stats.characterStats[currentType][currentItem.j] = {c:0, i:0, h:0};
    }
    
    if(isCorrect) {
        stats.streak++;
        stats.totalCorrect++;
        stats.characterStats[currentType][currentItem.j].c++;
    } else {
        stats.streak = 0;
        stats.characterStats[currentType][currentItem.j].i++;
        queue.push(currentItem);
        originalQueueSize++; 
    }
    saveStats();

    const toast = document.getElementById('feedback-toast');
    toast.className = `feedback-toast ${isCorrect ? 'correct-toast' : 'incorrect-toast'}`;
    toast.textContent = isCorrect ? 'CORRECT' : `INCORRECT - it was ${currentItem.r}`;
    toast.classList.remove('hidden');

    if(currentCardMode === 'mcq') {
        const fc = document.getElementById('fc-mcq');
        fc.classList.add(isCorrect ? 'correct' : 'incorrect');
        if(btnEl) btnEl.classList.add(isCorrect ? 'correct' : 'incorrect');
    } else if (currentCardMode === 'typing') {
        const fc = document.getElementById('fc-typing');
        const inp = document.getElementById('romaji-input');
        fc.classList.add(isCorrect ? 'correct' : 'incorrect');
        inp.classList.add(isCorrect ? 'correct' : 'incorrect');
    } else if (currentCardMode === 'listen') {
        const fc = document.getElementById('fc-listen');
        fc.classList.add(isCorrect ? 'correct' : 'incorrect');
        if(btnEl) btnEl.classList.add(isCorrect ? 'correct' : 'incorrect');
    }

    setTimeout(() => {
        isAnimating = false;
        toast.classList.add('hidden');
        nextCard();
    }, isCorrect ? 500 : 1500);
}
