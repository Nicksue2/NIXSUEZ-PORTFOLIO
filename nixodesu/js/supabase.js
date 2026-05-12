// --- SUPABASE CONFIGURATION ---
/*
 * SECURITY CONTEXT: 
 * It is safe to expose the Supabase URL and Anon Key in client-side code.
 * The Anon Key only provides access to the Supabase API with the "anon" role.
 * Actual data protection is handled by Row Level Security (RLS) policies configured on the database tables.
 * RLS ensures that users can only access or modify rows that belong to them (e.g., using auth.uid()).
 */

const SUPABASE_URL = 'https://ivziuhxyvcnhuouoruap.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eml1aHh5dmNuaHVvdW9ydWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MTQyOTEsImV4cCI6MjA5MzM5MDI5MX0.8iVPHgqewZzIWaYw9Zc3i_9nV7WejtDmiGxm23IHA0w';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;

// --- AUTHENTICATION ---
async function checkAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    currentUser = session?.user || null;
    updateAuthUI();
    
    // Update auth indicator on dashboard/practice pages
    if (typeof window.updateAuthIndicator === 'function') {
        window.updateAuthIndicator();
    }

    if (currentUser) {
        await syncDataFromSupabase();
    }
}

async function signUp(email, password, phone) {
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        phone,
    });
    if (error) throw error;
    return data;
}

async function logIn(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;
    currentUser = data.user;
    updateAuthUI();
    await syncDataToSupabase(); // Migrate local to Supabase upon login
    await syncDataFromSupabase(); // Load fresh data
    return data;
}

async function logOut() {
    await supabaseClient.auth.signOut();
    currentUser = null;
    updateAuthUI();
    // Reload page to reset stats to local guest mode
    window.location.reload();
}

