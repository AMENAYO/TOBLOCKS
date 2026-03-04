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
