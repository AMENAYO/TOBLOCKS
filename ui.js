function createUI(){

  const ui = document.createElement("div");
  ui.style.position = "absolute";
  ui.style.top = "20px";
  ui.style.left = "20px";
  ui.style.color = "white";
  ui.style.fontSize = "20px";
  ui.innerHTML = `
    <div>🔥 TOBLOCKS</div>
    <div id="level">Niveau 1</div>
    <div id="xp">XP 0</div>
  `;

  document.body.appendChild(ui);
}
function createBossBar(){

  const bar = document.createElement("div");
  bar.id = "bossbar";
  bar.style.position = "absolute";
  bar.style.top = "10px";
  bar.style.left = "50%";
  bar.style.transform = "translateX(-50%)";
  bar.style.width = "400px";
  bar.style.height = "20px";
  bar.style.background = "black";

  const life = document.createElement("div");
  life.id = "bosslife";
  life.style.height = "100%";
  life.style.background = "red";
  life.style.width = "100%";

  bar.appendChild(life);
  document.body.appendChild(bar);
}
