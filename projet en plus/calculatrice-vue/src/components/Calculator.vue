<template>
  <div :class="['calculator-app', theme, selectedTheme]">
    <button class="skip-link" aria-label="Aller au contenu principal" @click="handleSkipLink">Aller au contenu principal</button>
    <div class="calculator-header card">
      <h2 id="main-content" ref="mainContentRef" tabindex="-1">Calculatrice Ultra Vue.js</h2>
      <div class="theme-select-group">
        <select v-model="selectedTheme" class="theme-select" aria-label="Thème Solo Leveling">
          <option v-for="t in themes" :key="t.key" :value="t.key">{{ t.name }}</option>
        </select>
        <button class="theme-toggle" @click="toggleTheme" aria-label="Changer le mode clair/sombre" :tabindex="0">
          <span v-if="theme === 'light'">🌙</span>
          <span v-else>☀️</span>
        </button>
      </div>
    </div>
    <div class="calculator card">
      <div v-if="mode === 'advanced'">
        <div class="sci-funcs">
          <button v-for="f in sciFunctions" :key="f.label" @click="insertSciFunc(f.insert)" :aria-label="'Insérer la fonction ' + f.label" class="sci-btn">
            {{ f.label }}
          </button>
        </div>
        <input v-model="expression" class="expression-input" aria-label="Expression mathématique" autofocus />
        <div class="display advanced" role="status" aria-live="polite">
          <transition name="fade-result">
            <span :key="result">{{ result }}</span>
          </transition>
          <button class="copy-btn" @click="copyResult" :aria-label="copied ? 'Résultat copié !' : 'Copier le résultat'">
            <span v-if="!copied">📋</span>
            <span v-else>✅</span>
          </button>
        </div>
        <div class="buttons-grid">
          <button v-for="b in ['7','8','9','÷','4','5','6','×','1','2','3','-','0','.','+','(',')','C','DEL','=']" :key="b" @click="handleButton(b)" :aria-label="'Touche ' + b" class="calc-btn">{{ b }}</button>
        </div>
        <div class="unit-converter card">
          <h4>Conversion d’unités</h4>
          <div class="unit-row">
            <select v-model="selectedCategory" :aria-label="'Catégorie d’unités'">
              <option v-for="cat in unitCategories" :key="cat.label" :value="cat">{{ cat.label }}</option>
            </select>
            <select v-model="fromUnit" :aria-label="'De'">
              <option v-for="u in selectedCategory.units" :key="u.value" :value="u">{{ u.label }}</option>
            </select>
            <span class="arrow">→</span>
            <select v-model="toUnit" :aria-label="'Vers'">
              <option v-for="u in selectedCategory.units" :key="u.value" :value="u">{{ u.label }}</option>
            </select>
          </div>
          <div class="unit-row">
            <input v-model="unitInput" type="number" placeholder="Valeur à convertir" @input="convertUnit" aria-label="Valeur à convertir" />
            <span class="unit-eq">=</span>
            <input :value="unitResult" readonly placeholder="Résultat" aria-label="Résultat conversion" />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="display card" role="status" aria-live="polite" aria-atomic="true">
          <div class="previous-operand" aria-label="Opération précédente">{{ simplePrevious ? simplePrevious + ' ' + simpleOperation : '' }}</div>
          <div class="current-operand" aria-label="Résultat ou saisie en cours">
            <transition name="fade-result">
              <span :key="simpleCurrent">{{ simpleCurrent }}</span>
            </transition>
            <button class="copy-btn" @click="copyResult" :aria-label="copied ? 'Résultat copié !' : 'Copier le résultat'">
              <span v-if="!copied">📋</span>
              <span v-else>✅</span>
            </button>
          </div>
        </div>
        <div class="buttons-grid">
          <button @click="appendNumberSimple('7')" aria-label="Touche 7" class="calc-btn">7</button>
          <button @click="appendNumberSimple('8')" aria-label="Touche 8" class="calc-btn">8</button>
          <button @click="appendNumberSimple('9')" aria-label="Touche 9" class="calc-btn">9</button>
          <button @click="chooseOperationSimple('÷')" aria-label="Touche ÷" class="calc-btn">÷</button>
          <button @click="appendNumberSimple('4')" aria-label="Touche 4" class="calc-btn">4</button>
          <button @click="appendNumberSimple('5')" aria-label="Touche 5" class="calc-btn">5</button>
          <button @click="appendNumberSimple('6')" aria-label="Touche 6" class="calc-btn">6</button>
          <button @click="chooseOperationSimple('×')" aria-label="Touche ×" class="calc-btn">×</button>
          <button @click="appendNumberSimple('1')" aria-label="Touche 1" class="calc-btn">1</button>
          <button @click="appendNumberSimple('2')" aria-label="Touche 2" class="calc-btn">2</button>
          <button @click="appendNumberSimple('3')" aria-label="Touche 3" class="calc-btn">3</button>
          <button @click="chooseOperationSimple('-')" aria-label="Touche -" class="calc-btn">-</button>
          <button class="span-two calc-btn" @click="appendNumberSimple('0')" aria-label="Touche 0">0</button>
          <button @click="appendNumberSimple('.')" aria-label="Touche ." class="calc-btn">.</button>
          <button @click="chooseOperationSimple('+')" aria-label="Touche +" class="calc-btn">+</button>
          <button class="span-two calc-btn" @click="clearSimple" aria-label="Tout effacer">C</button>
          <button @click="deleteLastSimple" aria-label="Effacer un chiffre" class="calc-btn">DEL</button>
          <button class="equals calc-btn" @click="computeSimple" aria-label="Calculer le résultat">=</button>
        </div>
      </div>
      <div class="history card" aria-label="Historique des calculs" tabindex="0">
        <div class="history-header">
          <h3>Historique</h3>
          <button class="clear-history-btn" @click="clearHistoryWithConfirm" aria-label="Vider l’historique">
            <span class="trash-icon">🗑️</span>
            <span class="clear-text">Vider</span>
          </button>
        </div>
        <transition-group name="fade-history" tag="ul">
          <li v-for="(item, i) in history" :key="item + i" aria-label="Historique ligne {{i+1}}">{{ item }}</li>
        </transition-group>
      </div>
    </div>
    <div v-if="loadingPWA" class="pwa-loader"><span class="loader"></span> Chargement PWA…</div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useCalculatorStore } from '../store/calculator';
