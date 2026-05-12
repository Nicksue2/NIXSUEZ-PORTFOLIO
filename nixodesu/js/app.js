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
      "じゃ ja": [{j:"じゃ",r:"ja"},{j:"じゅ",r:"ju"},{j:"じょ",r:"jo"}],
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
      "ジャ ja": [{j:"ジャ",r:"ja"},{j:"ジュ",r:"ju"},{j:"じょ",r:"jo"}],
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
let jaVoice = null;

// Load voices for iOS/Chrome
function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    jaVoice = voices.find(v => v.lang.startsWith('ja')) || voices.find(v => v.name.includes('Japanese'));
}
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
}

let stats = null;

function loadStats() {
    stats = JSON.parse(localStorage.getItem('nixodesu_stats'));
    if (!stats) {
        stats = { streak: 0, totalCorrect: 0, characterStats: { hiragana: {}, katakana: {} } };
    }
    if (!stats.characterStats) stats.characterStats = { hiragana: {}, katakana: {} };
    if (!stats.characterStats.hiragana) stats.characterStats.hiragana = {};
    if (!stats.characterStats.katakana) stats.characterStats.katakana = {};
    
    if (document.getElementById('streak-val')) {
        document.getElementById('streak-val').textContent = stats.streak;
        document.getElementById('score-val').textContent = stats.totalCorrect;
    }
}
window.loadStats = loadStats;
loadStats(); // initial load

// --- HAPTICS ---
function haptic(pattern) {
    if ('vibrate' in navigator) navigator.vibrate(pattern);
}

// --- SOUND FX via AudioContext ---
let _audioCtx = null;
function getAudioCtx() {
    if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return _audioCtx;
}
function playSfx(type) {
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        if (type === 'correct') {
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.06);
            gain.gain.setValueAtTime(0.18, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.18);
        } else {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.25);
        }
    } catch(e) {}
}

// --- DOM ELEMENTS ---
const views = {
    setup: document.getElementById('setup-view'),
    review: document.getElementById('review-view'),
    quiz: document.getElementById('quiz-view')
};

function saveStats(updatedChar = null, updatedType = null) {
    localStorage.setItem('nixodesu_stats', JSON.stringify(stats));
    if (document.getElementById('streak-val')) {
        document.getElementById('streak-val').textContent = stats.streak;
        document.getElementById('score-val').textContent = stats.totalCorrect;
    }
    
    // Sync to Supabase if logged in
    if (typeof window.updateSupabaseStats === 'function') {
        window.updateSupabaseStats(stats);
        if (updatedChar && updatedType) {
            window.updateSupabaseKana(updatedType, updatedChar, stats.characterStats[updatedType][updatedChar]);
        }
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
    let _audioUnlocked = false; // Unlock only runs once per page load
    document.getElementById('start-btn')?.addEventListener('click', () => {
        if (!_audioUnlocked) {
            _audioUnlocked = true;
            // One-time iOS SpeechSynthesis unlock (silent)
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const unlock = new SpeechSynthesisUtterance('あ');
                unlock.lang = 'ja-JP';
                unlock.volume = 0.001; // essentially silent
                if (jaVoice) unlock.voice = jaVoice;
                window.speechSynthesis.speak(unlock);
                window.speechSynthesis.resume();
            }
            // One-time iOS WebAudio unlock
            try {
                const ctx = getAudioCtx();
                if (ctx.state === 'suspended') ctx.resume();
            } catch(e) {}
        }
        startPractice();
    });
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
        const hintText = (currentCardMode === 'listen' || currentCardMode === 'draw') ? currentItem.j : currentItem.r;
        toast.textContent = `💡 Hint: ${hintText}`;
        toast.classList.remove('hidden');
        
        setTimeout(() => toast.classList.add('hidden'), 1500);
    });

    // Listen Replay
    document.getElementById('replay-btn')?.addEventListener('click', playAudio);

    // Draw Setup
    initDrawing();

    // Swipe Gestures
    initSwipeGestures();

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

