let player = document.getElementById("player");
let game = document.getElementById("game");

let oreCount = 0;
let fruitCount = 0;

let x = 280;
let y = 180;
let speed = 10;

document.addEventListener("keydown", move);

function move(e) {
    if (e.key === "ArrowUp") y -= speed;
    if (e.key === "ArrowDown") y += speed;
    if (e.key === "ArrowLeft") x -= speed;
    if (e.key === "ArrowRight") x += speed;

    player.style.left = x + "px";
    player.style.top = y + "px";

    checkCollision();
}

function spawnOre() {
    let ore = document.createElement("div");
    ore.classList.add("ore");
    ore.style.left = Math.random()*570 + "px";
    ore.style.top = Math.random()*370 + "px";
    game.appendChild(ore);
}

function spawnFruit() {
    let fruit = document.createElement("div");
    fruit.classList.add("fruit");
    fruit.style.left = Math.random()*570 + "px";
    fruit.style.top = Math.random()*370 + "px";
    game.appendChild(fruit);
}

function checkCollision() {
    document.querySelectorAll(".ore").forEach(o => {
        if (isColliding(player, o)) {
            oreCount++;
            document.getElementById("ore").textContent = oreCount;
            o.remove();
        }
    });

    document.querySelectorAll(".fruit").forEach(f => {
        if (isColliding(player, f)) {
            fruitCount++;
            document.getElementById("fruitCount").textContent = fruitCount;
            f.remove();
            activatePower();
        }
    });
}

function isColliding(a, b) {
    let rect1 = a.getBoundingClientRect();
    let rect2 = b.getBoundingClientRect();
    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.right < rect2.left ||
        rect1.left > rect2.right
    );
}

function activatePower() {
    speed = 20;
    player.style.background = "yellow";

    setTimeout(() => {
        speed = 10;
        player.style.background = currentSkin;
    }, 5000);
}

let skins = ["cyan", "green", "purple", "orange"];
let currentSkin = "cyan";

function changeSkin() {
    let index = skins.indexOf(currentSkin);
    index = (index + 1) % skins.length;
    currentSkin = skins[index];
    player.style.background = currentSkin;
}

setInterval(spawnOre, 2000);
setInterval(spawnFruit, 8000);
