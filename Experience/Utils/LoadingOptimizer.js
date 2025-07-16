// Enhanced loading manager with progress tracking and error handling
export class LoadingManager {
  constructor() {
    this.totalItems = 0;
    this.loadedItems = 0;
    this.errors = [];
    this.startTime = Date.now();
    this.callbacks = {
      progress: [],
      complete: [],
      error: [],
      start: []
    };
    
    this.init();
  }

  init() {
    this.updatePreloader();
    this.setupErrorHandling();
  }

  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      this.handleError(e.error || e.message);
    });

    window.addEventListener('unhandledrejection', (e) => {
      this.handleError(e.reason);
    });
  }

  addItem(name = 'unnamed') {
    this.totalItems++;
    this.emit('start', { name, total: this.totalItems });
    return this.totalItems - 1;
  }

  itemLoaded(id, name = 'unnamed') {
    this.loadedItems++;
    const progress = this.getProgress();
    
    this.emit('progress', {
      progress,
      loaded: this.loadedItems,
      total: this.totalItems,
      name,
      id
    });
    
    this.updatePreloader(progress);
    
    if (this.loadedItems === this.totalItems) {
      this.complete();
    }
  }

  itemError(error, name = 'unnamed') {
    this.errors.push({ error, name, timestamp: Date.now() });
    this.emit('error', { error, name, errors: this.errors });
    
    // Still count as loaded to prevent hanging
    this.itemLoaded(-1, name);
  }

  complete() {
    const loadTime = Date.now() - this.startTime;
    
    this.emit('complete', {
      loadTime,
      errors: this.errors,
      hasErrors: this.errors.length > 0
    });
    
    this.hidePreloader();
  }

  updatePreloader(progress = 0) {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.preloader-progress');
    const progressText = document.querySelector('.preloader-text');
    
    if (progressBar) {
      progressBar.style.width = `${progress * 100}%`;
    }
    
    if (progressText) {
      progressText.textContent = `Loading... ${Math.round(progress * 100)}%`;
    }
  }

  hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      // Add fade out animation
      gsap.to(preloader, {
        duration: 0.8,
        opacity: 0,
        ease: 'power2.out',
        onComplete: () => {
          preloader.style.display = 'none';
          document.body.classList.add('loaded');
        }
      });
    }
  }

  // Event system
  on(event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  emit(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(callback => callback(data));
    }
  }

  getProgress() {
    return this.totalItems > 0 ? this.loadedItems / this.totalItems : 0;
  }

  handleError(error) {
    console.error('Loading error:', error);
    this.itemError(error);
  }
}

// Resource preloader with caching
export class ResourcePreloader {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.cache = new Map();
    this.loaders = new Map();
    
    this.setupLoaders();
  }

  setupLoaders() {
    // Image loader
    this.loaders.set('image', (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    });

    // Video loader
    this.loaders.set('video', (url) => {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.oncanplaythrough = () => resolve(video);
        video.onerror = reject;
        video.src = url;
        video.load();
      });
    });

    // Font loader
    this.loaders.set('font', (url, family) => {
      return new Promise((resolve, reject) => {
        const font = new FontFace(family, `url(${url})`);
        font.load().then(() => {
          document.fonts.add(font);
          resolve(font);
        }).catch(reject);
      });
    });

    // Generic fetch loader
    this.loaders.set('fetch', (url) => {
      return fetch(url).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
      });
    });
  }

  async load(resources) {
    const promises = resources.map(resource => this.loadResource(resource));
    
    try {
      const results = await Promise.allSettled(promises);
      return results.map((result, index) => ({
        resource: resources[index],
        success: result.status === 'fulfilled',
        data: result.value,
        error: result.reason
      }));
    } catch (error) {
      console.error('Resource loading failed:', error);
      return [];
    }
  }

  async loadResource(resource) {
    const { url, type, name } = resource;
    
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    const id = this.loadingManager.addItem(name || url);
    
    try {
      const loader = this.loaders.get(type) || this.loaders.get('fetch');
      const result = await loader(url, resource.family);
      
      this.cache.set(url, result);
      this.loadingManager.itemLoaded(id, name || url);
      
      return result;
    } catch (error) {
      this.loadingManager.itemError(error, name || url);
      throw error;
    }
  }

  preloadImages(images) {
    return this.load(images.map(img => ({
      url: img,
      type: 'image',
      name: img.split('/').pop()
    })));
  }

  preloadFonts(fonts) {
    return this.load(fonts.map(font => ({
      url: font.url,
      type: 'font',
      name: font.family,
      family: font.family
    })));
  }
}

