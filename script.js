let player = document.getElementById("player");
let world = document.getElementById("world");

let x = 1000;
let y = 1000;
let speed = 6;

let oreCount = 0;
let fruitCount = 0;
let hasSword = false;
let xp = 0;

let skins = [
    {color:"cyan", rarity:""},
    {color:"green", rarity:"rare"},
    {color:"purple", rarity:"legendary"}
];

let currentSkin = 0;

player.style.left = x+"px";
player.style.top = y+"px";

document.addEventListener("keydown", move);
document.addEventListener("keydown", attack);

function move(e){
    if(e.key==="ArrowUp") y-=speed;
    if(e.key==="ArrowDown") y+=speed;
    if(e.key==="ArrowLeft") x-=speed;
    if(e.key==="ArrowRight") x+=speed;

    player.style.left = x+"px";
    player.style.top = y+"px";

    updateCamera();
    checkCollision();
}

function updateCamera(){
    document.getElementById("camera").scrollLeft = x-300;
    document.getElementById("camera").scrollTop = y-200;
}

function spawn(className){
    let obj = document.createElement("div");
    obj.classList.add(className);
    obj.style.left = Math.random()*1900+"px";
    obj.style.top = Math.random()*1900+"px";
    world.appendChild(obj);
}

function checkCollision(){
    document.querySelectorAll(".ore").forEach(o=>{
        if(collide(o)){
            oreCount++;
            document.getElementById("ore").textContent=oreCount;
            o.remove();
        }
    });

    document.querySelectorAll(".fruit").forEach(f=>{
        if(collide(f)){
            fruitCount++;
            document.getElementById("fruitCount").textContent=fruitCount;
            f.remove();
            activateFirePower();
        }
    });
}

function collide(obj){
    let r1 = player.getBoundingClientRect();
    let r2 = obj.getBoundingClientRect();
    return !(r1.top>r2.bottom||r1.bottom<r2.top||r1.right<r2.left||r1.left>r2.right);
}

function activateFirePower(){
    player.style.background="orange";
    speed=12;
    setTimeout(()=>{
        speed=6;
        applySkin();
    },5000);
}

function craftSword(){
    if(oreCount>=10){
        oreCount-=10;
        hasSword=true;
        document.getElementById("ore").textContent=oreCount;
        document.getElementById("sword").textContent="Oui";
    }
}

function attack(e){
    if(e.key===" " && hasSword){
        document.querySelectorAll(".mob").forEach(m=>{
            if(collide(m)){
                m.remove();
                xp+=10;
                document.getElementById("xp").textContent=xp;
            }
        });
    }
}

function changeSkin(){
    currentSkin=(currentSkin+1)%skins.length;
    applySkin();
}

function applySkin(){
    player.className="";
    player.style.background=skins[currentSkin].color;
    if(skins[currentSkin].rarity)
        player.classList.add(skins[currentSkin].rarity);
}

setInterval(()=>spawn("ore"),2000);
setInterval(()=>spawn("fruit"),8000);
setInterval(()=>spawn("mob"),5000);
