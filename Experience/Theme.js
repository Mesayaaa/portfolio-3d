import EventEmitter from "events";
import { scrollPositionManager } from "./Utils/ScrollPositionManager.js";

export default class Theme extends EventEmitter {
    constructor() {
        super();

        this.theme = "light";

        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");

        // Initialize theme from localStorage or system preference
        this.initializeTheme();
        this.setEventListeners();
    }

    initializeTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            this.theme = savedTheme;
        } else {
            // Check system preference
            this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        // Apply initial theme
        this.applyTheme(this.theme);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme(this.theme);
            }
        });
    }

    setEventListeners() {
        if (this.toggleButton) {
            this.toggleButton.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
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
    }

    toggleTheme() {
        // Use scroll position manager to preserve position
        scrollPositionManager.preservePosition(() => {
            this.theme = this.theme === "light" ? "dark" : "light";
            this.applyTheme(this.theme);
            
            // Save preference
            localStorage.setItem('portfolio-theme', this.theme);
            
            // Emit theme change event
            this.emit("switch", this.theme);
        }, 'theme-toggle');
    }

    applyTheme(theme) {
        // Temporarily disable smooth scrolling during theme change
        document.body.classList.remove('theme-transition-complete');
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Update body classes
        document.body.classList.remove("light-theme", "dark-theme");
        document.body.classList.add(`${theme}-theme`);

        // Update toggle button state
        if (this.toggleCircle) {
            this.toggleCircle.classList.toggle("slide", theme === "dark");
        }

        // Update meta theme color
        this.updateMetaThemeColor(theme === "dark");

        // Apply theme to canvas and other elements
        this.applyCanvasTheme(theme === "dark");
        this.applyParticleTheme(theme === "dark");

        // Force repaint to ensure all elements update
        this.forceRepaint();
        
        // Re-enable smooth scrolling after theme change
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = 'smooth';
            document.body.classList.add('theme-transition-complete');
        }, 100);
    }

    applyCanvasTheme(isDark) {
        // Update main experience canvas
        const experienceCanvas = document.querySelector('.experience-canvas');
        if (experienceCanvas) {
            experienceCanvas.style.backgroundColor = isDark ? '#1a1a1a' : '#FAF4E5';
            experienceCanvas.style.visibility = 'visible';
            experienceCanvas.style.opacity = '1';
        }
        
        // Update experience container
        const experienceContainer = document.querySelector('.experience');
        if (experienceContainer) {
            experienceContainer.style.backgroundColor = isDark ? '#1a1a1a' : '#FAF4E5';
            experienceContainer.style.visibility = 'visible';
            experienceContainer.style.opacity = '1';
            experienceContainer.style.zIndex = '1';
        }
        
        // Update all canvas elements
        document.querySelectorAll('canvas').forEach(canvas => {
            if (canvas.classList.contains('experience-canvas')) {
                canvas.style.backgroundColor = isDark ? '#1a1a1a' : '#FAF4E5';
                canvas.style.visibility = 'visible';
                canvas.style.opacity = '1';
            }
        });
        
        // Ensure page background is transparent to show 3D
        const pageElement = document.querySelector('.page');
        if (pageElement) {
            pageElement.style.background = 'transparent';
        }
    }

    applyParticleTheme(isDark) {
        const particleCanvas = document.querySelector('#particle-canvas');
        if (particleCanvas) {
            particleCanvas.style.opacity = isDark ? '0.6' : '0.4';
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

    forceRepaint() {
        // Force a repaint to ensure all CSS changes are applied
        // Save current scroll position
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Trigger repaint without affecting scroll
        requestAnimationFrame(() => {
            document.body.style.transform = 'translateZ(0)';
            requestAnimationFrame(() => {
                document.body.style.transform = '';
                // Restore scroll position if needed
                if (window.pageYOffset !== currentScrollY) {
                    window.scrollTo(0, currentScrollY);
                }
            });
        });
    }

    // Public methods for other components
    getCurrentTheme() {
        return this.theme;
    }

    isDarkModeActive() {
        return this.theme === 'dark';
    }

    // Method to manually set theme (for external use)
    setTheme(theme) {
        if (this.theme !== theme) {
            this.theme = theme;
            this.applyTheme(theme);
            localStorage.setItem('portfolio-theme', theme);
            this.emit("switch", theme);
        }
    }

    // Method to reset to system preference
    resetToSystemPreference() {
        localStorage.removeItem('portfolio-theme');
        this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.applyTheme(this.theme);
        this.emit("switch", this.theme);
    }
}
