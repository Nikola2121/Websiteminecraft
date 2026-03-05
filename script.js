/* 
================================================
  QUANTUM NETWORK | ULTIMATE MINECRAFT WEBSITE
  10. Design & UX: Interactive Elements
================================================ 
*/

// Firebase Configuration (Replace with your actual config from Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
}

// Loading Screen Logic
window.addEventListener('load', () => {
    const xpBar = document.getElementById('xp-bar-fill');
    let progress = 0;

    // Simulate loading fill for the XP Bar
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => loadingScreen.style.display = 'none', 800);
                }
            }, 500); // Short delay after 100% before fading out
        }
        if (xpBar) xpBar.style.width = `${progress}%`;
    }, 100);
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Particles
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00aaaa" },
                "shape": { "type": "edge" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00aaaa", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 3. Scroll Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    // 4. Modal Logic (Player Panel)
    const modal = document.getElementById('authModal');
    const loginBtn = document.getElementById('navLoginBtn');
    const closeBtn = document.getElementById('closeModal');

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // 5. Leaderboard Tabs Logic
    window.openTab = function (tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        const tbody = document.querySelector('#kills-data tbody');
        // Simple mock data swap
        if (tabName === 'kills') {
            tbody.innerHTML = `
                <tr><td class="gold-text">#1</td><td><img src="https://crafatar.com/avatars/853c80ef3c3749fdaa49938b674adae6?size=24" class="inline-head"> GHOSTSLAYER</td><td>4,208</td></tr>
                <tr><td style="color:#FFF;">#2</td><td><img src="https://crafatar.com/avatars/069a79f444e94726a5befca90e38aaf5?size=24" class="inline-head"> VOIDWALKER</td><td>3,842</td></tr>
                <tr><td style="color:#FFAA00;">#3</td><td><img src="https://crafatar.com/avatars/1b2b810d7a0c4f80879685a3aa460341?size=24" class="inline-head"> ENDERKING_</td><td>2,105</td></tr>
            `;
        } else if (tabName === 'rich') {
            tbody.innerHTML = `
                <tr><td class="gold-text">#1</td><td><img src="https://crafatar.com/avatars/98b1d981bf484bd794c489c470876176?size=24" class="inline-head"> ZEUS</td><td>$10.5M</td></tr>
                <tr><td style="color:#FFF;">#2</td><td><img src="https://crafatar.com/avatars/b876ec32e396476ba1158438d83c67d4?size=24" class="inline-head"> ATHENA</td><td>$8.2M</td></tr>
                <tr><td style="color:#FFAA00;">#3</td><td><img src="https://crafatar.com/avatars/2237894377bb4ced94e82bd47e09ef2e?size=24" class="inline-head"> ARES</td><td>$5.1M</td></tr>
            `;
        } else {
            tbody.innerHTML = `
                <tr><td class="gold-text">#1</td><td><img src="https://crafatar.com/avatars/f1727783be314d3fbdffc5058fd0e84b?size=24" class="inline-head"> OWNAGE</td><td>1200h</td></tr>
                <tr><td style="color:#FFF;">#2</td><td><img src="https://crafatar.com/avatars/853c80ef3c3749fdaa49938b674adae6?size=24" class="inline-head"> GHOSTSLAYER</td><td>850h</td></tr>
                <tr><td style="color:#FFAA00;">#3</td><td><img src="https://crafatar.com/avatars/069a79f444e94726a5befca90e38aaf5?size=24" class="inline-head"> VOIDWALKER</td><td>720h</td></tr>
            `;
        }
    };

    // 6. Event Countdowns
    function startCountdown(id, dateStr) {
        const el = document.getElementById(id);
        if (!el) return;
        const target = new Date(dateStr).getTime();

        setInterval(() => {
            const now = new Date().getTime();
            const dist = target - now;

            if (dist < 0) { el.innerHTML = "STARTED!"; return; }

            const d = Math.floor(dist / (1000 * 60 * 60 * 24));
            const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((dist % (1000 * 60)) / 1000);

            el.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
        }, 1000);
    }

    // Set mocks for a few days ahead
    let d1 = new Date(); d1.setHours(d1.getHours() + 12);
    let d2 = new Date(); d2.setDate(d2.getDate() + 3);
    startCountdown('countdown-pvp', d1);
    startCountdown('countdown-build', d2);

    // 7. Live Server Stats Fetching Mock
    setInterval(() => {
        // Randomly fluctuate players
        let currentPlayers = 1540 + Math.floor(Math.random() * 21) - 10;
        const pEl = document.getElementById('onlinePlayers');
        if (pEl) pEl.innerText = `${currentPlayers.toLocaleString()} PLAYERS ONLINE`;
    }, 5000);
});