// --- QUICK REVIEW MODE ---
// Triggered when arriving from dashboard with ?mode=quickreview
(function checkQuickReview() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') !== 'quickreview') return;

    const raw = sessionStorage.getItem('nixodesu_quick_review');
    if (!raw) return;
    sessionStorage.removeItem('nixodesu_quick_review');

    try {
        const weakest = JSON.parse(raw); // [{char, type}, ...]
        if (!weakest.length) return;

        // Build a minimal queue directly from the weakest chars
        const qrQueue = weakest.map(entry => {
            // Find the full item in kanaData
            let found = null;
            const type = entry.type || 'hiragana';
            Object.values(kanaData[type] || {}).forEach(col => {
                Object.values(col).forEach(arr => {
                    arr.forEach(item => {
                        if (item.j === entry.char) found = item;
                    });
                });
            });
            return found;
        }).filter(Boolean);

        if (!qrQueue.length) return;

        // iOS audio unlock
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance('あ');
            u.lang = 'ja-JP'; u.volume = 0.01;
            if (jaVoice) u.voice = jaVoice;
            window.speechSynthesis.speak(u);
            window.speechSynthesis.resume();
        }

        // Override queue and start quiz
        queue = qrQueue;
        originalQueueSize = queue.length;
        // Use all active modes
        setTimeout(() => startQuizPhase(), 300);
    } catch(e) { console.error('Quick Review error:', e); }
})();

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
function buildSRSQueue(pool, targetSize) {
    // Give each item a weight: higher error score = more repetitions
    const weighted = [];
    pool.forEach(item => {
        const s = stats.characterStats[currentType]?.[item.j] || {c:0, i:0, w:0};
        // SRS weight: unseen=3, errorScore drives extra reps (max 5x)
        const total = s.c + s.i;
        const errorScore = s.w || (total === 0 ? 0 : Math.round((s.i / total) * 10));
        const reps = Math.min(5, Math.max(1, 1 + Math.floor(errorScore / 2)));
        for (let r = 0; r < reps; r++) weighted.push(item);
    });
    const result = [];
    for (let i = 0; i < targetSize; i++) {
        result.push(weighted[Math.floor(Math.random() * weighted.length)]);
    }
    return result;
}

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

    if (orderType === 'random') {
        // SRS-weighted random queue
        queue = buildSRSQueue(pool, targetSize);
    } else {
        // Focus: sort by lowest accuracy, deterministic
        pool.sort((a,b) => {
            const sA = stats.characterStats[currentType]?.[a.j] || {c:0,i:0};
            const sB = stats.characterStats[currentType]?.[b.j] || {c:0,i:0};
            const pA = sA.c+sA.i===0 ? -1 : sA.c/(sA.c+sA.i);
            const pB = sB.c+sB.i===0 ? -1 : sB.c/(sB.c+sB.i);
            return pA - pB;
        });
        for(let i=0; i<targetSize; i++) queue.push(pool[i % pool.length]);
        queue.sort(() => Math.random() - 0.5);
    }

    originalQueueSize = queue.length;

    const doReview = document.getElementById('review-cb')?.checked;
    if (doReview) {
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

    // Show hint button for all modes on PC
    document.getElementById('global-hint-btn')?.classList.remove('hidden');

    const hintEl = document.querySelector('.persistent-swipe-hint');
    if (hintEl) {
        if (currentCardMode === 'draw') {
            hintEl.innerHTML = '👈 Swipe Left: Hint';
        } else {
            hintEl.innerHTML = '👈 Swipe Left: Hint &nbsp;|&nbsp; 👇 Swipe Down: Skip';
        }
    }

    if (currentCardMode === 'mcq') setupMCQ();
    else if (currentCardMode === 'typing') setupTyping();
    else if (currentCardMode === 'listen') setupListen();
    else if (currentCardMode === 'draw') setupDraw();
}

