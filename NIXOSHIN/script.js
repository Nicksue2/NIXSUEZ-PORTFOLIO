const setupScreen = document.getElementById('setupScreen');
const photoboothApp = document.getElementById('photoboothApp');
const startAppButton = document.getElementById('startAppButton');
const layoutCards = document.querySelectorAll('.layout-card');
const frameColorPicker = document.getElementById('frameColorPicker');
const changeLayoutButton = document.getElementById('changeLayoutButton');
const timerButtons = document.querySelectorAll('.timer-button');

const showDateCheck = document.getElementById('showDateCheck');
const customTextInput = document.getElementById('customTextInput'); // BAGONG INPUT

const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const canvas = document.getElementById('photoStrip');
const context = canvas.getContext('2d');
const downloadButton = document.getElementById('downloadButton');
const countdownElement = document.getElementById('countdown');
const photostripFrame = document.getElementById('photostripFrame');
const poseInfoText = document.getElementById('poseInfoText');
const liveView = document.getElementById('liveView');
const flashEffect = document.getElementById('flashEffect');
const filenameInput = document.getElementById('filenameInput');

const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
const stickerTray = document.getElementById('sticker-tray');
const stickerImgs = document.querySelectorAll('.sticker-img');
let selectedSticker = null;

const resultColumn = document.getElementById('photobooth-result');
const controlsColumn = document.getElementById('photobooth-controls');

let currentLayoutId = null;
let shotsToTake = 0;
let frameColor = '#FFFFFF';
let selectedTimer = 3;

let placedStickers = []; 
let cleanStripImageData = null; 

// --- BINAGO: Mas malaki 'yung footer (120px) ---
const layoutDefinitions = {
    'layout-a': {
        canvasWidth: 510,
        canvasHeight: 1260, // 1220 + 40
        footerHeight: 120,  // 80 + 40
        padding: 15,
        shots: [
            { x: 15, y: 15, width: 480, height: 360 },
            { x: 15, y: 390, width: 480, height: 360 },
            { x: 15, y: 765, width: 480, height: 360 },
        ]
    },
    'layout-b': {
        canvasWidth: 510,
        canvasHeight: 1635, // 1595 + 40
        footerHeight: 120,  // 80 + 40
        padding: 15,
        shots: [
            { x: 15, y: 15, width: 480, height: 360 },
            { x: 15, y: 390, width: 480, height: 360 },
            { x: 15, y: 765, width: 480, height: 360 },
            { x: 15, y: 1140, width: 480, height: 360 },
        ]
    }
};

async function setupWebcam() {
    try {
        // First request a generic stream so the browser populates device labels
        const initialStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        initialStream.getTracks().forEach(t => t.stop());

        // Enumerate cameras after permission is granted
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(d => d.kind === 'videoinput');

        // Prefer saved camera, fall back to front-facing, then first available
        const savedId = localStorage.getItem('nixoshin_lastCameraId');
        const savedCamera = cameras.find(c => c.deviceId === savedId);
        const frontCamera = cameras.find(c => /front|user/i.test(c.label));
        const target = savedCamera || frontCamera || cameras[0];

        const constraints = {
            video: target
                ? { deviceId: { exact: target.deviceId } }
                : { facingMode: 'user' },
            audio: false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        await video.play();

        // Persist the chosen camera ID
        const track = stream.getVideoTracks()[0];
        if (track) {
            const id = track.getSettings().deviceId;
            if (id) localStorage.setItem('nixoshin_lastCameraId', id);
        }
    } catch (err) {
        console.error("Error accessing the webcam: ", err);
        if (typeof showModal !== 'undefined') {
            showModal({ title: 'Camera Error', message: 'Could not access your webcam. Please allow camera access and refresh.' });
        } else {
            alert("Could not access your webcam. Please allow camera access.");
        }
    }
}

function selectLayout(e) {
    const selectedCard = e.currentTarget;
    currentLayoutId = selectedCard.dataset.layout;
    shotsToTake = parseInt(selectedCard.dataset.shots, 10);
    
    layoutCards.forEach(card => card.classList.remove('selected'));
    selectedCard.classList.add('selected');
    
    startAppButton.disabled = false;
}

function selectTimer(e) {
    const selectedButton = e.currentTarget;
    selectedTimer = parseInt(selectedButton.dataset.timer, 10);
    
    timerButtons.forEach(btn => btn.classList.remove('selected'));
    selectedButton.classList.add('selected');
}

function startApp() {
    frameColor = frameColorPicker.value;
    const layout = layoutDefinitions[currentLayoutId];

    canvas.width = layout.canvasWidth;
    canvas.height = layout.canvasHeight;
    photostripFrame.style.backgroundColor = frameColor;
    poseInfoText.textContent = `Get ready for ${shotsToTake} poses!`;
    
    document.body.classList.add('white-background');
    setupScreen.classList.remove('active');
    photoboothApp.classList.add('active');
    
    photoboothApp.classList.add('taking-photos-mode');
    resultColumn.style.display = 'none';
    controlsColumn.style.display = 'none';
}

function backToSetup() {
    document.body.classList.remove('white-background');
    photoboothApp.classList.remove('active');
    photoboothApp.classList.remove('taking-photos-mode');
    setupScreen.classList.add('active');
}

function startCountdown(seconds) {
    return new Promise(resolve => {
        let count = seconds;
        countdownElement.style.opacity = '1';
        countdownElement.textContent = count;
        liveView.classList.add('flickering');
        
        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownElement.textContent = count;
            } else {
                clearInterval(interval);
                liveView.classList.remove('flickering');
                countdownElement.textContent = "SMILE!";
                setTimeout(() => {
                    countdownElement.style.opacity = '0';
                    resolve();
                }, 800);
            }
        }, 1000);
    });
}

