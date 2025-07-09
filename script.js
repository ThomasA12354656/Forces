const canvas = document.getElementById("forcesCanvas");
const ctx = canvas.getContext("2d");

let position = 100;
let velocity = 0;
let acceleration = 0;

let mass = 5;
let force = 50;
let frictionEnabled = true;

const frictionCoefficient = 0.1;

const massSlider = document.getElementById("massSlider");
const massValue = document.getElementById("massValue");

const forceSlider = document.getElementById("forceSlider");
const forceValue = document.getElementById("forceValue");

const frictionToggle = document.getElementById("frictionToggle");

massSlider.oninput = () => {
  mass = parseFloat(massSlider.value);
  massValue.textContent = `${mass} kg`;
};

forceSlider.oninput = () => {
  force = parseFloat(forceSlider.value);
  forceValue.textContent = `${force} N`;
};

frictionToggle.onchange = () => {
  frictionEnabled = frictionToggle.checked;
};

function resetBlock() {
  position = 100;
  velocity = 0;
}

function updatePhysics() {
  let netForce = force;
  if (frictionEnabled) {
    const friction = frictionCoefficient * mass * 9.8;
    netForce -= friction;
    if (netForce < 0) netForce = 0;
  }

  acceleration = netForce / mass;
  velocity += acceleration;
  position += velocity * 0.1;

  if (position > canvas.width - 100) {
    position = canvas.width - 100;
    velocity *= -0.4; // bounce back a bit
  }
}

function drawBlock() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ground
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 300, canvas.width, 5);

  // Block
  ctx.fillStyle = "#00ffe0";
  ctx.fillRect(position, 260, 80, 40);

  // Label
  ctx.fillStyle = "#00ffe0";
  ctx.font = "16px Segoe UI";
  ctx.fillText(`Mass: ${mass}kg | Force: ${force}N`, 10, 20);
  ctx.fillText(`Friction: ${frictionEnabled ? "On" : "Off"}`, 10, 40);
  ctx.fillText(`Velocity: ${velocity.toFixed(2)} px/frame`, 10, 60);
}

function animate() {
  updatePhysics();
  drawBlock();
  requestAnimationFrame(animate);
}

animate();