import { storeToRefs } from 'pinia';

const props = defineProps({ mode: { type: String, default: 'simple' } });
const store = useCalculatorStore();
const { theme, history, loadingPWA } = storeToRefs(store);
const { toggleTheme } = store;

// Expression dynamique pour le mode avancé
const expression = ref('');
const result = ref('0');

const sciFunctions = [
  { label: 'sin', insert: 'sin(' },
  { label: 'cos', insert: 'cos(' },
  { label: 'tan', insert: 'tan(' },
  { label: 'log', insert: 'log(' },
  { label: 'ln', insert: 'ln(' },
  { label: '√', insert: 'sqrt(' },
  { label: 'exp', insert: 'exp(' },
  { label: 'abs', insert: 'abs(' },
  { label: 'π', insert: 'pi' },
  { label: 'e', insert: 'e' },
  { label: 'xʸ', insert: '^' },
];
function insertSciFunc(f) {
  if (f === '^') expression.value += '^';
  else expression.value += f;
}

function safeEval(expr) {
  try {
    let jsExpr = expr
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/\^/g, '**')
      .replace(/pi/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/abs\(/g, 'Math.abs(')
      .replace(/exp\(/g, 'Math.exp(')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(');
    if (!/^[0-9+\-*/()., MathPIEabsqrtlogincosxtan]+$/.test(jsExpr.replace(/\s/g, ''))) {
      store.showError('Erreur de calcul');
      return 'Erreur';
    }
    // eslint-disable-next-line no-eval
    const res = eval(jsExpr);
    if (typeof res === 'number' && (!isFinite(res) || isNaN(res))) {
      store.showError('Erreur mathématique');
      return 'Erreur';
    }
    // Correction : détecter sqrt(-1) et autres cas NaN
    if (res === undefined || res === null || res === Infinity || res === -Infinity || isNaN(res)) {
      store.showError('Erreur mathématique');
      return 'Erreur';
    }
    return res.toString();
  } catch {
    store.showError('Erreur de calcul');
    return 'Erreur';
  }
}

watch(expression, (val) => {
  if (props.mode === 'advanced') {
    result.value = val ? safeEval(val) : '0';
    // Synchronisation store
    store.setAdvancedExpression(val);
    store.setAdvancedResult(result.value);
  }
});

// Synchronisation inter-vues
watch(() => store.advancedExpression, (val) => {
  if (props.mode === 'advanced' && val !== expression.value) {
    expression.value = val;
    result.value = safeEval(val);
  }
});

onMounted(() => {
  if (props.mode === 'advanced') {
    expression.value = store.advancedExpression;
    result.value = store.advancedResult;
  }
});

function handleButton(val) {
  if (props.mode === 'advanced') {
    if (val === 'C') expression.value = '';
    else if (val === 'DEL') expression.value = expression.value.slice(0, -1);
    else if (val === '=') {
      // Ajout à l'historique
      store.addToHistory(`${expression.value} = ${result.value}`);
      expression.value = result.value;
    }
    else expression.value += val;
  } else {
    // ... logique simple (déjà existante)
  }
}

function handleKeydown(e) {
  const key = e.key;
  if (props.mode === 'advanced') {
    // Saisie directe dans l'expression
    if ((/^[0-9+\-*/().]$/.test(key)) || key === '×' || key === '÷') {
      if (key === '×') expression.value += '*';
      else if (key === '÷') expression.value += '/';
      else expression.value += key;
      return;
    }
    if (key === 'Backspace') {
      expression.value = expression.value.slice(0, -1);
      return;
    }
    if (key === 'Enter' || key === '=') {
      store.addToHistory(`${expression.value} = ${result.value}`);
      expression.value = result.value;
      return;
    }
    if (key === 'Escape' || key === 'c' || key === 'C') {
      expression.value = '';
      return;
    }
    // Bloquer le reste
    return;
  }
  // Mode simple (logique existante)
  if (!isNaN(key)) {
    appendNumberSimple(key);
    return;
  }
  if (key === '.') {
    appendNumberSimple('.');
    return;
  }
  if (key === '+' || key === '-') {
    chooseOperationSimple(key);
    return;
  }
  if (key === '*' || key === 'x' || key === 'X') {
    chooseOperationSimple('×');
    return;
  }
  if (key === '/' || key === ':') {
    chooseOperationSimple('÷');
    return;
  }
  if (key === 'Enter' || key === '=') {
    computeSimple();
    return;
  }
  if (key === 'Backspace') {
    deleteLastSimple();
    return;
  }
  if (key === 'Escape' || key === 'c' || key === 'C') {
    clearSimple();
    return;
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});

const simpleCurrent = ref('0');
const simplePrevious = ref('');
const simpleOperation = ref(undefined);
const copied = ref(false);
async function copyResult() {
  let value = '';
  if (props.mode === 'advanced') value = result.value;
  else value = simpleCurrent.value;
  try {
    await navigator.clipboard.writeText(value);
    copied.value = true;
    setTimeout(() => copied.value = false, 1200);
  } catch {
    // playError(); // Removed as per instructions
  }
}

function appendNumberSimple(number) {
  if (number === '.' && simpleCurrent.value.includes('.')) return;
  if (simpleCurrent.value === '0' && number !== '.') {
    simpleCurrent.value = number.toString();
  } else {
    simpleCurrent.value = simpleCurrent.value.toString() + number.toString();
  }
}
function chooseOperationSimple(operation) {
  if (simpleCurrent.value === '0') return;
  if (simplePrevious.value !== '') {
    computeSimple();
  }
  simpleOperation.value = operation;
  simplePrevious.value = simpleCurrent.value;
  simpleCurrent.value = '0';
}
function computeSimple() {
  const prev = parseFloat(simplePrevious.value);
  const current = parseFloat(simpleCurrent.value);
  if (isNaN(prev) || isNaN(current)) return;
  let computation;
  switch (simpleOperation.value) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      if (current === 0) return;
      computation = prev / current;
      break;
    default:
      return;
  }
  simpleCurrent.value = computation.toString();
  store.addToHistory(`${simplePrevious.value} ${simpleOperation.value} ${simpleCurrent.value} = ${computation}`);
  simpleOperation.value = undefined;
  simplePrevious.value = '';
}
function clearSimple() {
  simpleCurrent.value = '0';
  simplePrevious.value = '';
  simpleOperation.value = undefined;
}
function deleteLastSimple() {
  if (simpleCurrent.value === '0') return;
  simpleCurrent.value = simpleCurrent.value.toString().slice(0, -1);
  if (simpleCurrent.value === '') simpleCurrent.value = '0';
}

// Synchronisation inter-vues simple
watch(() => store.history, (val) => {}, { deep: true });

// Feedback sonore
// Removed clickSound, errorSound, playClick, playError

function clearHistoryWithConfirm() {
  if (confirm('Vider tout l’historique ?')) {
    store.clearHistory();
    // playClick(); // Removed as per instructions
  }
}

const unitCategories = [
  {
    label: 'Longueur',
    units: [
      { label: 'mètre (m)', value: 'm', factor: 1 },
      { label: 'kilomètre (km)', value: 'km', factor: 1000 },
      { label: 'centimètre (cm)', value: 'cm', factor: 0.01 },
      { label: 'millimètre (mm)', value: 'mm', factor: 0.001 },
    ],
  },
  {
    label: 'Masse',
    units: [
      { label: 'kilogramme (kg)', value: 'kg', factor: 1 },
      { label: 'gramme (g)', value: 'g', factor: 0.001 },
      { label: 'milligramme (mg)', value: 'mg', factor: 0.000001 },
    ],
  },
  {
    label: 'Température',
    units: [
      { label: 'Celsius (°C)', value: 'C' },
      { label: 'Fahrenheit (°F)', value: 'F' },
    ],
  },
];
const selectedCategory = ref(unitCategories[0]);
const fromUnit = ref(selectedCategory.value.units[0]);
const toUnit = ref(selectedCategory.value.units[1]);
const unitInput = ref('');
const unitResult = ref('');

watch(selectedCategory, (cat) => {
  fromUnit.value = cat.units[0];
  toUnit.value = cat.units[1];
  unitInput.value = '';
  unitResult.value = '';
});

function convertUnit() {
  let input = parseFloat(unitInput.value);
  if (isNaN(input)) {
    unitResult.value = '';
    return;
  }
  if (selectedCategory.value.label === 'Température') {
    if (fromUnit.value.value === 'C' && toUnit.value.value === 'F') {
      unitResult.value = (input * 9/5 + 32).toFixed(2);
    } else if (fromUnit.value.value === 'F' && toUnit.value.value === 'C') {
      unitResult.value = ((input - 32) * 5/9).toFixed(2);
    } else {
      unitResult.value = input.toString();
    }
  } else {
    // Longueur ou masse
    const base = input * fromUnit.value.factor;
    unitResult.value = (base / toUnit.value.factor).toFixed(6).replace(/\.0+$/, '');
  }
}
watch([unitInput, fromUnit, toUnit], convertUnit);

const themes = [
  {
    name: 'Shadow Monarch',
    key: 'shadow',
    colors: {
      '--bg': '#181828',
      '--primary': '#00c6ff',
      '--secondary': '#7f5fff',
      '--accent': '#ffd700',
      '--text': '#f5f5f5',
    },
  },
  {
    name: 'Portail S-Rank',
    key: 'portal',
    colors: {
      '--bg': '#1a1a2e',
      '--primary': '#4f8cff',
      '--secondary': '#ff00cc',
      '--accent': '#fff200',
      '--text': '#e0e6ed',
    },
  },
  {
    name: 'Hunter Association',
    key: 'hunter',
    colors: {
      '--bg': '#232946',
      '--primary': '#eebf00',
      '--secondary': '#b8c1ec',
      '--accent': '#ff6f3c',
      '--text': '#fffffe',
    },
  },
];
const selectedTheme = ref(localStorage.getItem('sl-theme') || 'shadow');
function applyTheme(key) {
  const theme = themes.find(t => t.key === key);
  if (!theme) return;
  Object.entries(theme.colors).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v);
  });
  selectedTheme.value = key;
  localStorage.setItem('sl-theme', key);
}
onMounted(() => {
  applyTheme(selectedTheme.value);
});
watch(selectedTheme, applyTheme);

