async function generateGame() {
  const description = prompt("Décris ton jeu :");

  if(!description) return;

  const user = supabase.auth.user();
  if(!user) { alert("Connecte-toi d'abord"); return; }

  // --- Appel OpenAI pour générer le code Phaser ---
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer TON_OPENAI_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {role:"system", content:"Tu es un générateur de jeu Phaser 3 en JS. Génère un jeu complet, jouable dans un canvas, basé sur la description de l'utilisateur."},
        {role:"user", content:`Description du jeu : ${description}. Renvoie uniquement le code JS.`}
      ],
      max_tokens: 1500
    })
  });

  const data = await response.json();
  const gameCode = data.choices[0].message.content;

  // --- Stockage dans Supabase ---
  const { error } = await supabase.from("games").insert([{ user_id: user.id, name: description, code: gameCode }]);
  if(error) { alert("Erreur stockage : " + error.message); return; }

  alert("Jeu généré et sauvegardé !");

  // --- Injection du code dans la page pour exécution ---
  const script = document.createElement("script");
  script.textContent = gameCode;
  document.body.appendChild(script);
}
