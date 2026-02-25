const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: 100,
  y: 200,
  size: 40,
  color: "red",
  speed: 5
};

let score = 0;
let keys = {};

let enemy = {
  x: 700,
  y: 200,
  size: 40,
  speed: 3
};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function startGame() {
  update();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  enemy.x -= enemy.speed;
  if (enemy.x < 0) {
    enemy.x = canvas.width;
    score++;
  }

  if (
    player.x < enemy.x + enemy.size &&
    player.x + player.size > enemy.x &&
    player.y < enemy.y + enemy.size &&
    player.y + player.size > enemy.y
  ) {
    alert("Game Over ! Score: " + score);
    document.location.reload();
  }

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);

  ctx.fillStyle = "white";
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 20, 30);

  requestAnimationFrame(update);
}

function changeSkin() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  player.color = colors[Math.floor(Math.random() * colors.length)];
}