// --- SWIPE GESTURES on quiz view ---
// Left = Hint | Down = Skip | (Right intentionally unused — user must answer)
let _swipeStartX = 0, _swipeStartY = 0;
function initSwipeGestures() {
    const quizView = document.getElementById('quiz-view');
    if (!quizView) return;

    quizView.addEventListener('touchstart', e => {
        _swipeStartX = e.changedTouches[0].clientX;
        _swipeStartY = e.changedTouches[0].clientY;
    }, {passive: true});

    quizView.addEventListener('touchend', e => {
        if (isAnimating || !currentItem) return;
        const dx = e.changedTouches[0].clientX - _swipeStartX;
        const dy = e.changedTouches[0].clientY - _swipeStartY;
        const absDx = Math.abs(dx), absDy = Math.abs(dy);
        const maxDelta = Math.max(absDx, absDy);
        if (maxDelta < 60) return; // too small, ignore

        if (absDy > absDx && dy > 0) {
            // ↓ Swipe Down = Skip
            // Disable skip via swipe down in Draw mode to prevent accidental skips while drawing
            if (currentCardMode === 'draw') return;
            
            haptic([50, 80, 50]);
            playSfx('incorrect');
            if (!stats.characterStats[currentType]) stats.characterStats[currentType] = {};
            if (!stats.characterStats[currentType][currentItem.j])
                stats.characterStats[currentType][currentItem.j] = {c:0, i:0, h:0, w:0};
            const cur = stats.characterStats[currentType][currentItem.j];
            cur.i++;
            cur.w = (cur.w || 0) + 1;
            stats.streak = 0;
            saveStats(currentItem.j, currentType);
            isAnimating = true;
            const toast = document.getElementById('feedback-toast');
            toast.className = 'feedback-toast incorrect-toast';
            toast.textContent = `⏭ SKIPPED — ${currentItem.r}`;
            toast.classList.remove('hidden');
            setTimeout(() => { isAnimating = false; toast.classList.add('hidden'); nextCard(); }, 1000);

        } else if (absDx > absDy && dx < 0) {
            // ← Swipe Left = Show Hint
            haptic(25);
            if (!stats.characterStats[currentType]) stats.characterStats[currentType] = {};
            if (!stats.characterStats[currentType][currentItem.j])
                stats.characterStats[currentType][currentItem.j] = {c:0, i:0, h:0, w:0};
            stats.characterStats[currentType][currentItem.j].h =
                (stats.characterStats[currentType][currentItem.j].h || 0) + 1;
            saveStats(currentItem.j, currentType);
            const hintText = (currentCardMode === 'listen' || currentCardMode === 'draw') ? currentItem.j : currentItem.r;
            const toast = document.getElementById('feedback-toast');
            toast.className = 'feedback-toast';
            toast.style.cssText = 'background:var(--glass);color:var(--text-1);border-color:var(--border-strong);';
            toast.textContent = `💡 ${hintText}`;
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 1600);
        }
        // → Swipe Right: intentionally ignored — user must answer normally
    }, {passive: true});
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
    
    // Visual distractors for commonly confused Kana
    const visualDistractors = {
        "あ": ["お", "め", "ぬ"], "い": ["り", "こ", "に"], "う": ["つ", "ろ", "る"], "え": ["ん", "そ", "て"], "お": ["あ", "む", "す"],
        "か": ["や", "が", "わ"], "き": ["さ", "ち", "ぎ"], "く": ["へ", "ぐ", "て"], "け": ["は", "に", "げ"], "こ": ["い", "に", "ご"],
        "さ": ["き", "ち", "ざ"], "し": ["も", "ん", "じ"], "す": ["む", "ず", "お"], "せ": ["や", "ぜ", "て"], "そ": ["ぞ", "ろ", "て"],
        "た": ["な", "だ", "に"], "ち": ["ら", "さ", "ぢ"], "つ": ["う", "づ", "っ"], "て": ["で", "と", "そ"], "と": ["ど", "て", "こ"],
        "な": ["た", "は", "ま"], "に": ["こ", "い", "た"], "ぬ": ["め", "ね", "あ"], "ね": ["れ", "わ", "ぬ"], "の": ["め", "あ", "る"],
        "は": ["ほ", "ば", "ぱ"], "ひ": ["び", "ぴ", "い"], "ふ": ["ぶ", "ぷ", "う"], "へ": ["べ", "ぺ", "く"], "ほ": ["は", "ぼ", "ぽ"],
        "ま": ["も", "は", "よ"], "み": ["む", "め", "ね"], "む": ["す", "お", "み"], "め": ["ぬ", "あ", "の"], "も": ["ま", "し", "は"],
        "や": ["か", "ゆ", "よ"], "ゆ": ["や", "よ", "わ"], "よ": ["ま", "や", "ゆ"],
        "ら": ["ち", "ろ", "る"], "り": ["い", "に", "け"], "る": ["ろ", "の", "わ"], "れ": ["ね", "わ", "み"], "ろ": ["る", "の", "そ"],
        "わ": ["ね", "れ", "ろ"], "を": ["ち", "む", "ん"], "ん": ["え", "し", "そ"],
        "ア": ["マ", "ヤ", "フ"], "イ": ["ト", "ナ", "ル"], "ウ": ["ワ", "フ", "ラ"], "エ": ["ユ", "コ", "ヨ"], "オ": ["ホ", "カ", "キ"],
        "カ": ["オ", "ガ", "ク"], "キ": ["ギ", "チ", "サ"], "ク": ["ケ", "タ", "ワ"], "ケ": ["ク", "タ", "テ"], "コ": ["ユ", "ヨ", "エ"],
        "サ": ["ザ", "ヤ", "チ"], "シ": ["ツ", "ソ", "ン"], "ス": ["ヌ", "ズ", "フ"], "セ": ["ゼ", "ヤ", "ヒ"], "ソ": ["ン", "ゾ", "ツ"],
        "タ": ["ク", "ダ", "ケ"], "チ": ["テ", "ヂ", "ナ"], "ツ": ["シ", "ソ", "ン"], "テ": ["チ", "デ", "ラ"], "ト": ["ド", "イ", "ヒ"],
        "ナ": ["メ", "チ", "マ"], "ニ": ["ミ", "エ", "コ"], "ヌ": ["ス", "ヲ", "フ"], "ネ": ["ヌ", "ホ", "マ"], "ノ": ["メ", "ソ", "ナ"],
        "ハ": ["バ", "パ", "ル"], "ヒ": ["ビ", "ピ", "セ"], "フ": ["ブ", "プ", "ワ"], "ヘ": ["ベ", "ペ", "ク"], "ホ": ["ボ", "ポ", "オ"],
        "マ": ["ア", "ヤ", "ム"], "ミ": ["ニ", "シ", "ツ"], "ム": ["マ", "メ", "ノ"], "メ": ["ノ", "ナ", "ヤ"], "モ": ["チ", "テ", "ト"],
        "ヤ": ["マ", "ア", "セ"], "ユ": ["コ", "エ", "ヨ"], "ヨ": ["コ", "ユ", "エ"],
        "ラ": ["フ", "ワ", "ウ"], "リ": ["ソ", "ン", "ル"], "ル": ["レ", "ハ", "ノ"], "レ": ["ル", "マ", "ム"], "ロ": ["コ", "ヨ", "ユ"],
        "ワ": ["ウ", "フ", "ラ"], "ヲ": ["ヌ", "フ", "ワ"], "ン": ["ソ", "シ", "ツ"]
    };
    
    let opts = [currentItem.j];
    let similarities = visualDistractors[currentItem.j] || [];
    
    // Check if it's a dakuten/handakuten by finding base character if no direct match
    if (similarities.length === 0) {
        let base1 = String.fromCharCode(currentItem.j.charCodeAt(0) - 1);
        let base2 = String.fromCharCode(currentItem.j.charCodeAt(0) - 2);
        if (visualDistractors[base1]) similarities = [...visualDistractors[base1], base1];
        else if (visualDistractors[base2]) similarities = [...visualDistractors[base2], base2];
    }
    
    // Add visual distractors
    for (let sim of similarities) {
        // Ensure character exists in the current active mode (hiragana vs katakana) to avoid mixing them
        const exists = all.find(item => item.j === sim);
        if (exists && opts.length < 4 && !opts.includes(sim)) {
            opts.push(sim);
        }
    }
    
    // Fill the rest with random characters
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
    if(!currentItem || !('speechSynthesis' in window)) return;
    
    // Ensure voices are loaded
    if (!jaVoice) loadVoices();

    window.speechSynthesis.cancel();
    
    const msg = new SpeechSynthesisUtterance(currentItem.j);
    msg.lang = 'ja-JP';
    if (jaVoice) msg.voice = jaVoice;
    
    msg.rate = 0.8; 
    msg.pitch = 1.0;
    msg.volume = 1.0;
    
    window.speechSynthesis.resume();
    
    // Small timeout to allow iOS to context-switch
    setTimeout(() => {
        window.speechSynthesis.speak(msg);
    }, 50);
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
    
    document.getElementById('submit-draw-btn')?.addEventListener('click', async () => {
        if (!isDrawing && !ctx) return;
        const btn = document.getElementById('submit-draw-btn');
        btn.textContent = 'Checking...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        const isValid = await validateDrawing(cvs, currentItem.j);

        btn.textContent = 'Submit';
        btn.disabled = false;
        btn.style.opacity = '1';

        if (isValid) {
            handleAnswer(currentItem.r, null, true);
        } else {
            handleAnswer('wrong', null, true);
        }
    });
}