const errorMsg = ref('');
function showError(msg) {
  errorMsg.value = msg;
  // playError(); // Removed as per instructions
  setTimeout(() => errorMsg.value = '', 2500);
}

const mainContentRef = ref(null);
function handleSkipLink(e) {
  e.preventDefault();
  nextTick(() => {
    if (mainContentRef.value) mainContentRef.value.focus();
  });
}
</script>

<style scoped>
:root {
  --bg: #181828;
  --primary: #00c6ff;
  --secondary: #7f5fff;
  --accent: #ffd700;
  --text: #f5f5f5;
}
.calculator-app {
  background: var(--bg);
  color: var(--text);
  transition: background 0.5s, color 0.5s;
}
.calculator-app.light {
  --bg: #fff;
  color: #222;
  --focus: #4f8cff;
}
.calculator-app.dark {
  --bg: #181818;
  color: #f5f5f5;
  --focus: #ffd700;
}
.calculator-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
button {
  padding: 1rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.5rem;
  background: #eee;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  will-change: transform;
}
button:active {
  background: #ccc;
  transform: scale(0.93) rotate(-2deg);
  box-shadow: 0 1px 2px rgba(0,0,0,0.08);
}
button:focus {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
  z-index: 2;
}
button.equals {
  background: #4f8cff;
  color: #fff;
}
button.span-two {
  grid-column: span 2;
}
.display {
  background: rgba(0,0,0,0.08);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  min-height: 60px;
  text-align: right;
  font-size: 2rem;
  word-break: break-all;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  animation: fadeInDisplay 0.5s;
  color: inherit;
}
@keyframes fadeInDisplay {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: none; }
}
.previous-operand {
  font-size: 1rem;
  color: #888;
}
.current-operand {
  font-size: 2rem;
  font-weight: bold;
}
.buttons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.history {
  margin-top: 1.5rem;
  background: rgba(0,0,0,0.03);
  border-radius: 0.5rem;
  padding: 1rem;
  max-height: 120px;
  overflow-y: auto;
  animation: fadeInHistory 0.7s;
}
@keyframes fadeInHistory {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
}
.history h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}
.history ul li {
  animation: fadeInItem 0.5s;
}
@keyframes fadeInItem {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: none; }
}
.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.3em;
}
.clear-history-btn {
  display: flex;
  align-items: center;
  gap: 0.3em;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: #fff;
  border: none;
  border-radius: 0.5em;
  padding: 0.3em 0.8em;
  font-size: 1em;
  font-weight: bold;
  box-shadow: 0 0 8px #00c6ff, 0 0 16px #0072ff;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.1s, background 0.2s;
  text-shadow: 0 0 6px #00c6ff;
  outline: none;
}
.clear-history-btn:active {
  transform: scale(0.97);
  box-shadow: 0 0 16px #00c6ff, 0 0 32px #0072ff;
}
.clear-history-btn:focus {
  outline: 2px solid #00c6ff;
}
.trash-icon {
  font-size: 1.2em;
  filter: drop-shadow(0 0 4px #00c6ff);
}
.clear-text {
  letter-spacing: 0.04em;
  font-family: 'Orbitron', 'Montserrat', 'Arial', sans-serif;
  text-transform: uppercase;
}
.theme-select-group {
  display: flex;
  align-items: center;
  gap: 0.7em;
}
.theme-select {
  background: var(--secondary);
  color: var(--text);
  border: none;
  border-radius: 0.5em;
  font-size: 1em;
  font-weight: bold;
  padding: 0.3em 0.8em;
  box-shadow: 0 0 8px var(--primary);
  outline: none;
  transition: background 0.3s, color 0.3s;
}
.theme-select:focus {
  outline: 2px solid var(--primary);
}
@media (max-width: 600px) {
  .calculator-app {
    max-width: 100vw;
    padding: 0.5rem 0.2rem;
    border-radius: 0;
    box-shadow: none;
  }
  .calculator-header {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .display, .display.advanced {
    font-size: 1.1rem;
    min-height: 36px;
    padding: 0.5rem;
  }
  .expression-input {
    font-size: 1.1rem;
    padding: 0.5rem 0.7rem;
  }
  .buttons-grid {
    gap: 0.3rem;
  }
  button {
    padding: 0.7rem 0.2rem;
    font-size: 1.1rem;
    min-width: 44px;
    min-height: 44px;
    touch-action: manipulation;
  }
  .history {
    padding: 0.5rem;
    font-size: 0.95rem;
    max-height: 80px;
  }
  .main-nav {
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0 0.5rem 0;
  }
}
.expression-input {
  width: 100%;
  font-size: 1.5rem;
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #bbb;
  margin-bottom: 0.7rem;
  background: #f8f8f8;
  color: #222;
}
.display.advanced {
  font-size: 2.2rem;
  background: #eaf2ff;
  color: #1a237e;
  margin-bottom: 1rem;
}
.fade-history-enter-active, .fade-history-leave-active {
  transition: all 0.5s;
}
.fade-history-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-history-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.pwa-loader {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: #4f8cff;
  color: #fff;
  text-align: center;
  padding: 0.7rem;
  z-index: 1000;
  font-size: 1.1rem;
}
.loader {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  border: 3px solid #fff;
  border-radius: 50%;
  border-top: 3px solid #4f8cff;
  animation: spin 1s linear infinite;
  margin-right: 0.7em;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.copy-btn {
  background: none;
  border: none;
  font-size: 1.2em;
  margin-left: 0.3em;
  cursor: pointer;
  color: #4f8cff;
  transition: color 0.2s, transform 0.1s;
  vertical-align: middle;
}
.copy-btn:active {
  color: #1a237e;
  transform: scale(1.2);
}
.copy-btn:focus {
  outline: 2px solid #4f8cff;
}
.unit-converter {
  margin: 1.5rem 0 1rem 0;
  padding: 1rem;
  background: rgba(0,198,255,0.07);
  border-radius: 1em;
  box-shadow: 0 0 8px #00c6ff33;
}
.unit-converter h4 {
  margin: 0 0 0.7em 0;
  color: #0072ff;
  font-family: 'Orbitron', 'Montserrat', 'Arial', sans-serif;
  letter-spacing: 0.04em;
}
.unit-row {
  display: flex;
  align-items: center;
  gap: 0.7em;
  margin-bottom: 0.7em;
}
.unit-row select, .unit-row input {
  font-size: 1em;
  padding: 0.4em 0.7em;
  border-radius: 0.4em;
  border: 1px solid #00c6ff;
  background: #f8fcff;
  color: #222;
  min-width: 90px;
}
.unit-row input[readonly] {
  background: #eaf2ff;
  color: #0072ff;
  font-weight: bold;
}
.arrow {
  font-size: 1.3em;
  color: #00c6ff;
  font-weight: bold;
}
.unit-eq {
  font-size: 1.2em;
  color: #0072ff;
  margin: 0 0.3em;
}
.sci-funcs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-bottom: 0.7em;
}
.sci-btn {
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: #fff;
  border: none;
  border-radius: 0.5em;
  padding: 0.3em 0.8em;
  font-size: 1em;
  font-weight: bold;
  box-shadow: 0 0 8px #00c6ff, 0 0 16px #0072ff;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.1s, background 0.2s;
  text-shadow: 0 0 6px #00c6ff;
  outline: none;
}
.sci-btn:active {
  transform: scale(0.97);
  box-shadow: 0 0 16px #00c6ff, 0 0 32px #0072ff;
}
.sci-btn:focus {
  outline: 2px solid #00c6ff;
}
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: 10000;
  background: var(--primary);
  color: var(--text);
  padding: 0.5em 1em;
  border-radius: 0.5em;
  font-weight: bold;
  transition: left 0.2s;
}
.skip-link:focus {
  left: 1em;
  top: 1em;
  width: auto;
  height: auto;
  outline: 2px solid var(--accent);
}
.error-msg {
  background: #ff0033;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  margin: 0.5em 0 1em 0;
  font-weight: bold;
  box-shadow: 0 0 8px #ff0033aa;
  text-align: center;
  font-size: 1.1em;
  outline: none;
}
button:focus, .theme-select:focus, .copy-btn:focus, .clear-history-btn:focus, .sci-btn:focus {
  outline: 3px solid var(--accent) !important;
  outline-offset: 2px;
  z-index: 2;
}
</style> 