/**
 * Scroll Position Manager
 * Preserves scroll position during theme changes and other operations
 */
export default class ScrollPositionManager {
    constructor() {
        this.savedPositions = new Map();
        this.isPreserving = false;
    }

    /**
     * Save current scroll position
     */
    savePosition(key = 'default') {
        const position = {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop,
            timestamp: Date.now()
        };
        
        this.savedPositions.set(key, position);
        console.log(`📍 Scroll position saved: ${key} - (${position.x}, ${position.y})`);
        return position;
    }

    /**
     * Restore saved scroll position
     */
    restorePosition(key = 'default', smooth = false) {
        const position = this.savedPositions.get(key);
        if (!position) {
            console.warn(`⚠️ No saved position found for key: ${key}`);
            return false;
        }

        // Use immediate scroll to restore exact position
        if (smooth) {
            window.scrollTo({
                left: position.x,
                top: position.y,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo(position.x, position.y);
        }

        console.log(`📍 Scroll position restored: ${key} - (${position.x}, ${position.y})`);
        return true;
    }

    /**
     * Preserve scroll position during an operation
     */
    preservePosition(operation, key = 'default') {
        if (this.isPreserving) {
            console.warn('⚠️ Already preserving position, skipping...');
            return operation();
        }

        this.isPreserving = true;
        
        try {
            // Save current position
            const savedPosition = this.savePosition(key);
            
            // Execute the operation
            const result = operation();
            
            // Restore position after operation
            const restore = () => {
                this.restorePosition(key);
                this.isPreserving = false;
            };

            // Handle both sync and async operations
            if (result && typeof result.then === 'function') {
                return result.then(restore).catch(restore);
            } else {
                // Use requestAnimationFrame for better timing
                requestAnimationFrame(restore);
                return result;
            }
        } catch (error) {
            this.isPreserving = false;
            throw error;
        }
    }

    /**
     * Clear saved positions
     */
    clearPositions() {
        this.savedPositions.clear();
        console.log('📍 All saved positions cleared');
    }

    /**
     * Get saved position info
     */
    getPositionInfo(key = 'default') {
        return this.savedPositions.get(key);
    }
}

// Create singleton instance
const scrollPositionManager = new ScrollPositionManager();

// Export singleton
export { scrollPositionManager };
