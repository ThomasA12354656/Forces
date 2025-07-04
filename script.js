const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

let car = {
  x: 50,
  v: 0,
  a: 0,
  mass: 1000,
};

let force = 2000;
let friction = 300;
let running = false;
let lastTime = null;

const velocityDisplay = document.getElementById('velocity');
const accelerationDisplay = document.getElementById('acceleration');

function updateInputs() {
  car.mass = parseFloat(document.getElementById('mass').value);
  force = parseFloat(document.getElementById('force').value);
  friction = parseFloat(document.getElementById('friction').value);
}

function resetSimulation() {
  car.x = 50;
  car.v = 0;
  car.a = 0;
  running = false;
  lastTime = null;
  drawCar();
  velocityDisplay.textContent = '0';
  accelerationDisplay.textContent = '0';
}

function drawCar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(car.x, 100, 60, 30); // car body
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(car.x + 10, 135, 8, 0, Math.PI * 2); // wheel 1
  ctx.arc(car.x + 50, 135, 8, 0, Math.PI * 2); // wheel 2
  ctx.fill();
}

function simulateStep(dt) {
  const netForce = force - friction;
  car.a = netForce / car.mass;
  car.v += car.a * dt;
  car.x += car.v * dt;

  // Update displays
  velocityDisplay.textContent = car.v.toFixed(2);
  accelerationDisplay.textContent = car.a.toFixed(2);
}

function loop(timestamp) {
  if (!running) return;

  if (lastTime == null) lastTime = timestamp;
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  simulateStep(dt);
  drawCar();

  if (car.x < canvas.width - 80) {
    requestAnimationFrame(loop);
  }
}

document.getElementById('startBtn').addEventListener('click', () => {
  updateInputs();
  if (!running) {
    running = true;
    requestAnimationFrame(loop);
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  resetSimulation();
});

resetSimulation(); // Draw initial state
