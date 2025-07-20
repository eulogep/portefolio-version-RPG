// Classe Calculator pour le composant portfolio
class CalculatorComponent {
    constructor(container) {
        this.container = container;
        this.calculator = null;
        this.initialize();
    }

    initialize() {
        // Créer le composant calculatrice
        this.container.innerHTML = this.getCalculatorHTML();
        
        // Initialiser la calculatrice
        const display = this.container.querySelector('.display');
        const previousOperand = display.querySelector('.previous-operand');
        const currentOperand = display.querySelector('.current-operand');
        
        this.calculator = new Calculator(previousOperand, currentOperand);
        
        // Ajouter les écouteurs d'événements
        this.setupEventListeners();
    }

    getCalculatorHTML() {
        return `
            <div class="calculator-header">
                <h3>Calculatrice Scientifique</h3>
                <div class="calculator-controls">
                    <button class="theme-toggle" id="theme-toggle">
                        <i class="fas fa-moon"></i>
                    </button>
                    <button class="info">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>
            
            <div class="calculator-wrapper">
                <div class="calculator">
                    <div class="display">
                        <div class="previous-operand">0</div>
                        <div class="current-operand">0</div>
                    </div>
                    
                    <div class="buttons-grid">
                        <button class="function">sin</button>
                        <button class="function">cos</button>
                        <button class="function">tan</button>
                        <button class="function">√</button>
                        
                        <button class="span-two clear">C</button>
                        <button class="delete">DEL</button>
                        <button class="operator">÷</button>
                        
                        <button class="number">7</button>
                        <button class="number">8</button>
                        <button class="number">9</button>
                        <button class="operator">×</button>
                        
                        <button class="number">4</button>
                        <button class="number">5</button>
                        <button class="number">6</button>
                        <button class="operator">-</button>
                        
                        <button class="number">1</button>
                        <button class="number">2</button>
                        <button class="number">3</button>
                        <button class="operator">+</button>
                        
                        <button class="number span-two">0</button>
                        <button class="number">.</button>
                        <button class="equals">=</button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Toggle thème
        const themeToggle = this.container.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            this.container.closest('[data-theme]')?.classList.toggle('dark-theme');
        });

        // Info
        const infoButton = this.container.querySelector('.info');
        infoButton.addEventListener('click', () => {
            alert('Calculatrice Scientifique\n\nFonctionnalités:\n- Calculs de base\n- Fonctions trigonométriques\n- Racine carrée\n- Thème clair/sombre');
        });

        // Boutons de la calculatrice
        const buttons = this.container.querySelectorAll('.buttons-grid button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.calculator.handleClick(button);
            });
        });
    }
}

// Exporter la classe
window.CalculatorComponent = CalculatorComponent;
