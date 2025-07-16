/**
 * Canvas Debugger
 * Helps debug 3D canvas visibility issues in dark mode
 */
export default class CanvasDebugger {
    constructor() {
        this.debugMode = false;
        this.init();
    }

    init() {
        // Add debugging shortcut
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' && e.ctrlKey) {
                this.toggleDebugMode();
            }
        });
    }

    toggleDebugMode() {
        this.debugMode = !this.debugMode;
        console.log(`🐛 Canvas Debug Mode: ${this.debugMode ? 'ON' : 'OFF'}`);
        
        if (this.debugMode) {
            this.startDebugging();
        } else {
            this.stopDebugging();
        }
    }

    startDebugging() {
        console.log('🔍 Starting canvas debug...');
        
        // Check canvas elements
        const canvases = document.querySelectorAll('canvas');
        console.log(`📊 Found ${canvases.length} canvas elements:`);
        
        canvases.forEach((canvas, index) => {
            const styles = window.getComputedStyle(canvas);
            console.log(`Canvas ${index + 1}:`, {
                className: canvas.className,
                visibility: styles.visibility,
                opacity: styles.opacity,
                display: styles.display,
                zIndex: styles.zIndex,
                background: styles.backgroundColor,
                width: styles.width,
                height: styles.height
            });
        });

        // Check experience container
        const experience = document.querySelector('.experience');
        if (experience) {
            const styles = window.getComputedStyle(experience);
            console.log('🎮 Experience container:', {
                visibility: styles.visibility,
                opacity: styles.opacity,
                display: styles.display,
                zIndex: styles.zIndex,
                background: styles.backgroundColor,
                position: styles.position
            });
        }

        // Check page element
        const page = document.querySelector('.page');
        if (page) {
            const styles = window.getComputedStyle(page);
            console.log('📄 Page element:', {
                visibility: styles.visibility,
                opacity: styles.opacity,
                display: styles.display,
                zIndex: styles.zIndex,
                background: styles.backgroundColor,
                position: styles.position
            });
        }

        // Check current theme
        const isDark = document.body.classList.contains('dark-theme');
        console.log(`🌙 Current theme: ${isDark ? 'Dark' : 'Light'}`);
    }

    stopDebugging() {
        console.log('⏹️ Stopping canvas debug...');
    }

    // Force canvas visibility
    forceCanvasVisibility() {
        const canvas = document.querySelector('.experience-canvas');
        if (canvas) {
            canvas.style.visibility = 'visible';
            canvas.style.opacity = '1';
            canvas.style.display = 'block';
            canvas.style.zIndex = '1';
            
            console.log('🔧 Forced canvas visibility');
        }

        const experience = document.querySelector('.experience');
        if (experience) {
            experience.style.visibility = 'visible';
            experience.style.opacity = '1';
            experience.style.display = 'block';
            experience.style.zIndex = '1';
            
            console.log('🔧 Forced experience container visibility');
        }
    }
}

// Auto-initialize if debug mode is enabled
if (window.location.search.includes('debug=true')) {
    new CanvasDebugger();
}

// Export for manual use
window.CanvasDebugger = CanvasDebugger;
