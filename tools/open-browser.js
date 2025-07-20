// Script Node.js pour ouvrir automatiquement le navigateur sur le port Vite (par défaut 5173)
const open = require('open');

const PORT = process.env.PORT || 5173;
const URL = `http://localhost:${PORT}`;

open(URL).then(() => {
  console.log(`Navigateur ouvert sur ${URL}`);
});
