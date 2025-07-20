// Configuration des constantes
const THEMES = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme'
};

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
};

// Configuration des options de graphique
const GRAPH_OPTIONS = {
    WIDTH: 600,
    HEIGHT: 400,
    MARGIN: 50,
    AXIS_COLOR: '#666'
};

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

    // Partage des résultats
    async shareResult() {
        try {
            const text = `${this.currentOperand}\n\nCalcul effectué avec Calculatrice Professionnelle`;
            await navigator.share({
                title: 'Résultat de calcul',
                text: text
            });
        } catch (error) {
            console.error('Erreur de partage:', error);
            this.showNotification('Partage non supporté sur votre appareil', 'warning');
        }
    }

    // Gestion des notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
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
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
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
                    this.handleError(new Error('Division par zéro'));
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.addToHistory(`${prev} ${this.operation} ${current} = ${this.currentOperand}`);
        this.updateDisplay();
    }

    // Opérations scientifiques
    scientificOperation(operation) {
        const num = parseFloat(this.currentOperand);
        if (isNaN(num)) return;
        
        switch (operation) {
            case 'pi':
                this.currentOperand = Math.PI;
                break;
            case 'e':
                this.currentOperand = Math.E;
                break;
            case 'sin':
                this.currentOperand = Math.sin(num);
                break;
            case 'cos':
                this.currentOperand = Math.cos(num);
                break;
            case 'tan':
                this.currentOperand = Math.tan(num);
                break;
            case 'sqrt':
                if (num < 0) {
                    this.handleError(new Error('Impossible de calculer la racine carrée d\'un nombre négatif'));
                    return;
                }
                this.currentOperand = Math.sqrt(num);
                break;
            case 'square':
                this.currentOperand = Math.pow(num, 2);
                break;
            case 'cube':
                this.currentOperand = Math.pow(num, 3);
                break;
            case 'y-power':
                const y = parseFloat(prompt('Entrez la puissance:'));
                if (!isNaN(y)) {
                    this.currentOperand = Math.pow(num, y);
                }
                break;
            case 'inverse':
                if (num === 0) {
                    this.handleError(new Error('Impossible de calculer l\'inverse de 0'));
                    return;
                }
                this.currentOperand = 1 / num;
                break;
            case 'log':
                if (num <= 0) {
                    this.handleError(new Error('Le logarithme ne peut être calculé pour un nombre <= 0'));
                    return;
                }
                this.currentOperand = Math.log10(num);
                break;
            case 'ln':
                if (num <= 0) {
                    this.handleError(new Error('Le logarithme népérien ne peut être calculé pour un nombre <= 0'));
                    return;
                }
                this.currentOperand = Math.log(num);
                break;
            case 'exp':
                this.currentOperand = Math.exp(num);
                break;
            default:
                return;
        }

        this.addToHistory(`${operation}(${this.previousOperand || num}) = ${this.currentOperand}`);
        this.updateDisplay();
        this.saveToLocalStorage();
    }

    // Conversion d'unités
    convertUnit(type) {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;

        let result;
        switch (type) {
            case 'length':
                result = value * this.unitConversions.length.m;
                break;
            case 'mass':
                result = value * this.unitConversions.mass.kg;
                break;
            case 'temperature':
                result = value;
                break;
            default:
                return;
        }

        this.currentOperand = result.toString();
        this.addToHistory(`Conversion: ${value} -> ${result}`);
        this.updateDisplay();
        this.saveToLocalStorage();
    }

    // Tracé de graphique
    plotFunction(func, range = [-10, 10]) {
        try {
            const [min, max] = range;
            const width = this.canvas.width;
            const height = this.canvas.height;
            const scale = width / (max - min);
            const padding = 40;

            this.ctx.clearRect(0, 0, width, height);
            this.ctx.beginPath();

            // Configuration des axes
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 1;
            
            // Axe X
            this.ctx.moveTo(padding, height - padding);
            this.ctx.lineTo(width - padding, height - padding);
            
            // Axe Y
            this.ctx.moveTo(padding, padding);
            this.ctx.lineTo(padding, height - padding);
            
            this.ctx.stroke();

            // Configuration de la fonction
            this.ctx.strokeStyle = '#2ecc71';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();

            // Calcul des points
            let x = min;
            let y = this.evaluateFunction(func, x);
            this.ctx.moveTo(
                padding + (x - min) * scale,
                height - padding - y * scale
            );

            for (x = min; x <= max; x += 0.1) {
                y = this.evaluateFunction(func, x);
                this.ctx.lineTo(
                    padding + (x - min) * scale,
                    height - padding - y * scale
                );
            }

            this.ctx.stroke();

            // Sauvegarde dans l'historique
            this.addToHistory(`Graphique de ${func} sur [${min}, ${max}]`);
        } catch (error) {
            this.handleError(new Error('Erreur lors du tracé du graphique'));
        }
    }

    // Évaluation de fonction
    evaluateFunction(func, x) {
        try {
            return eval(func.replace(/x/g, x));
        } catch (error) {
            throw new Error('Fonction invalide');
        }
    }

    // Sauvegarde dans le cloud
    async saveToCloud() {
        try {
            const response = await fetch('https://api.calculator-cloud.com/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    history: this.history,
                    favorites: this.favorites,
                    settings: {
                        theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',
                        layout: this.getLayoutPreferences(),
                        preferences: this.getCalculatorPreferences()
                    }
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                this.showNotification('Sauvegarde réussie', 'success');
                return data;
            }
            
            throw new Error('Erreur serveur');
        } catch (error) {
            console.error('Erreur de sauvegarde:', error);
            this.showNotification('Erreur lors de la sauvegarde', 'error');
            throw error;
        }
    }

    // Gestion des préférences
    getLayoutPreferences() {
        return {
            buttonSize: 'medium',
            displayFormat: 'scientific',
            historyVisible: this.historyElement.style.display !== 'none'
        };
    }

    getCalculatorPreferences() {
        return {
            precision: 10,
            scientificMode: true,
            unitSystem: 'metric'
        };
    }

    // Gestion des erreurs
    handleError(error) {
        this.showNotification(error.message, 'error');
        console.error(error);
        this.currentOperand = 'Error';
        this.updateDisplay();
    }

    // Mise à jour de l'affichage
    updateDisplay() {
        this.currentOperandElement.textContent = this.formatNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.textContent = 
                `${this.formatNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    // Formatage des nombres
    formatNumber(number) {
        const num = parseFloat(number);
        if (isNaN(num)) return '';
        return num.toLocaleString(undefined, {
            maximumFractionDigits: 10,
            minimumFractionDigits: 0
        });
    }

    // Sauvegarde locale
    saveToLocalStorage() {
        localStorage.setItem('calculator-history', JSON.stringify(this.history));
        localStorage.setItem('calculator-favorites', JSON.stringify(this.favorites));
    }

    // Chargement de l'historique
    loadHistory() {
        const savedHistory = JSON.parse(localStorage.getItem('calculator-history') || '[]');
        this.history = savedHistory;
        this.updateHistoryDisplay();
    }

    // Mise à jour de l'affichage de l'historique
    updateHistoryDisplay() {
        const historyList = this.historyElement.querySelector('ul');
        historyList.innerHTML = '';
        this.history.slice(-10).forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
    }

    // Ajout à l'historique
    addToHistory(expression) {
        this.history.push(expression);
        this.updateHistoryDisplay();
        this.saveToLocalStorage();
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
};

// Initialisation
const calculatorInstances = initializeCalculators();

// Gérer les erreurs
document.addEventListener('error', (e) => {
    console.error('Erreur:', e);
});
}

    setupEventListeners() {
        // Gestion des touches du clavier
        document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));

        // Gestion des boutons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.handleClick(button));
        });

        // Gestion du thème
        const themeToggle = document.querySelector('#theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    handleKeyboardInput(e) {
        const key = e.key;
        
        if (key === 'Escape') {
            this.clear();
        } else if (key === 'Backspace') {
            this.delete();
        } else if (key === 'Enter' || key === '=') {
            this.compute();
        } else if (key === 'F1') {
            this.showInfo();
        } else if (key === 'F2') {
            this.toggleFullscreen();
        } else if (key === 'Delete') {
            this.clear();
        } else if (key === '.') {
            this.appendNumber('.');
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            this.chooseOperation(key);
        } else if (!isNaN(key)) {
            this.appendNumber(key);
        }
    }

    handleClick(button) {
        const value = button.textContent;
        const operation = button.dataset.operation;
        
        if (button.classList.contains('number')) {
            this.appendNumber(value);
        } else if (button.classList.contains('operator')) {
            this.chooseOperation(value);
        } else if (button.classList.contains('equals')) {
            this.compute();
        } else if (button.classList.contains('clear')) {
            this.clear();
        } else if (button.classList.contains('delete')) {
            this.delete();
        } else if (button.classList.contains('scientific')) {
            this.scientificOperation(operation);
        } else if (button.classList.contains('converter')) {
            this.convertUnit(operation);
        } else if (button.classList.contains('share')) {
            this.shareResult();
        } else if (button.classList.contains('info')) {
            this.showInfo();
        } else if (button.classList.contains('fullscreen')) {
            this.toggleFullscreen();
        } else if (button.classList.contains('save-cloud')) {
            this.saveToCloud();
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
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
        alert(`Calculatrice Professionnelle v1.0
\nFonctionnalités:
- Calculs scientifiques
- Graphiques
- Conversion d'unités
- Sauvegarde dans le cloud
- Historique
- Thème clair/sombre`);
    }

    // Nouvelles opérations scientifiques
    scientificOperation(operation) {
        const num = parseFloat(this.currentOperand);
        if (isNaN(num)) return;

        switch (operation) {
            case 'log':
                if (num <= 0) {
                    alert('Le logarithme ne peut être calculé pour un nombre <= 0');
                    return;
                }
                this.currentOperand = Math.log10(num);
                break;
            case 'ln':
                if (num <= 0) {
                    alert('Le logarithme népérien ne peut être calculé pour un nombre <= 0');
                    return;
                }
                this.currentOperand = Math.log(num);
                break;
            case 'exp':
                this.currentOperand = Math.exp(num);
                break;
            // ... (autres opérations déjà existantes)
        }

        this.addToHistory(`${operation}(${this.previousOperand || num}) = ${this.currentOperand}`);
        this.updateDisplay();
        this.saveToLocalStorage();
    }

    // Conversion d'unités
    convertUnits(fromUnit, toUnit) {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;

        const conversions = {
            'm': 1,
            'km': 1000,
            'cm': 0.01,
            'mm': 0.001,
            'kg': 1,
            'g': 1000,
            'mg': 1000000,
            '°C': 1,
            '°F': 1
        };

        const fromFactor = conversions[fromUnit];
        const toFactor = conversions[toUnit];

        if (fromUnit === '°C' && toUnit === '°F') {
            this.currentOperand = (value * 9/5) + 32;
        } else if (fromUnit === '°F' && toUnit === '°C') {
            this.currentOperand = (value - 32) * 5/9;
        } else {
            this.currentOperand = value * (fromFactor / toFactor);
        }

        this.addToHistory(`${value} ${fromUnit} = ${this.currentOperand} ${toUnit}`);
        this.updateDisplay();
        this.saveToLocalStorage();
    }

    // Tracé de graphique amélioré
    plotFunction(func, range = [-10, 10]) {
        try {
            const [min, max] = range;
            const width = this.canvas.width;
            const height = this.canvas.height;
            const scale = width / (max - min);
            const padding = 40; // Espace pour les axes

            this.ctx.clearRect(0, 0, width, height);
            this.ctx.beginPath();

            // Configuration des axes
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 1;
            
            // Axe X
            this.ctx.moveTo(padding, height - padding);
            this.ctx.lineTo(width - padding, height - padding);
            
            // Axe Y
            this.ctx.moveTo(padding, padding);
            this.ctx.lineTo(padding, height - padding);
            
            this.ctx.stroke();

            // Configuration de la fonction
            this.ctx.strokeStyle = '#2ecc71';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();

            // Calcul des points
            let x = min;
            let y = this.evaluateFunction(func, x);
            this.ctx.moveTo(
                padding + (x - min) * scale,
                height - padding - y * scale
            );

            for (x = min; x <= max; x += 0.1) {
                y = this.evaluateFunction(func, x);
                this.ctx.lineTo(
                    padding + (x - min) * scale,
                    height - padding - y * scale
                );
            }

            this.ctx.stroke();

            // Sauvegarde dans l'historique
            this.addToHistory(`Graphique de ${func} sur [${min}, ${max}]`);
        } catch (error) {
            this.handleError(new Error('Erreur lors du tracé du graphique'));
        }
    }

        // Axes
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.moveTo(0, height / 2);
        this.ctx.lineTo(width, height / 2);
        this.ctx.moveTo(width / 2, 0);
        this.ctx.lineTo(width / 2, height);
        this.ctx.stroke();

        // Fonction
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        let x = min;
        let y = this.evaluateFunction(func, x);
        this.ctx.moveTo((x - min) * scale, height / 2 - y * scale);

        for (x = min; x <= max; x += 0.1) {
            y = this.evaluateFunction(func, x);
            this.ctx.lineTo((x - min) * scale, height / 2 - y * scale);
        }

        this.ctx.stroke();
    }

    evaluateFunction(func, x) {
        return eval(func.replace('x', x));
    }

    // Partage
    shareResult() {
        const result = this.currentOperand;
        if (navigator.share) {
            navigator.share({
                title: 'Résultat de la calculatrice',
                text: `Résultat: ${result}`
            });
        } else {
            alert('La fonction de partage n\'est pas supportée sur votre navigateur');
        }
    }

    // Information
    showInfo() {
        alert('Double Calculatrice - Version 2.0\n\nFonctionnalités:\n- Calculs de base\n- Opérations scientifiques\n- Conversion d\'unités\n- Tracé de graphiques\n- Historique\n- Partage\n- Sauvegarde automatique\n- Thèmes');
    }

    // Mode plein écran
    toggleFullscreen() {
        const calculator = this.currentOperandElement.parentElement.parentElement;
        if (!document.fullscreenElement) {
            calculator.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // Sauvegarde dans le cloud
    async saveToCloud() {
        try {
            const response = await fetch('https://api.calculator-cloud.com/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    history: this.history,
                    favorites: this.favorites,
                    settings: {
                        theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',
                        layout: this.getLayoutPreferences(),
                        preferences: this.getCalculatorPreferences()
                    }
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                this.showNotification('Sauvegarde réussie', 'success');
                return data;
            }
            
            throw new Error('Erreur serveur');
        } catch (error) {
            console.error('Erreur de sauvegarde:', error);
            this.showNotification('Erreur lors de la sauvegarde', 'error');
            throw error;
        }
    }

    // Partage des résultats
    async shareResult() {
        try {
            const text = `${this.currentOperand}\n\nCalcul effectué avec Calculatrice Professionnelle`;
            await navigator.share({
                title: 'Résultat de calcul',
                text: text
            });
        } catch (error) {
            console.error('Erreur de partage:', error);
            this.showNotification('Partage non supporté sur votre appareil', 'warning');
        }
    }

    // Gestion des notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Récupération des préférences de mise en page
    getLayoutPreferences() {
        return {
            buttonSize: this.getButtonSize(),
            displayFormat: this.getDisplayFormat(),
            historyVisible: this.historyElement.style.display !== 'none'
        };
    }

    // Récupération des préférences de calculatrice
    getCalculatorPreferences() {
        return {
            precision: this.getPrecision(),
            scientificMode: this.isScientificModeEnabled(),
            unitSystem: this.getUnitSystem()
        };
    }

    // Gestion des erreurs
    handleError(error) {
        this.showNotification(error.message, 'error');
        console.error(error);
        this.currentOperand = 'Error';
        this.updateDisplay();
    }

    // Méthodes utilitaires
    getButtonSize() {
        return 'medium'; // À implémenter selon les préférences
    }

    getDisplayFormat() {
        return 'scientific'; // À implémenter selon les préférences
    }

    getPrecision() {
        return 10; // À implémenter selon les préférences
    }

    isScientificModeEnabled() {
        return true; // À implémenter selon les préférences
    }

    getUnitSystem() {
        return 'metric'; // À implémenter selon les préférences
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
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
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }

    saveToLocalStorage() {
        const calculatorState = {
            currentOperand: this.currentOperand,
            previousOperand: this.previousOperand,
            operation: this.operation
        };
        localStorage.setItem(`calculator-${this.currentOperandElement.parentElement.parentElement.id}`, JSON.stringify(calculatorState));
    }

    loadFromLocalStorage() {
        const calculatorId = this.currentOperandElement.parentElement.parentElement.id;
        const savedState = localStorage.getItem(`calculator-${calculatorId}`);
        if (savedState) {
            const state = JSON.parse(savedState);
            this.currentOperand = state.currentOperand;
            this.previousOperand = state.previousOperand;
            this.operation = state.operation;
            this.updateDisplay();
        }
    }
}

// Thèmes
const themeToggle = document.createElement('div');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
} else {
    document.body.classList.add('light-theme');
}

// Initialisation des calculatrices
const calculators = document.querySelectorAll('.calculator');

// Pour chaque calculatrice, initialiser une nouvelle instance
const calculatorInstances = Array.from(calculators).map(calculator => {
    calculator.id = `calculator-${Math.random().toString(36).substr(2, 9)}`;
    const previousOperandElement = calculator.querySelector('.previous-operand');
    const currentOperandElement = calculator.querySelector('.current-operand');
    return new Calculator(previousOperandElement, currentOperandElement);
});

// Gestion des raccourcis clavier
document.addEventListener('keydown', (e) => {
    const calculator = calculatorInstances[0]; // Utiliser la première calculatrice par défaut
    switch(e.key) {
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':
            calculator.appendNumber(e.key);
            calculator.updateDisplay();
            break;
        case '+': calculator.chooseOperation('+'); break;
        case '-': calculator.chooseOperation('-'); break;
        case '*': calculator.chooseOperation('×'); break;
        case '/': calculator.chooseOperation('÷'); break;
        case '=': case 'Enter': calculator.compute(); break;
        case 'Backspace': calculator.delete(); break;
        case 'Escape': calculator.clear(); break;
        case 'F1': calculator.showInfo(); break;
        case 'F2': calculator.toggleFullscreen(); break;
    }
});

// Gestion des boutons supplémentaires
calculatorInstances.forEach((calculator, index) => {
    const calculatorElement = calculators[index];
    
    // Bouton de partage
    calculatorElement.querySelector('.share').addEventListener('click', () => {
        calculator.shareResult();
    });

    // Bouton info
    calculatorElement.querySelector('.info').addEventListener('click', () => {
        calculator.showInfo();
    });

    // Bouton plein écran
    calculatorElement.querySelector('.fullscreen-button').addEventListener('click', () => {
        calculator.toggleFullscreen();
    });

    // Conversion d'unités
    calculatorElement.querySelectorAll('.unit-button').forEach(button => {
        button.addEventListener('click', () => {
            const fromUnit = button.dataset.from;
            const toUnit = button.dataset.to;
            calculator.convertUnits(fromUnit, toUnit);
        });
    });

    // Graphique
    calculatorElement.querySelector('.scientific').forEach(button => {
        if (button.textContent === 'plot') {
            button.addEventListener('click', () => {
                calculator.graphContainer.classList.toggle('active');
                if (calculator.graphContainer.classList.contains('active')) {
                    calculator.plotFunction('x**2', [-5, 5]);
                }
            });
        }
    });
});

// Charger l'état sauvegardé pour chaque calculatrice
calculatorInstances.forEach(calculator => calculator.loadFromLocalStorage());

// Ajouter les écouteurs d'événements pour chaque calculatrice
calculatorInstances.forEach((calculator, index) => {
    const calculatorElement = calculators[index];
    
    calculatorElement.addEventListener('click', (e) => {
        const element = e.target;
        const { currentOperandElement } = calculator;

        if (element.classList.contains('number')) {
            calculator.appendNumber(element.innerText);
            calculator.updateDisplay();
        } else if (element.classList.contains('operator')) {
            calculator.chooseOperation(element.innerText);
            calculator.updateDisplay();
        } else if (element.classList.contains('equals')) {
            calculator.compute();
            calculator.updateDisplay();
        } else if (element.classList.contains('clear')) {
            calculator.clear();
            calculator.updateDisplay();
        } else if (element.classList.contains('delete')) {
            calculator.delete();
            calculator.updateDisplay();
        } else if (element.classList.contains('scientific')) {
            calculator.scientificOperation(element.innerText);
            calculator.updateDisplay();
        }
    });
});

// Ajouter les effets sonores
const clickSound = new Audio('click.mp3');
const errorSound = new Audio('error.mp3');

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        clickSound.play();
    });
});

// Gérer les erreurs
window.onerror = (msg, url, line, col, error) => {
    errorSound.play();
    alert('Une erreur est survenue : ' + msg);
    return false;
};