function updateAuthUI() {
    const authBtn = document.getElementById('auth-open-btn');
    const authDisplay = document.getElementById('auth-user-display');
    const logoutBtn = document.getElementById('auth-logout-btn');
    const modal = document.getElementById('auth-modal');
    
    if (currentUser) {
        if (authBtn) authBtn.style.display = 'none';
        if (authDisplay) {
            authDisplay.style.display = 'flex';
            authDisplay.innerHTML = `<span>${currentUser.email}</span>`;
        }
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (modal) modal.classList.add('hidden');
    } else {
        if (authBtn) authBtn.style.display = 'block';
        if (authDisplay) authDisplay.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

// --- DATA SYNC (LOCAL <-> SUPABASE) ---
async function syncDataToSupabase() {
    if (!currentUser) return;

    // Load current local stats
    const localStats = JSON.parse(localStorage.getItem('nixodesu_stats') || '{"characterStats":{"hiragana":{},"katakana":{}},"streak":0,"totalCorrect":0}');
    
    // 1. Update user_stats
    const { error: statsError } = await supabaseClient
        .from('user_stats')
        .update({
            current_streak: localStats.streak,
            total_answers: localStats.totalCorrect,
            last_active_date: new Date().toISOString()
        })
        .eq('id', currentUser.id);

    if (statsError) console.error('Error updating user_stats:', statsError);

    // 2. Update kana_progress
    const upserts = [];
    ['hiragana', 'katakana'].forEach(type => {
        const chars = localStats.characterStats[type] || {};
        Object.entries(chars).forEach(([char, s]) => {
            let romaji = '';
            let category = 'basic';
            if (typeof window.kanaData !== 'undefined' && window.kanaData[type]) {
                for (const [cat, charArr] of Object.entries(window.kanaData[type])) {
                    const found = charArr.find(c => c.j === char);
                    if (found) {
                        romaji = found.r;
                        category = cat;
                        break;
                    }
                }
            }

            upserts.push({
                user_id: currentUser.id,
                character: char,
                romaji: romaji,
                kana_type: type,
                category: category,
                correct_count: s.c || 0,
                wrong_count: s.i || 0,
                hints_used: s.h || 0,
                error_weight: s.w || 0
            });
        });
    });

    if (upserts.length > 0) {
        const { error: kanaError } = await supabaseClient
            .from('kana_progress')
            .upsert(upserts, { onConflict: 'user_id,character' });
        
        if (kanaError) console.error('Error syncing kana_progress:', kanaError);
    }
}

async function syncDataFromSupabase() {
    if (!currentUser) return;

    // 1. Get user_stats
    const { data: statsData, error: statsError } = await supabaseClient
        .from('user_stats')
        .select('*')
        .eq('id', currentUser.id)
        .single();
    
    if (statsError && statsError.code !== 'PGRST116') {
        console.error('Error fetching user_stats:', statsError);
    }

    // 2. Get kana_progress
    const { data: kanaData, error: kanaError } = await supabaseClient
        .from('kana_progress')
        .select('*')
        .eq('user_id', currentUser.id);

    if (kanaError) console.error('Error fetching kana_progress:', kanaError);

    // Merge into local object format so app.js continues working normally
    const mergedStats = {
        characterStats: { hiragana: {}, katakana: {} },
        streak: statsData?.current_streak || 0,
        totalCorrect: statsData?.total_answers || 0
    };

    if (kanaData) {
        kanaData.forEach(row => {
            const type = row.kana_type;
            if (type === 'hiragana' || type === 'katakana') {
                mergedStats.characterStats[type][row.character] = {
                    c: row.correct_count,
                    i: row.wrong_count,
                    h: row.hints_used,
                    w: row.error_weight
                };
            }
        });
    }

    // Save strictly to local object so app.js loads it
    localStorage.setItem('nixodesu_stats', JSON.stringify(mergedStats));
    
    // If the app exposes a global stats reload, call it
    if (typeof window.loadStats === 'function') {
        window.loadStats();
        if (typeof window.renderGroups === 'function') {
            window.renderGroups();
        }
    }
}

// Global update functions called by app.js when saving stats
window.updateSupabaseStats = async function(globalStats) {
    if (!currentUser) return;
    const { error } = await supabaseClient.from('user_stats').update({
        current_streak: globalStats.streak,
        total_answers: globalStats.totalCorrect,
        last_active_date: new Date().toISOString()
    }).eq('id', currentUser.id);
    if (error) console.error('Error updating stats:', error);
}

window.updateSupabaseKana = async function(type, char, charStats) {
    if (!currentUser) return;
    
    // Find romaji and category from global kanaData if available
    let romaji = '';
    let category = 'basic';
    if (typeof window.kanaData !== 'undefined' && window.kanaData[type]) {
        for (const [cat, chars] of Object.entries(window.kanaData[type])) {
            const found = chars.find(c => c.j === char);
            if (found) {
                romaji = found.r;
                category = cat;
                break;
            }
        }
    }

    const { error } = await supabaseClient.from('kana_progress').upsert({
        user_id: currentUser.id,
        character: char,
        romaji: romaji,
        kana_type: type,
        category: category,
        correct_count: charStats.c || 0,
        wrong_count: charStats.i || 0,
        hints_used: charStats.h || 0,
        error_weight: charStats.w || 0
    }, { onConflict: 'user_id,character' });
    if (error) console.error('Error updating kana:', error);
}

window.wipeAllData = async function() {
    // Always wipe local data immediately
    const blankStats = { characterStats: { hiragana: {}, katakana: {} }, streak: 0, totalCorrect: 0, totalAnswers: 0, accuracy: 0 };
    localStorage.setItem('nixodesu_stats', JSON.stringify(blankStats));

    // Get the LIVE session directly — don't rely on cached currentUser (race condition)
    let userId = null;
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        userId = session?.user?.id || null;
    } catch(e) {
        console.warn('Could not get session:', e);
    }

    if (userId) {
        const wipeBtn = document.getElementById('confirm-reset-btn');
        if (wipeBtn) { wipeBtn.textContent = 'Wiping…'; wipeBtn.disabled = true; }

        try {
            // Zero out all kana progress (UPDATE is allowed by RLS, DELETE may not be)
            const { error: zeroErr } = await supabaseClient
                .from('kana_progress')
                .update({ correct_count: 0, wrong_count: 0, hints_used: 0, error_weight: 0 })
                .eq('user_id', userId);
            if (zeroErr) console.warn('Zero kana_progress error:', zeroErr);

            // Also try to delete rows entirely (may silently fail if no DELETE RLS policy)
            await supabaseClient.from('kana_progress').delete().eq('user_id', userId);

            // Reset user_stats
            const { error: updErr } = await supabaseClient
                .from('user_stats')
                .update({ current_streak: 0, total_answers: 0, last_active_date: new Date().toISOString() })
                .eq('id', userId);
            if (updErr) throw updErr;

        } catch (e) {
            console.error('Supabase wipe error:', e);
            alert('Could not fully wipe remote data: ' + (e.message || JSON.stringify(e)));
            if (wipeBtn) { wipeBtn.textContent = 'Wipe Data'; wipeBtn.disabled = false; }
            // Still reload — local data is already cleared
        }
    }

    location.reload();
}

// --- AUTH INDICATOR (for dashboard/practice pages) ---
window.updateAuthIndicator = function() {
    const indicator = document.getElementById('auth-indicator');
    if (!indicator) return;

    supabaseClient.auth.getSession().then(({ data: { session } }) => {
        const user = session?.user;
        if (user) {
            const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
            indicator.innerHTML = `
                <button class="auth-indicator-btn" id="auth-indicator-toggle" aria-label="Account menu">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span>${name}</span>
                </button>
                <div class="auth-indicator-dropdown hidden" id="auth-indicator-dropdown">
                    <div class="auth-dropdown-email">${user.email}</div>
                    <button class="auth-dropdown-logout" id="auth-dropdown-logout-btn">Sign Out</button>
                </div>
            `;
            indicator.style.display = 'block';

            const toggleBtn = document.getElementById('auth-indicator-toggle');
            const dropdown = document.getElementById('auth-indicator-dropdown');
            toggleBtn?.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('hidden');
            });
            document.addEventListener('click', () => dropdown?.classList.add('hidden'));
            document.getElementById('auth-dropdown-logout-btn')?.addEventListener('click', async () => {
                await supabaseClient.auth.signOut();
                location.reload();
            });
        } else {
            indicator.innerHTML = `
                <button class="auth-indicator-btn auth-indicator-guest-btn" id="auth-indicator-guest-login" aria-label="Sign In">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span>Guest</span>
                </button>
            `;
            indicator.style.display = 'block';

            document.getElementById('auth-indicator-guest-login')?.addEventListener('click', () => {
                const modal = document.getElementById('auth-modal');
                if (modal) {
                    modal.classList.remove('hidden');
                } else {
                    // Fallback: redirect to index for sign-in
                    window.location.href = 'index.html';
                }
            });
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (window.supabase) checkAuth();
});

// UI EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    const authOpenBtn = document.getElementById('auth-open-btn');
    const authCloseBtn = document.getElementById('auth-close-btn');
    const authModal = document.getElementById('auth-modal');
    const authForm = document.getElementById('auth-form');
    const toggleModeBtn = document.getElementById('auth-toggle-mode');
    const authTitle = document.getElementById('auth-title');
    const submitBtn = document.getElementById('auth-submit-btn');
    const logoutBtn = document.getElementById('auth-logout-btn');
    const phoneWrap = document.getElementById('auth-phone-wrap');
    
    let isLoginMode = true;

    if (authOpenBtn) authOpenBtn.addEventListener('click', () => authModal.classList.remove('hidden'));
    if (authCloseBtn) authCloseBtn.addEventListener('click', () => authModal.classList.add('hidden'));

    // Click outside to close
    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.add('hidden');
            }
        });
    }
    
    if (toggleModeBtn) {
        toggleModeBtn.addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            authTitle.textContent = isLoginMode ? 'Welcome Back' : 'Create Account';
            submitBtn.textContent = isLoginMode ? 'Log In' : 'Sign Up';
            toggleModeBtn.textContent = isLoginMode ? "Don't have an account? Sign up" : "Already have an account? Log in";
            if (phoneWrap) phoneWrap.style.display = isLoginMode ? 'none' : 'block';
        });
    }

    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-email').value;
            const pass = document.getElementById('auth-password').value;
            const phone = document.getElementById('auth-phone') ? document.getElementById('auth-phone').value : '';
            
            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Please wait...';
                
                if (isLoginMode) {
                    await logIn(email, pass);
                } else {
                    await signUp(email, pass, phone);
                    alert("Account created! Please verify your email if required, then log in.");
                    isLoginMode = true;
                    toggleModeBtn.click(); // toggle back to login
                }
            } catch (err) {
                alert(err.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = isLoginMode ? 'Log In' : 'Sign Up';
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => logOut());
    }
});
