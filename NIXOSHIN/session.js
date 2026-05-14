// Nixoshin — Session Logic
const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const changeLayoutButton = document.getElementById('changeLayoutButton');
const countdownElement = document.getElementById('countdown');
const liveView = document.getElementById('liveView');
const flashEffect = document.getElementById('flashEffect');
const poseInfoText = document.getElementById('poseInfoText');
const canvas = document.getElementById('photoStrip');
const context = canvas.getContext('2d');

const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');

// Read settings from sessionStorage
const currentLayoutId = sessionStorage.getItem('nixoshin_layout') || 'layout-a';
const frameColor = sessionStorage.getItem('nixoshin_frameColor') || '#FFFFFF';
const selectedTimer = parseInt(sessionStorage.getItem('nixoshin_timer') || '3', 10);

const layoutDefinitions = {
    'layout-a': {
        canvasWidth: 510,
        canvasHeight: 1260,
        footerHeight: 120,
        padding: 15,
        shots: [
            { x: 15, y: 15, width: 480, height: 360 },
            { x: 15, y: 390, width: 480, height: 360 },
            { x: 15, y: 765, width: 480, height: 360 },
        ]
    },
    'layout-b': {
        canvasWidth: 510,
        canvasHeight: 1635,
        footerHeight: 120,
        padding: 15,
        shots: [
            { x: 15, y: 15, width: 480, height: 360 },
            { x: 15, y: 390, width: 480, height: 360 },
            { x: 15, y: 765, width: 480, height: 360 },
            { x: 15, y: 1140, width: 480, height: 360 },
        ]
    }
};

const layout = layoutDefinitions[currentLayoutId];
const shotsToTake = layout.shots.length;

async function setupWebcam() {
    try {
        const initialStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        initialStream.getTracks().forEach(t => t.stop());

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(d => d.kind === 'videoinput');
        const savedId = localStorage.getItem('nixoshin_lastCameraId');
        const savedCamera = cameras.find(c => c.deviceId === savedId);
        const frontCamera = cameras.find(c => /front|user/i.test(c.label));
        const target = savedCamera || frontCamera || cameras[0];

        const constraints = {
            video: target ? { deviceId: { exact: target.deviceId } } : { facingMode: 'user' },
            audio: false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        await video.play();
        
        poseInfoText.textContent = `Get ready for ${shotsToTake} poses!`;
    } catch (err) {
        console.error("Error accessing the webcam: ", err);
        poseInfoText.textContent = "Camera access error. Please refresh.";
    }
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

function triggerFlash() {
    return new Promise(resolve => {
        flashEffect.style.transition = 'none';
        flashEffect.style.opacity    = '1';
        void flashEffect.offsetHeight;
        requestAnimationFrame(() => {
            flashEffect.style.transition = 'opacity 0.28s ease-out';
            flashEffect.style.opacity    = '0';
        });
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

async function takePhotos() {
    startButton.disabled = true;
    changeLayoutButton.disabled = true;
    
    canvas.width = layout.canvasWidth;
    canvas.height = layout.canvasHeight;
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

    const cleanImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width  = canvas.width;
    tempCanvas.height = canvas.height;
    tempCanvas.getContext('2d').putImageData(cleanImageData, 0, 0);

    try {
        sessionStorage.setItem('picnix_cleanStrip', tempCanvas.toDataURL('image/jpeg', 0.92));
        sessionStorage.setItem('picnix_frameColor', frameColor);
        sessionStorage.setItem('picnix_layoutId', currentLayoutId);
    } catch(e) { console.warn(e); }

    // Stats
    const sessions = parseInt(localStorage.getItem('nixoshin_sessions') || '0') + 1;
    const photos   = parseInt(localStorage.getItem('nixoshin_photos')   || '0') + shotsToTake;
    localStorage.setItem('nixoshin_sessions', sessions);
    localStorage.setItem('nixoshin_photos', photos);

    setTimeout(() => {
        window.location.href = '/NIXOSHIN/result.html';
    }, 1000);
}

startButton.addEventListener('click', takePhotos);
changeLayoutButton.addEventListener('click', () => {
    window.location.href = '/NIXOSHIN/index.html';
});

setupWebcam();

// Particles
let particlesArray = [];
function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y;
        this.directionX = directionX; this.directionY = directionY;
        this.size = size; this.color = color;
    }
    draw() {
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        bgCtx.fillStyle = this.color;
        bgCtx.fill();
    }
    update() {
        if (this.x > bgCanvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > bgCanvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}
function initParticles() {
    particlesArray = [];
    let numberOfParticles = (bgCanvas.height * bgCanvas.width) / 12000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = Math.random() * bgCanvas.width;
        let y = Math.random() * bgCanvas.height;
        let dX = (Math.random() * 0.4) - 0.2;
        let dY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, dX, dY, size, 'rgba(255, 255, 255, 0.4)'));
    }
}
function animate() {
    requestAnimationFrame(animate);
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    particlesArray.forEach(p => p.update());
}
initParticles();
animate();