// IP Copy Function (Toast)
function copyIP() {
    const ip = "PLAY.QUANTUM.COM";
    navigator.clipboard.writeText(ip).then(() => {
        const toast = document.getElementById("toast");
        toast.innerText = "IP COPIED: " + ip;
        toast.classList.add("show");
        document.getElementById("copyHint").innerText = "✔ COPIED!";

        setTimeout(() => {
            toast.classList.remove("show");
            document.getElementById("copyHint").innerText = "CLICK TO COPY IP";
        }, 3000);
    }).catch(err => console.error("Could not copy text: ", err));
}

// --- Firebase Authentication Logic ---
const authModal = document.getElementById('authModal');
const guestNav = document.getElementById('guest-nav');
const userNav = document.getElementById('user-nav');
const userEmailDisplay = document.getElementById('userEmailDisplay');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const navLogoutBtn = document.getElementById('navLogoutBtn');

// Auth State Observer
if (typeof firebase !== 'undefined') {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if (user.emailVerified) {
                if (guestNav) guestNav.style.display = 'none';
                if (userNav) userNav.style.display = 'flex';
                if (userEmailDisplay) userEmailDisplay.innerText = user.email;
                if (authModal) authModal.style.display = 'none';
            } else {
                firebase.auth().signOut();
                alert("Please verify your email before logging in. Check your inbox.");
            }
        } else {
            if (guestNav) guestNav.style.display = 'block';
            if (userNav) userNav.style.display = 'none';
        }
    });
}

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const email = emailInput?.value;
        const password = passwordInput?.value;
        if (!email || !password) return alert("Please enter email and password.");

        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

        if (typeof firebase !== 'undefined') {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    if (!userCredential.user.emailVerified) {
                        alert("Please verify your email before logging in!");
                        firebase.auth().signOut();
                    }
                    loginBtn.innerHTML = originalText;
                })
                .catch((error) => {
                    alert(error.message);
                    loginBtn.innerHTML = originalText;
                });
        } else {
            setTimeout(() => {
                alert("Firebase not configured. Mock Login.");
                loginBtn.innerHTML = originalText;
            }, 1000);
        }
    });
}

if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        const email = emailInput?.value;
        const password = passwordInput?.value;
        if (!email || !password) return alert("Please enter email and password.");

        const originalText = registerBtn.innerHTML;
        registerBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;

        if (typeof firebase !== 'undefined') {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    return userCredential.user.sendEmailVerification();
                })
                .then(() => {
                    alert("Registration successful! Please check your email to verify your account before logging in.");
                    firebase.auth().signOut();
                    registerBtn.innerHTML = originalText;
                    emailInput.value = '';
                    passwordInput.value = '';
                })
                .catch((error) => {
                    alert(error.message);
                    registerBtn.innerHTML = originalText;
                });
        } else {
            setTimeout(() => {
                alert("Firebase not configured. Mock Register.");
                registerBtn.innerHTML = originalText;
            }, 1000);
        }
    });
}

if (navLogoutBtn) {
    navLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof firebase !== 'undefined') {
            firebase.auth().signOut().then(() => {
                alert("Logged out successfully.");
            });
        }
    });
}
