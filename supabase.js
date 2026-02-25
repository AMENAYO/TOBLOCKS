const SUPABASE_URL = "https://cdtssgrgugrdiufqbdlm.supabase.co";
const SUPABASE_KEY = "sb_publishable_-bvOyCZ9qn2vNI5DRWpeeA_K9UqJ3GY";
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Comptes
async function register() {
  const email = prompt("Email:");
  const password = prompt("Mot de passe:");
  const { error } = await supabase.auth.signUp({ email, password });
  if(error) alert(error.message);
  else alert("Compte créé ! Vérifie ton email.");
}

async function login() {
  const email = prompt("Email:");
  const password = prompt("Mot de passe:");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if(error) alert(error.message);
  else alert("Connecté !");
}

async function logout() {
  const { error } = await supabase.auth.signOut();
  if(error) alert(error.message);
  else alert("Déconnecté !");
}

// Skins
async function loadSkins() {
  const user = supabase.auth.user();
  if(!user) return [];

  const { data, error } = await supabase.from("skins").select("*").eq("user_id", user.id);
  if(error) console.error(error);
  return data || [];
}

async function addSkin(name, imageURL) {
  const user = supabase.auth.user();
  if(!user) return;
  const { error } = await supabase.from("skins").insert([{ user_id: user.id, name, image: imageURL }]);
  if(error) console.error(error);
}