// Performance monitor
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: 0,
      memory: 0,
      loadTime: 0,
      renderTime: 0
    };
    
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.isMonitoring = false;
    
    this.init();
  }

  init() {
    this.setupFPSMonitoring();
    this.setupMemoryMonitoring();
    this.setupPerformanceObserver();
  }

  setupFPSMonitoring() {
    const calculateFPS = () => {
      const now = performance.now();
      const delta = now - this.lastTime;
      
      this.frameCount++;
      
      if (delta >= 1000) {
        this.metrics.fps = Math.round((this.frameCount * 1000) / delta);
        this.frameCount = 0;
        this.lastTime = now;
      }
      
      if (this.isMonitoring) {
        requestAnimationFrame(calculateFPS);
      }
    };
    
    calculateFPS();
  }

  setupMemoryMonitoring() {
    if (performance.memory) {
      setInterval(() => {
        this.metrics.memory = {
          used: Math.round(performance.memory.usedJSHeapSize / 1048576),
          total: Math.round(performance.memory.totalJSHeapSize / 1048576),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
        };
      }, 1000);
    }
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      try {
        // Monitor paint timing
        const paintObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.loadTime = entry.startTime;
            }
          });
        });
        
        paintObserver.observe({ entryTypes: ['paint'] });

        // Monitor long tasks
        const longTaskObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration + 'ms');
            }
          });
        });
        
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (error) {
        console.warn('Performance observer not supported:', error);
      }
    }
  }

  start() {
    this.isMonitoring = true;
  }

  stop() {
    this.isMonitoring = false;
  }

  getMetrics() {
    return { ...this.metrics };
  }

  displayMetrics() {
    const display = document.createElement('div');
    display.id = 'performance-metrics';
    display.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      min-width: 200px;
    `;
    
    document.body.appendChild(display);
    
    const update = () => {
      const metrics = this.getMetrics();
      display.innerHTML = `
        <div>FPS: ${metrics.fps}</div>
        <div>Memory: ${metrics.memory.used}MB / ${metrics.memory.total}MB</div>
        <div>Load Time: ${metrics.loadTime.toFixed(2)}ms</div>
        <div>Render Time: ${metrics.renderTime.toFixed(2)}ms</div>
      `;
      
      if (this.isMonitoring) {
        requestAnimationFrame(update);
      }
    };
    
    update();
    
    return display;
  }
}

// Lazy loading utility
export class LazyLoader {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };
    
    this.observer = null;
    this.elements = new WeakMap();
    
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.options
      );
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const config = this.elements.get(element);
        
        if (config && config.callback) {
          config.callback(element);
        }
        
        this.unobserve(element);
      }
    });
  }

  observe(element, callback) {
    if (!this.observer) {
      callback(element);
      return;
    }
    
    this.elements.set(element, { callback });
    this.observer.observe(element);
  }

  unobserve(element) {
    if (this.observer) {
      this.observer.unobserve(element);
    }
    this.elements.delete(element);
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.elements = new WeakMap();
  }
}

// Export singleton instances
export const loadingManager = new LoadingManager();
export const resourcePreloader = new ResourcePreloader(loadingManager);
export const performanceMonitor = new PerformanceMonitor();
export const lazyLoader = new LazyLoader();

// Auto-start performance monitoring in development
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.start();
  performanceMonitor.displayMetrics();
}
