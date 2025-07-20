<template>
  <div>
    <ErrorBanner />
    <div class="app-bg">
      <nav class="main-nav">
        <router-link to="/">Calculatrice simple</router-link>
        <router-link to="/avancee">Calculatrice avancée</router-link>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import ErrorBanner from './components/ErrorBanner.vue';
import { useCalculatorStore } from './store/calculator';

const store = useCalculatorStore();
provide('errorMsg', store.errorMsg);
</script>

<style>
body, html, #app, .app-bg {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: 'Inter', Arial, sans-serif;
  width: 100vw;
  height: 100vh;
}
.app-bg {
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  /* Gradient animé Solo Leveling */
  background: linear-gradient(120deg, #181828 0%, #232946 40%, #00c6ff 100%);
  background-size: 200% 200%;
  animation: bgMove 12s ease-in-out infinite;
  position: relative;
  overflow-x: hidden;
}
@keyframes bgMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.main-nav {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 2rem 0 1rem 0;
  z-index: 2;
}
.main-nav a {
  color: #00c6ff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: color 0.2s, text-shadow 0.2s;
  text-shadow: 0 0 8px #00c6ff, 0 0 16px #7f5fff;
}
.main-nav a.router-link-exact-active {
  color: #ffd700;
  text-shadow: 0 0 12px #ffd700, 0 0 24px #00c6ff;
}
</style>
