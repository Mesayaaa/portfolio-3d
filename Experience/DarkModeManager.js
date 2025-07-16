import { EventEmitter } from "events";

export default class DarkModeManager extends EventEmitter {
    constructor() {
        super();
        
        this.isDarkMode = false;
        this.elements = {
            body: document.body,
            toggleButton: document.querySelector('.toggle-button'),
            toggleCircle: document.querySelector('.toggle-circle'),
            preloader: document.querySelector('.white-preloader'),
            experienceCanvas: document.querySelector('.experience-canvas'),
            page: document.querySelector('.page'),
            pageWrapper: document.querySelector('.page-wrapper'),
            hero: document.querySelector('.hero'),
            sections: document.querySelectorAll('.section'),
            sectionMargins: document.querySelectorAll('.section-margin'),
            loadingMessage: document.querySelector('.loading-message'),
            scrollIndicator: document.querySelector('.scroll-indicator'),
            navigation: document.querySelector('.navigation'),
            toggleBar: document.querySelector('.toggle-bar'),
            progressLine: document.querySelector('.progress-line'),
            particleCanvas: document.querySelector('#particle-canvas')
        };
        
        this.init();
    }
    
    init() {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            this.isDarkMode = savedTheme === 'dark';
        } else {
            // Check system preference
            this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        
        // Apply initial theme
        this.applyTheme(this.isDarkMode);
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                this.isDarkMode = e.matches;
                this.applyTheme(this.isDarkMode);
            }
        });
        
        // Set up toggle button event listener
        if (this.elements.toggleButton) {
            this.elements.toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Add keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        // Apply theme to dynamically created elements
        this.observeNewElements();
    }
    
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme(this.isDarkMode);
        
        // Save preference
        localStorage.setItem('portfolio-theme', this.isDarkMode ? 'dark' : 'light');
        
        // Emit theme change event
        this.emit('themeChanged', this.isDarkMode ? 'dark' : 'light');
    }
    
    applyTheme(isDark) {
        const theme = isDark ? 'dark' : 'light';
        
        // Update body classes
        if (this.elements.body) {
            this.elements.body.classList.remove('light-theme', 'dark-theme');
            this.elements.body.classList.add(`${theme}-theme`);
        }
        
        // Update toggle button state
        if (this.elements.toggleCircle) {
            this.elements.toggleCircle.classList.toggle('slide', isDark);
        }
        
        // Apply theme to canvas elements
        this.applyCanvasTheme(isDark);
        
        // Apply theme to particle system
        this.applyParticleTheme(isDark);
        
        // Update meta theme color
        this.updateMetaThemeColor(isDark);
        
        // Apply theme to scroll progress
        this.applyScrollProgressTheme(isDark);
        
        // Apply theme to any WebGL elements
        this.applyWebGLTheme(isDark);
        
        // Force repaint to ensure all elements update
        this.forceRepaint();
    }
    
    applyCanvasTheme(isDark) {
        if (this.elements.experienceCanvas) {
            this.elements.experienceCanvas.style.backgroundColor = isDark ? '#1a1a1a' : '#FAF4E5';
        }
    }
    
    applyParticleTheme(isDark) {
        if (this.elements.particleCanvas) {
            this.elements.particleCanvas.style.opacity = isDark ? '0.6' : '0.4';
        }
    }
    
    updateMetaThemeColor(isDark) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = isDark ? '#1a1a1a' : '#FAF4E5';
    }
    
    applyScrollProgressTheme(isDark) {
        if (this.elements.progressLine) {
            const gradient = isDark 
                ? 'linear-gradient(90deg, #e5a1aa, #8395CD, #7AD0AC, #E67E22)'
                : 'linear-gradient(90deg, #e5a1aa, #8395CD, #7AD0AC, #F39C12)';
            this.elements.progressLine.style.background = gradient;
        }
    }
    
    applyWebGLTheme(isDark) {
        // This will be handled by the Experience class
        // Just emit the event for other components to listen
        this.emit('webglThemeChange', isDark ? 'dark' : 'light');
    }
    
    forceRepaint() {
        // Force a repaint to ensure all CSS changes are applied
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
    }
    
    observeNewElements() {
        // Watch for new elements being added to the DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            this.applyThemeToElement(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    applyThemeToElement(element) {
        // Apply theme to newly created elements
        if (element.matches && element.matches('.stats-container, .contact-item, .skill-card, .project-item, .navigation, .toggle-bar')) {
            // Theme will be applied by CSS, just ensure proper class structure
            element.classList.add('themed-element');
        }
    }
    
    // Public methods for other components
    getCurrentTheme() {
        return this.isDarkMode ? 'dark' : 'light';
    }
    
    isDarkModeActive() {
        return this.isDarkMode;
    }
    
    // Method to manually set theme (for external use)
    setTheme(theme) {
        const isDark = theme === 'dark';
        if (this.isDarkMode !== isDark) {
            this.isDarkMode = isDark;
            this.applyTheme(isDark);
            localStorage.setItem('portfolio-theme', theme);
            this.emit('themeChanged', theme);
        }
    }
    
    // Method to reset to system preference
    resetToSystemPreference() {
        localStorage.removeItem('portfolio-theme');
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.applyTheme(this.isDarkMode);
        this.emit('themeChanged', this.isDarkMode ? 'dark' : 'light');
    }
}