function getBounds(imgData) {
    let minX = imgData.width, maxX = 0, minY = imgData.height, maxY = 0;
    let found = false;
    for (let y = 0; y < imgData.height; y++) {
        for (let x = 0; x < imgData.width; x++) {
            const alpha = imgData.data[(y * imgData.width + x) * 4 + 3];
            if (alpha > 20) { // low threshold for drawn pixels
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
                found = true;
            }
        }
    }
    return found ? {minX, maxX, minY, maxY} : null;
}

async function validateDrawing(userCanvas, targetChar) {
    const uCtx = userCanvas.getContext('2d');
    const uData = uCtx.getImageData(0,0,userCanvas.width, userCanvas.height);
    const bounds = getBounds(uData);
    if (!bounds) return false;
    
    const bw = bounds.maxX - bounds.minX;
    const bh = bounds.maxY - bounds.minY;
    if (bw < 10 || bh < 10) return false; // too small scribble
    
    // Prepare a canvas for OCR (black text on white background)
    const ocrCanvas = document.createElement('canvas');
    const pad = 30; // generous padding for OCR
    ocrCanvas.width = bw + pad * 2;
    ocrCanvas.height = bh + pad * 2;
    const oCtx = ocrCanvas.getContext('2d');
    oCtx.fillStyle = 'white';
    oCtx.fillRect(0, 0, ocrCanvas.width, ocrCanvas.height);
    
    // Transfer drawn pixels as black
    const imgData = oCtx.getImageData(0,0,ocrCanvas.width, ocrCanvas.height);
    for (let y = 0; y < bh; y++) {
        for (let x = 0; x < bw; x++) {
            const sx = bounds.minX + x;
            const sy = bounds.minY + y;
            const srcIdx = (sy * userCanvas.width + sx) * 4;
            const alpha = uData.data[srcIdx + 3];
            
            if (alpha > 50) {
                const dstIdx = ((y + pad) * ocrCanvas.width + (x + pad)) * 4;
                imgData.data[dstIdx] = 0;     // R
                imgData.data[dstIdx+1] = 0;   // G
                imgData.data[dstIdx+2] = 0;   // B
                imgData.data[dstIdx+3] = 255; // A
            }
        }
    }
    oCtx.putImageData(imgData, 0, 0);

    // Run Tesseract
    try {
        if (typeof Tesseract === 'undefined') return false;
        const result = await Tesseract.recognize(ocrCanvas, 'jpn');
        const text = result.data.text.replace(/\s+/g, '');
        console.log("OCR Match: ", text, " Target: ", targetChar);
        return text.includes(targetChar);
    } catch (e) {
        console.error("OCR Error", e);
        return false;
    }
}

