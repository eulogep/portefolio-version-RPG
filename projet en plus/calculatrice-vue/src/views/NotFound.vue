<template>
  <div class="notfound card">
    <div class="notfound-icon">🚫</div>
    <h1>404</h1>
    <p>Oups, cette page n'existe pas.<br />
      <router-link to="/" class="notfound-btn">Retour à la calculatrice</router-link>
    </p>
  </div>
</template>
<style scoped>
.notfound {
  text-align: center;
  margin: 4rem auto 0 auto;
  max-width: 400px;
  padding: 2.5em 1.5em;
  background: var(--color-surface, rgba(255,255,255,0.12));
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border, rgba(255,255,255,0.18));
  animation: pop404 0.7s cubic-bezier(.4,2,.6,1);
}
@keyframes pop404 {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}
.notfound-icon {
  font-size: 3.5rem;
  margin-bottom: 0.5em;
  color: var(--color-error, #ff4d4f);
  text-shadow: 0 0 12px var(--color-error, #ff4d4f);
}
h1 {
  font-size: 4.2rem;
  color: var(--color-primary, #00c6ff);
  margin-bottom: 0.2em;
}
p {
  font-size: 1.25rem;
  color: var(--color-surface-light, #fff);
  margin-bottom: 1.5em;
}
.notfound-btn {
  display: inline-block;
  margin-top: 1.2em;
  padding: 0.7em 1.5em;
  background: var(--color-primary, #00c6ff);
  color: #fff;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.1em;
  text-decoration: none;
  box-shadow: 0 2px 8px 0 rgba(0,198,255,0.10);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}
.notfound-btn:hover, .notfound-btn:focus {
  background: var(--color-accent, #ffd700);
  color: #232946;
  box-shadow: 0 4px 16px 0 rgba(255,215,0,0.18);
}
@media (max-width: 600px) {
  .notfound {
    margin-top: 2.5rem;
    padding: 1.2em 0.5em;
  }
  h1 {
    font-size: 2.5rem;
  }
}
</style> 