// FIX 3: Ultimate flash — position:fixed is now set in CSS.
// We use `element.offsetHeight` to force a synchronous reflow so the
// browser commits opacity:1 BEFORE we start the fade-out transition.
// This guarantees the full white frame is always rendered.
function triggerFlash() {
    return new Promise(resolve => {
        const flash = document.getElementById('flashEffect');
        if (!flash) { resolve(); return; }

        // 1. Snap to full white instantly (no transition)
        flash.style.transition = 'none';
        flash.style.opacity    = '1';

        // 2. Force synchronous layout so the white frame is painted
        void flash.offsetHeight;

        // 3. On next frame, activate the fast fade-out
        requestAnimationFrame(() => {
            flash.style.transition = 'opacity 0.28s ease-out';
            flash.style.opacity    = '0';
        });

        // 4. Resolve after fade completes (give 40ms buffer)
        setTimeout(resolve, 350);
    });
}

function drawVideoToCanvas(dx, dy, dWidth, dHeight) {
    const vWidth = video.videoWidth;
    const vHeight = video.videoHeight;
    const vRatio = vWidth / vHeight;
    const dRatio = dWidth / dHeight;

    let sx = 0, sy = 0, sWidth = vWidth, sHeight = vHeight;

    if (vRatio > dRatio) {
        sWidth = vHeight * dRatio;
        sx = (vWidth - sWidth) / 2;
    } else {
        sHeight = vWidth / dRatio;
        sy = (vHeight - sHeight) / 2;
    }

    context.save();
    context.translate(dx + dWidth, dy);
    context.scale(-1, 1);
    context.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
    context.restore();
}

function updateDownloadFilename() {
    let filename = filenameInput.value.trim().replace(/\s+/g, '-');
    if (filename === "") {
        filename = "picnix-photostrip";
    }
    downloadButton.setAttribute('download', `${filename}.png`);
}

function updateDownloadLink() {
    const dataUrl = canvas.toDataURL('image/png');
    downloadButton.href = dataUrl;
    updateDownloadFilename();
}

