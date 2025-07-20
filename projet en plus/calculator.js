// Configuration des constantes
const THEMES = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme'
};;

const UNITS = {
    LENGTH: {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001
    },
    MASS: {
        kg: 1,
        g: 1000,
        mg: 1000000
    },
    TEMPERATURE: {
        '°C': 1,
        '°F': 1
    }
};;

// Configuration des options de graphique
const GRAPH_OPTIONS = {
    WIDTH: 600,
    HEIGHT: 400,
    MARGIN: 50,
    AXIS_COLOR: '#666'
};;

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.state = {
            current: '0',
            previous: '',
            operation: undefined,
            history: [],
            favorites: [],
            theme: localStorage.getItem('theme') || THEMES.LIGHT
        };
        
        this.elements = {
            history: this.currentOperandElement.parentElement.parentElement.querySelector('.history-list'),
            unitConverter: this.currentOperandElement.parentElement.parentElement.querySelector('.unit-converter'),
            graphContainer: this.currentOperandElement.parentElement.parentElement.querySelector('.graph-container'),
            canvas: this.graphContainer.querySelector('canvas')
        };

        this.ctx = this.elements.canvas.getContext('2d');
        this.initializeCanvas();
        this.loadState();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.addKeyboardEventListener();
        this.addButtonsEventListeners();
        this.setupThemeToggle();
        this.setupFullscreenToggle();
        this.setupInfoButton();
        this.setupShareButton();
        this.setupCloudSaveButton();
    }

    addKeyboardEventListener() {
        document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
    }

    addButtonsEventListeners() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.handleClick(button));
        });
    }

    setupThemeToggle() {
        const themeToggle = document.querySelector('#theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setupFullscreenToggle() {
        const fullscreenButton = document.querySelector('.fullscreen');
        if (fullscreenButton) {
            fullscreenButton.addEventListener('click', () => this.toggleFullscreen());
        }
    }

    setupInfoButton() {
        const infoButton = document.querySelector('.info');
        if (infoButton) {
            infoButton.addEventListener('click', () => this.showInfo());
        }
    }

    setupShareButton() {
        const shareButton = document.querySelector('.share');
        if (shareButton) {
            shareButton.addEventListener('click', () => this.shareResult());
        }
    }

    setupCloudSaveButton() {
        const cloudSaveButton = document.querySelector('.save-cloud');
        if (cloudSaveButton) {
            cloudSaveButton.addEventListener('click', () => this.saveToCloud());
        }
    }

    handleKeyboardInput(e) {
        const key = e.key;
        const operations = {
            '+': '+',
            '-': '-',
            '*': '×',
            '/': '÷'
        };

        switch (key) {
            case 'Escape':
            case 'Delete':
                this.clear();
                break;
            case 'Backspace':
                this.delete();
                break;
            case 'Enter':
            case '=':
                this.compute();
                break;
            case '.':
                this.appendNumber('.');
                break;
            case 'F1':
                this.showInfo();
                break;
            case 'F2':
                this.toggleFullscreen();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                this.chooseOperation(operations[key]);
                break;
            default:
                if (!isNaN(key)) {
                    this.appendNumber(key);
                }
        }
    }

    handleClick(button) {
        const handlers = {
            number: this.appendNumber,
            operator: this.chooseOperation,
            equals: () => this.compute(),
            clear: () => this.clear(),
            delete: () => this.delete(),
            scientific: (op) => this.scientificOperation(op),
            converter: (type) => this.convertUnit(type),
            share: () => this.shareResult(),
            info: () => this.showInfo(),
            fullscreen: () => this.toggleFullscreen(),
            'save-cloud': () => this.saveToCloud()
        };

        const type = Array.from(button.classList).find(cls => 
            ['number', 'operator', 'equals', 'clear', 'delete', 'scientific', 'converter', 'share', 'info', 'fullscreen', 'save-cloud'].includes(cls)
        );

        if (type) {
            const operation = button.dataset.operation || button.textContent;
            handlers[type](operation);
        }
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains(THEMES.DARK) ? THEMES.LIGHT : THEMES.DARK;
        document.body.classList.toggle(THEMES.DARK);
        localStorage.setItem('theme', currentTheme);
        this.state.theme = currentTheme;
    }

    toggleFullscreen() {
        const calculator = document.querySelector('.calculator');
        if (!document.fullscreenElement) {
            calculator.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    showInfo() {
        const info = {
            title: 'Calculatrice Professionnelle',
            version: '1.0',
            features: [
                'Calculs scientifiques',
                'Graphiques',
                'Conversion d\'unités',
                'Sauvegarde dans le cloud',
                'Historique',
                'Thème clair/sombre'
            ]
        };

        const infoText = `
            ${info.title} v${info.version}\n\n
            Fonctionnalités:\n${info.features.map(f => `- ${f}`).join('\n')}
        `;
        alert(infoText);
    }

    async shareResult() {
        try {
            const result = this.state.current;
            const text = `
                ${result}\n\n
                Calcul effectué avec Calculatrice Professionnelle
            `;
            await navigator.share({
                title: 'Résultat de calcul',
                text: text.trim()
            });
        } catch (error) {
            console.error('Erreur de partage:', error);
            this.showNotification('Partage non supporté sur votre appareil', 'warning');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    clear() {
        this.state.current = '0';
        this.state.previous = '';
        this.state.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.state.current === '0') return;
        this.state.current = this.state.current.toString().slice(0, -1);
        if (this.state.current === '') this.state.current = '0';
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.state.current.includes('.')) return;
        if (this.state.current === '0' && number !== '.') {
            this.state.current = number.toString();
        } else {
            this.state.current = this.state.current.toString() + number.toString();
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.state.current === '0') return;
        if (this.state.previous !== '') {
            this.compute();
        }
        this.state.operation = operation;
        this.state.previous = this.state.current;
        this.state.current = '0';
        this.updateDisplay();
    }

    compute() {
        const prev = parseFloat(this.state.previous);
        const current = parseFloat(this.state.current);

        if (isNaN(prev) || isNaN(current)) {
            this.showNotification('Veuillez entrer des nombres valides', 'error');
            return;
        }

        let computation;
        switch (this.state.operation) {
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
                if (current === 0) {
                    this.showNotification('Division par zéro impossible !', 'error');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.state.current = computation;
        this.state.operation = undefined;
        this.state.previous = '';
        this.saveToLocalStorage();
        this.addToHistory(`${this.state.previous} ${this.state.operation} ${this.state.current} = ${computation}`);
        this.updateDisplay();
    }

    formatNumber(number) {
        const stringNumber = number.toString();
        const [integer, decimal] = stringNumber.split('.');

        const integerDisplay = integer.toLocaleString('fr-FR', {
            maximumFractionDigits: 0
        });

        return decimal ? `${integerDisplay}.${decimal}` : integerDisplay;
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.formatNumber(this.state.current);
        this.previousOperandElement.textContent = this.state.previous ? 
            `${this.formatNumber(this.state.previous)} ${this.state.operation}` : '';
    }

    initializeCanvas() {
        this.elements.canvas.width = GRAPH_OPTIONS.WIDTH;
        this.elements.canvas.height = GRAPH_OPTIONS.HEIGHT;
        this.graphContainer.style.display = 'none';
    }

    loadState() {
        this.state.history = JSON.parse(localStorage.getItem('calculator-history') || '[]');
        this.state.favorites = JSON.parse(localStorage.getItem('calculator-favorites') || '[]');
        this.updateHistoryDisplay();
    }

    saveToLocalStorage() {
        localStorage.setItem('calculator-history', JSON.stringify(this.state.history));
        localStorage.setItem('calculator-favorites', JSON.stringify(this.state.favorites));
    }

    addToHistory(expression) {
        this.state.history.unshift(expression);
        if (this.state.history.length > 10) {
            this.state.history.pop();
        }
        this.updateHistoryDisplay();
        this.saveToLocalStorage();
    }

    updateHistoryDisplay() {
        this.elements.history.innerHTML = this.state.history.map(expression => 
            `<li>${expression}</li>`
        ).join('');
    }

    async saveToCloud() {
        try {
            const response = await fetch('https://api.calculator.com/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    history: this.state.history,
                    favorites: this.state.favorites
                })
            });

            if (!response.ok) {
                throw new Error('Erreur de sauvegarde');
            }

            this.showNotification('Sauvegarde dans le cloud réussie', 'success');
        } catch (error) {
            console.error('Erreur de sauvegarde:', error);
            this.showNotification('Erreur lors de la sauvegarde', 'error');
        }
    }

    scientificOperation(operation) {
        const number = parseFloat(this.state.current);
        let result;

        switch (operation) {
            case 'sin':
                result = Math.sin(number);
                break;
            case 'cos':
                result = Math.cos(number);
                break;
            case 'tan':
                result = Math.tan(number);
                break;
            case 'sqrt':
                result = Math.sqrt(number);
                break;
            case 'pow2':
                result = Math.pow(number, 2);
                break;
            case 'pow3':
                result = Math.pow(number, 3);
                break;
            case 'log':
                result = Math.log10(number);
                break;
            case 'ln':
                result = Math.log(number);
                break;
            case 'exp':
                result = Math.exp(number);
                break;
            default:
                return;
        }

        this.state.current = result;
        this.addToHistory(`${operation}(${number}) = ${result}`);
        this.updateDisplay();
    }

    convertUnit(type) {
        const value = parseFloat(this.state.current);
        const from = this.elements.unitConverter.querySelector('.from').value;
        const to = this.elements.unitConverter.querySelector('.to').value;

        if (isNaN(value) || !from || !to) return;

        const factor = UNITS[type][from] / UNITS[type][to];
        const result = value * factor;

        this.state.current = result;
        this.addToHistory(`${value}${from} = ${result}${to}`);
        this.updateDisplay();
    }

    plotFunction(func, range = [-10, 10]) {
        this.graphContainer.style.display = 'block';
        this.ctx.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);

        const [min, max] = range;
        const width = this.elements.canvas.width;
        const height = this.elements.canvas.height;
        const margin = GRAPH_OPTIONS.MARGIN;

        // Dessiner les axes
        this.ctx.beginPath();
        this.ctx.strokeStyle = GRAPH_OPTIONS.AXIS_COLOR;
        this.ctx.moveTo(margin, height / 2);
        this.ctx.lineTo(width - margin, height / 2);
        this.ctx.moveTo(width / 2, margin);
        this.ctx.lineTo(width / 2, height - margin);
        this.ctx.stroke();

        // Dessiner la fonction
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#007bff';
        
        for (let x = min; x <= max; x += 0.1) {
            const y = this.evaluateFunction(func, x);
            const px = (x - min) / (max - min) * (width - 2 * margin) + margin;
            const py = height - (y + 10) / 20 * (height - 2 * margin) - margin;
            
            if (x === min) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }

        this.ctx.stroke();
    }

    evaluateFunction(func, x) {
        try {
            return eval(func.replace(/x/g, x));
        } catch (error) {
            console.error('Erreur d\'évaluation:', error);
            return 0;
        }
    }

    handleError(error) {
        console.error('Erreur:', error);
        this.showNotification('Une erreur est survenue', 'error');
    }
}

// Initialisation des calculatrices
const initializeCalculators = () => {
    const calculators = document.querySelectorAll('.calculator');
    return Array.from(calculators).map(calculator => {
        const previousOperand = calculator.querySelector('.previous-operand');
        const currentOperand = calculator.querySelector('.current-operand');
        return new Calculator(previousOperand, currentOperand);
    });
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const calculatorInstances = initializeCalculators();
    
    // Gérer les erreurs
    document.addEventListener('error', (e) => {
        console.error('Erreur:', e);
    });
});
