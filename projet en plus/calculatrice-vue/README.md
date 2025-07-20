# Calculatrice Ultra Vue.js

Une calculatrice scientifique moderne, responsive et ultra-rapide, développée avec **Vue 3**, **Pinia** (gestion d’état), **Cypress** (tests E2E) et **PWA** (installable, offline).

## 🚀 Fonctionnalités
- Calculs de base (+, -, ×, ÷)
- Fonctions scientifiques (sin, cos, tan, racine, carré, cube, etc.)
- Historique des calculs
- Dark mode / Light mode
- Interface responsive et moderne
- Tests end-to-end avec Cypress
- **Progressive Web App** (installable, offline)

## 📦 Installation

```bash
npm install
```

## 🖥️ Lancer le projet

```bash
npm run dev
```

L’application sera accessible sur :

👉 [http://localhost:5000](http://localhost:5000) ou [http://localhost:5001](http://localhost:5001) (selon la disponibilité du port)

## 📲 Installer comme application (PWA)
- Ouvre l’application dans ton navigateur (Chrome, Edge, Firefox, Safari).
- Clique sur “Installer” dans la barre d’adresse ou le menu du navigateur.
- L’application fonctionne **offline** après la première visite.

## 🧪 Lancer les tests Cypress

1. Démarrer le serveur :
   ```bash
   npm run dev
   ```
2. Ouvrir Cypress dans un autre terminal :
   ```bash
   npx cypress open
   ```
   > ⚠️ Si le port 5000 est occupé, Vite utilisera 5001 automatiquement. Vérifiez l’URL affichée dans le terminal et adaptez la config Cypress si besoin.

## 🗂️ Structure du projet
- `src/components/Calculator.vue` : composant principal de la calculatrice
- `src/store/calculator.js` : store Pinia (état/calculs)
- `calc.cy.js` : tests E2E Cypress

## ✨ Personnalisation
- Change le style dans `Calculator.vue` ou `style.css`
- Ajoute des fonctionnalités dans le store Pinia

## 📝 Auteur
Projet généré et modernisé automatiquement avec ❤️