// --- ITO 'YUNG BUONG BAGONG LOGIC PARA SA BUGS ---
function updateCanvasDecorations() {
    if (!cleanStripImageData) return;

    // 1. Restore clean photos
    context.putImageData(cleanStripImageData, 0, 0);

    // 2. Redraw all placed stickers
    placedStickers.forEach(sticker => {
        try {
            context.drawImage(sticker.sticker, sticker.x, sticker.y, sticker.size, sticker.size);
        } catch (e) {
            console.error("Error redrawing sticker", e);
        }
    });

    // 3. Draw text based on CURRENT checkbox/input state
    const showDate = showDateCheck.checked;
    const customText = customTextInput.value;
    const layout = layoutDefinitions[currentLayoutId];

    context.fillStyle = (frameColor === '#000000' || frameColor === '#000') ? '#FFFFFF' : '#000000';
    context.textAlign = "center";
    
    // Draw Custom Cursive Text (if it exists)
    if (customText) {
        context.font = "700 20px 'Dancing Script'";
        context.fillText(customText, canvas.width / 2, canvas.height - 85);
    }
    
    // Draw Nixoshin
    context.font = "bold 30px 'Poppins'";
    context.fillText("Nixoshin", canvas.width / 2, canvas.height - 45);
    
    // Draw Date (if checked)
    if (showDate) {
        const d = new Date();
        const dateString = `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
        context.font = "20px 'Poppins'";
        context.fillText(dateString, canvas.width / 2, canvas.height - 15);
    }
    
    // 4. Update download link
    updateDownloadLink();
}


async function takePhotos() {
    startButton.disabled = true;
    changeLayoutButton.disabled = true;
    
    photoboothApp.classList.add('taking-photos-mode');
    resultColumn.style.display = 'none';
    controlsColumn.style.display = 'none';
    
    placedStickers = [];
    cleanStripImageData = null;
    selectedSticker = null;
    stickerImgs.forEach(img => img.classList.remove('selected'));
    canvas.classList.remove('sticker-mode');
    
    // I-clear 'yung custom text input
    customTextInput.value = "";

    const layout = layoutDefinitions[currentLayoutId];
    
    context.fillStyle = frameColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < shotsToTake; i++) {
        await startCountdown(selectedTimer);
        await triggerFlash();
        
        const rect = layout.shots[i];
        drawVideoToCanvas(rect.x, rect.y, rect.width, rect.height);
        
        if (i < shotsToTake - 1) {
            countdownElement.style.opacity = '1';
            countdownElement.textContent = `Pose ${i + 2}!`;
            await new Promise(resolve => setTimeout(resolve, 1500));
            countdownElement.style.opacity = '0';
        }
    }
    
    countdownElement.style.opacity = '1';
    countdownElement.textContent = "Done!";

    // Save clean version
    cleanStripImageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Save clean image (before text/sticker decorations) and navigate
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width  = canvas.width;
    tempCanvas.height = canvas.height;
    tempCanvas.getContext('2d').putImageData(cleanStripImageData, 0, 0);
    
    // Apply initial default decorations then save
    context.putImageData(cleanStripImageData, 0, 0);

    try {
        sessionStorage.setItem('picnix_cleanStrip', tempCanvas.toDataURL('image/jpeg', 0.92));
        sessionStorage.setItem('picnix_frameColor', frameColor);
        sessionStorage.setItem('picnix_layoutId', currentLayoutId);
    } catch(e) {
        console.warn('sessionStorage full, using fallback:', e);
    }

    // Track stats
    const sessions = parseInt(localStorage.getItem('nixoshin_sessions') || '0') + 1;
    const photos   = parseInt(localStorage.getItem('nixoshin_photos')   || '0') + shotsToTake;
    localStorage.setItem('nixoshin_sessions', sessions);
    localStorage.setItem('nixoshin_photos', photos);

    startButton.disabled   = false;
    changeLayoutButton.disabled = false;

    window.location.href = 'result.html';
}

function selectSticker(e) {
    const clickedSticker = e.currentTarget;

    if (selectedSticker === clickedSticker) {
        selectedSticker.classList.remove('selected');
        selectedSticker = null;
        canvas.classList.remove('sticker-mode');
    } else {
        stickerImgs.forEach(img => img.classList.remove('selected'));
        clickedSticker.classList.add('selected');
        selectedSticker = clickedSticker;
        canvas.classList.add('sticker-mode');
    }
}

function placeSticker(e) {
    if (!selectedSticker) return;

    const layout = layoutDefinitions[currentLayoutId];
    const stickerSize = 80;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickY = e.offsetY * scaleY;
    const footerTopY = canvas.height - layout.footerHeight;

    if (clickY > footerTopY) {
        alert("Bawal maglagay ng sticker sa text area!");
        return;
    }

    const x = (e.offsetX * scaleX) - (stickerSize / 2);
    const y = (e.offsetY * scaleY) - (stickerSize / 2);

    try {
        placedStickers.push({ sticker: selectedSticker, x: x, y: y, size: stickerSize });
        updateCanvasDecorations();
    } catch (err) {
        console.error("Error drawing sticker: ", err);
        if (typeof showModal !== 'undefined') {
            showModal({ title: 'Sticker Error', message: "Sorry, that sticker couldn't be added." });
        }
    }
}

stickerImgs.forEach(img => img.addEventListener('click', selectSticker));
canvas.addEventListener('click', placeSticker);

frameColorPicker.addEventListener('input', (e) => {
    frameColor = e.target.value;
    document.documentElement.style.setProperty('--preview-frame-color', frameColor);
    // Live preview: update layout card backgrounds
    document.querySelectorAll('.preview-strip').forEach(strip => {
        strip.style.backgroundColor = frameColor;
        strip.querySelectorAll('.preview-box').forEach(box => {
            // contrast: dark boxes on light bg, light boxes on dark bg
            const r = parseInt(frameColor.slice(1,3),16);
            const g = parseInt(frameColor.slice(3,5),16);
            const b = parseInt(frameColor.slice(5,7),16);
            const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
            box.style.backgroundColor = luminance > 0.5 ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.25)';
        });
    });
});

layoutCards.forEach(card => card.addEventListener('click', selectLayout));
timerButtons.forEach(btn => btn.addEventListener('click', selectTimer));
startAppButton.addEventListener('click', startApp);
changeLayoutButton.addEventListener('click', backToSetup);
startButton.addEventListener('click', takePhotos);
filenameInput.addEventListener('input', updateDownloadFilename);

// --- BAGONG EVENT LISTENERS ---
showDateCheck.addEventListener('change', updateCanvasDecorations);
customTextInput.addEventListener('input', updateCanvasDecorations); // Para live update!

setupWebcam();

// --- Particle Background Logic (Walang binago dito) ---
let particlesArray = [];
let mouse = {
    x: null,
    y: null,
    radius: 100
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        bgCtx.fillStyle = this.color;
        bgCtx.fill();
    }
    update() {
        if (this.x > bgCanvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > bgCanvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < bgCanvas.width - this.size * 10) {
                this.x += 5;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 5;
            }
            if (mouse.y < this.y && this.y < bgCanvas.height - this.size * 10) {
                this.y += 5;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 5;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (bgCanvas.height * bgCanvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = 'rgba(255, 255, 255, 0.6)';
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    bgCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

initParticles();
animateParticles();