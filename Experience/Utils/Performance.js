// Performance optimization utilities
export class PerformanceManager {
  constructor() {
    this.isLowPerformance = false;
    this.deviceType = 'desktop';
    this.initialized = false;
  }

  init() {
    this.detectDevice();
    this.detectPerformance();
    this.setupPerformanceObserver();
    this.initialized = true;
  }

  detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Check for mobile devices
    if (/android/i.test(userAgent)) {
      this.deviceType = 'android';
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      this.deviceType = 'ios';
    } else if (window.innerWidth < 768) {
      this.deviceType = 'mobile';
    } else if (window.innerWidth < 1024) {
      this.deviceType = 'tablet';
    }
  }

  detectPerformance() {
    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 4;
    
    // Check memory (if available)
    const memory = navigator.deviceMemory || 4;
    
    // Check WebGL capabilities
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      this.isLowPerformance = true;
      return;
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    
    // Basic performance detection
    this.isLowPerformance = cores < 4 || memory < 4 || 
                           renderer.includes('Intel') || 
                           this.deviceType === 'mobile' || 
                           this.deviceType === 'android';
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'paint') {
            console.log(`${entry.name}: ${entry.startTime}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    }
  }

  getOptimizedSettings() {
    return {
      // Renderer settings
      antialias: !this.isLowPerformance,
      shadowMapEnabled: !this.isLowPerformance,
      shadowMapSize: this.isLowPerformance ? 512 : 1024,
      
      // Animation settings
      animationQuality: this.isLowPerformance ? 'low' : 'high',
      particleCount: this.isLowPerformance ? 50 : 200,
      
      // Loading settings
      textureQuality: this.isLowPerformance ? 'low' : 'high',
      modelQuality: this.isLowPerformance ? 'low' : 'high',
      
      // Effects
      bloomEnabled: !this.isLowPerformance,
      postProcessingEnabled: !this.isLowPerformance,
      
      // Device specific
      deviceType: this.deviceType,
      isLowPerformance: this.isLowPerformance
    };
  }
}

// Loading manager with progress tracking
export class LoadingManager {
  constructor() {
    this.totalItems = 0;
    this.loadedItems = 0;
    this.callbacks = {
      progress: [],
      complete: [],
      error: []
    };
  }

  addItem() {
    this.totalItems++;
  }

  itemLoaded() {
    this.loadedItems++;
    const progress = this.loadedItems / this.totalItems;
    
    this.callbacks.progress.forEach(callback => callback(progress));
    
    if (this.loadedItems === this.totalItems) {
      this.callbacks.complete.forEach(callback => callback());
    }
  }

  onProgress(callback) {
    this.callbacks.progress.push(callback);
  }

  onComplete(callback) {
    this.callbacks.complete.push(callback);
  }

  onError(callback) {
    this.callbacks.error.push(callback);
  }

  getProgress() {
    return this.totalItems > 0 ? this.loadedItems / this.totalItems : 0;
  }
}

// Lazy loading utility
export class LazyLoader {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadElement(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px'
      });
    }
  }

  observe(element) {
    if (this.observer) {
      this.observer.observe(element);
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadElement(element);
    }
  }

  loadElement(element) {
    if (element.dataset.src) {
      element.src = element.dataset.src;
    }
    
    if (element.dataset.load) {
      const event = new CustomEvent('lazy-load', {
        detail: { element }
      });
      element.dispatchEvent(event);
    }
  }
}

// Memory management utility
export class MemoryManager {
  constructor() {
    this.disposables = new Set();
  }

  add(item) {
    this.disposables.add(item);
  }

  dispose() {
    this.disposables.forEach(item => {
      if (item.dispose) {
        item.dispose();
      }
    });
    this.disposables.clear();
  }

  getMemoryUsage() {
    if (performance.memory) {
      return {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  }
}

export default {
  PerformanceManager,
  LoadingManager,
  LazyLoader,
  MemoryManager
};