function setupDraw() {
    document.getElementById('draw-romaji-target').textContent = currentItem.r;
    const cvs = document.getElementById('draw-canvas');
    ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.strokeStyle = '#FFFFFF';
    document.getElementById('submit-draw-btn').classList.remove('hidden');
}

// --- EVALUATION ---
function handleAnswer(ans, btnEl=null, isDrawOverride=false) {
    if(isAnimating) return;
    isAnimating = true;

    const isCorrect = isDrawOverride ? (ans === currentItem.r) : (ans === currentItem.r);

    if(!stats.characterStats[currentType]) stats.characterStats[currentType] = {};
    if(!stats.characterStats[currentType][currentItem.j]) {
        stats.characterStats[currentType][currentItem.j] = {c:0, i:0, h:0, w:0};
    }
    
    if(isCorrect) {
        haptic(50);
        playSfx('correct');
        stats.streak++;
        stats.totalCorrect++;
        stats.characterStats[currentType][currentItem.j].c++;
        // SRS: reduce errorScore on correct (min 0)
        const cur = stats.characterStats[currentType][currentItem.j];
        cur.w = Math.max(0, (cur.w || 0) - 1);
    } else {
        haptic([50, 100, 50]);
        playSfx('incorrect');
        stats.streak = 0;
        stats.characterStats[currentType][currentItem.j].i++;
        // SRS: increase errorScore on incorrect
        const cur = stats.characterStats[currentType][currentItem.j];
        cur.w = (cur.w || 0) + 2;
        queue.push(currentItem);
        originalQueueSize++; 
    }
    saveStats(currentItem.j, currentType);

    const toast = document.getElementById('feedback-toast');
    toast.className = `feedback-toast ${isCorrect ? 'correct-toast' : 'incorrect-toast'}`;
    toast.textContent = isCorrect ? '✓ CORRECT' : `✗ INCORRECT — ${currentItem.r}`;
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
