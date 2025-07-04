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

  const carWidth = 100;
  const carHeight = 40;
  const roofHeight = 20;
  const carY = 120;

  // Car body
  ctx.fillStyle = '#007bff'; // blue body
  ctx.fillRect(car.x, carY, carWidth, carHeight);

  // Roof (sloped)
  ctx.fillStyle = '#3399ff';
  ctx.beginPath();
  ctx.moveTo(car.x + 20, carY);
  ctx.lineTo(car.x + 40, carY - roofHeight);
  ctx.lineTo(car.x + 60, carY - roofHeight);
  ctx.lineTo(car.x + 80, carY);
  ctx.closePath();
  ctx.fill();

  // Windows
  ctx.fillStyle = '#cceeff';
  ctx.fillRect(car.x + 42, carY - roofHeight + 2, 16, 16);
  ctx.fillRect(car.x + 22, carY - roofHeight + 2, 16, 16);

  // Wheels
  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.arc(car.x + 25, carY + carHeight + 10, 12, 0, Math.PI * 2); // front wheel
  ctx.arc(car.x + 75, carY + carHeight + 10, 12, 0, Math.PI * 2); // rear wheel
  ctx.fill();

  // Wheel hubs
  ctx.fillStyle = '#aaa';
  ctx.beginPath();
  ctx.arc(car.x + 25, carY + carHeight + 10, 5, 0, Math.PI * 2);
  ctx.arc(car.x + 75, carY + carHeight + 10, 5, 0, Math.PI * 2);
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

  if (car.x < canvas.width - 120) {
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
