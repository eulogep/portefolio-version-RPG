import { defineStore } from 'pinia';

const STORAGE_KEY = 'calculatrice-ultra';

function loadState() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return data || {};
  } catch {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    advancedExpression: state.advancedExpression,
    advancedResult: state.advancedResult,
    history: state.history,
  }));
}

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    // Mode avancé
    advancedExpression: loadState().advancedExpression || '',
    advancedResult: loadState().advancedResult || '0',
    // Historique partagé
    history: loadState().history || [],
    // Thème
    theme: localStorage.getItem('theme') || 'light',
    // Message d'erreur global
    errorMsg: '',
  }),
  actions: {
    setAdvancedExpression(expr) {
      this.advancedExpression = expr;
      saveState(this.$state);
    },
    setAdvancedResult(res) {
      this.advancedResult = res;
      saveState(this.$state);
    },
    addToHistory(entry) {
      this.history.unshift(entry);
      if (this.history.length > 50) this.history.pop();
      saveState(this.$state);
    },
    clearHistory() {
      this.history = [];
      saveState(this.$state);
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
    },
    // Synchronisation inter-tabs
    syncFromStorage() {
      const data = loadState();
      if (data.advancedExpression !== undefined) this.advancedExpression = data.advancedExpression;
      if (data.advancedResult !== undefined) this.advancedResult = data.advancedResult;
      if (data.history !== undefined) this.history = data.history;
    },
    // Message d'erreur global
    showError(msg) {
      this.errorMsg = msg;
      setTimeout(() => { this.errorMsg = ''; }, 2500);
    },
  },
});

// Synchronisation inter-tabs (storage event)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      const store = useCalculatorStore();
      store.syncFromStorage();
    }
  });
} 