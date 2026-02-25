async function generateGame() {
  const description = prompt("Décris ton jeu :");
  if(!description) return;

  const user = supabase.auth.user();
  if(!user) { alert("Connecte-toi d'abord"); return; }

  // Appel OpenAI GPT-4 pour générer un vrai jeu Phaser 3
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer TON_OPENAI_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {role:"system", content:"Tu es un générateur de jeu Phaser 3 complet en JavaScript, jouable dans un canvas."},
        {role:"user", content:`Crée un jeu complet basé sur : ${description}. Renvoie uniquement le code JS prêt à exécuter.`}
      ],
      max_tokens: 1500
    })
  });

  const data = await response.json();
  const gameCode = data.choices[0].message.content;

  // Stockage du jeu dans Supabase
  const { error } = await supabase.from("games").insert([{ user_id: user.id, name: description, code: gameCode }]);
  if(error) { alert("Erreur stockage : " + error.message); return; }

  alert("Jeu généré et sauvegardé !");

  // Charger le jeu
  currentGameCode = gameCode;
  startGame();
}
