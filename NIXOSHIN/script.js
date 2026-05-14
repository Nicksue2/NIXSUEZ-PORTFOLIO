const layoutCards = document.querySelectorAll(".layout-card");
const frameColorPicker = document.getElementById("frameColorPicker");
const timerButtons = document.querySelectorAll(".timer-button");
const startAppButton = document.getElementById("startAppButton");

const bgCanvas = document.getElementById("bg-canvas");
const bgCtx = bgCanvas ? bgCanvas.getContext("2d") : null;

let currentLayoutId = null;
let selectedTimer = 3;

// Layout Selection
if (layoutCards.length > 0) {
  layoutCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      currentLayoutId = e.currentTarget.dataset.layout;
      layoutCards.forEach((c) => c.classList.remove("selected"));
      e.currentTarget.classList.add("selected");
      startAppButton.disabled = false;
    });
  });
}

// Timer Selection
if (timerButtons.length > 0) {
  timerButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      selectedTimer = parseInt(e.currentTarget.dataset.timer, 10);
      timerButtons.forEach((b) => b.classList.remove("selected"));
      e.currentTarget.classList.add("selected");
    });
  });
}

// Color Picker Preview
if (frameColorPicker) {
  frameColorPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    document.querySelectorAll(".preview-strip").forEach((strip) => {
      strip.style.backgroundColor = color;
    });
  });
}

// Start Session
if (startAppButton) {
  startAppButton.addEventListener("click", () => {
    sessionStorage.setItem("nixoshin_layout", currentLayoutId);
    sessionStorage.setItem("nixoshin_frameColor", frameColorPicker.value);
    sessionStorage.setItem("nixoshin_timer", selectedTimer);

    if (typeof gsap !== "undefined") {
      gsap.to("#setupScreen", {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          window.location.href = "/NIXOSHIN/session.html";
        },
      });
    } else {
      window.location.href = "/NIXOSHIN/session.html";
    }
  });
}

// Particles Background for Index
if (bgCanvas && bgCtx) {
  let particlesArray = [];
  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor(x, y, dX, dY, size) {
      this.x = x;
      this.y = y;
      this.dX = dX;
      this.dY = dY;
      this.size = size;
    }
    draw() {
      bgCtx.beginPath();
      bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      bgCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
      bgCtx.fill();
    }
    update() {
      if (this.x > bgCanvas.width || this.x < 0) this.dX = -this.dX;
      if (this.y > bgCanvas.height || this.y < 0) this.dY = -this.dY;
      this.x += this.dX;
      this.y += this.dY;
      this.draw();
    }
  }
  function initParticles() {
    particlesArray = [];
    let num = (bgCanvas.height * bgCanvas.width) / 12000;
    for (let i = 0; i < num; i++) {
      let size = Math.random() * 3 + 1;
      let x = Math.random() * bgCanvas.width;
      let y = Math.random() * bgCanvas.height;
      particlesArray.push(
        new Particle(
          x,
          y,
          Math.random() * 0.4 - 0.2,
          Math.random() * 0.4 - 0.2,
          size,
        ),
      );
    }
  }
  function animate() {
    requestAnimationFrame(animate);
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    particlesArray.forEach((p) => p.update());
  }
  initParticles();
  animate();
}
