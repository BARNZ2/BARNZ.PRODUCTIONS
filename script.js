// STAR BACKGROUND
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      radius: random(1, 2.5), // Increased the size a bit
      dx: random(-0.3, 0.3),
      dy: random(-0.3, 0.3),
      glow: random(0.5, 1)
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    const glowEffect = `rgba(0, 255, 255, ${1 * star.glow})`;
    ctx.fillStyle = glowEffect;
    ctx.shadowBlur = 20;  // Increased blur for a more visible trail effect
    ctx.shadowColor = glowEffect;
    ctx.fill();
  }
}

function animateStars() {
  for (const star of stars) {
    star.x += star.dx;
    star.y += star.dy;
    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
  }
}

function loopStars() {
  animateStars();
  drawStars();
  requestAnimationFrame(loopStars);
}

createStars(200);
loopStars();

window.addEventListener("click", e => interact(e.clientX, e.clientY));
window.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  interact(touch.clientX, touch.clientY);
});

function interact(x, y) {
  for (let i = 0; i < 10; i++) {
    stars.push({
      x,
      y,
      radius: random(1, 2.5), // Increased the size of new stars too
      dx: random(-0.5, 0.5),
      dy: random(-0.5, 0.5),
      glow: 1
    });
  }
}

// TYPING LOOP
const terminal = document.getElementById("terminal");
const message = `b4rnz@kali:~$ ssh user@target.com 'while :; do echo "Attempting password crack..."; sleep 0.2; done' & sudo rm -rf /dev/null`;

let index = 0;
let typing = true;

function typeLoop() {
  if (typing) {
    if (index < message.length) {
      terminal.textContent += message[index++];
      setTimeout(typeLoop, 80);
    } else {
      setTimeout(() => {
        typing = false;
        typeLoop();
      }, 1000);
    }
  } else {
    if (index > 0) {
      terminal.textContent = message.substring(0, --index);
      setTimeout(typeLoop, 40);
    } else {
      typing = true;
      setTimeout(typeLoop, 500);
    }
  }
}
window.onload = () => {
  typeLoop();
};

// Dropdown Toggle (Corrected)
function toggleDropdown(index) {
  const dropdown = document.getElementById(`dropdown-${index}`);
  
  // Close all other dropdowns before toggling the clicked one
  document.querySelectorAll('.dropdown').forEach(d => {
    if (d !== dropdown) {
      d.style.display = 'none';
    }
  });
  
  // Toggle the clicked dropdown
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Copy Link functionality
function copyLink(id) {
  const input = document.querySelector(`#${id} input`);
  input.select();
  document.execCommand("copy");
  alert("Link copied!");
}
// Gallery Toggle
const galleryBtn = document.getElementById("galleryBtn");
const galleryModal = document.getElementById("galleryModal");

galleryBtn.addEventListener("click", toggleGallery);

function toggleGallery() {
  galleryModal.classList.toggle("active");
}
