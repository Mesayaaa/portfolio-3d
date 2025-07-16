# 📚 API Documentation

## Three.js Integration

### Scene Setup
```javascript
// Basic scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
```

### Loading 3D Models
```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('path/to/model.glb', (gltf) => {
  scene.add(gltf.scene);
});
```

### Lighting
```javascript
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
```

### Materials
```javascript
// Standard material
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  roughness: 0.5,
  metalness: 0.2
});

// Physical material
const physicalMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x00ff00,
  roughness: 0.1,
  metalness: 0.9,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1
});
```

## GSAP Animation

### Basic Animations
```javascript
// Fade in animation
gsap.from('.element', {
  duration: 1,
  opacity: 0,
  y: 50,
  ease: 'power2.out'
});

// Scale animation
gsap.to('.element', {
  duration: 0.5,
  scale: 1.1,
  ease: 'bounce.out'
});
```

### Timeline Animations
```javascript
const tl = gsap.timeline();

tl.from('.title', { duration: 1, y: -50, opacity: 0 })
  .from('.subtitle', { duration: 0.8, y: 30, opacity: 0 }, '-=0.5')
  .from('.button', { duration: 0.6, scale: 0, ease: 'back.out(1.7)' }, '-=0.3');
```

### Scroll Triggered Animations
```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.to('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: true
  },
  x: 100,
  rotation: 360
});
```

## Custom Animation Functions

### Type Writer Effect
```javascript
export function typeWriterEffect(element, text, speed = 0.08) {
  element.innerHTML = '';
  
  const tl = gsap.timeline();
  
  for (let i = 0; i < text.length; i++) {
    tl.to(element, {
      duration: speed,
      innerHTML: text.substring(0, i + 1),
      ease: 'none'
    });
  }
  
  return tl;
}
```

### Counter Animation
```javascript
export function animateCounter(element, start, end, duration = 2) {
  const obj = { value: start };
  
  return gsap.to(obj, {
    duration: duration,
    value: end,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value);
    }
  });
}
```

### Particle System
```javascript
export class ParticleSystem {
  constructor(canvas, particleCount = 100) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    
    this.init(particleCount);
  }
  
  init(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  update() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
    });
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.fill();
    });
  }
}
```

## Performance Optimization

### Throttling and Debouncing
```javascript
// Throttle function
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

### Memory Management
```javascript
// Dispose of Three.js resources
export function disposeThreeJS(object) {
  if (object.geometry) {
    object.geometry.dispose();
  }
  
  if (object.material) {
    if (Array.isArray(object.material)) {
      object.material.forEach(material => material.dispose());
    } else {
      object.material.dispose();
    }
  }
  
  if (object.texture) {
    object.texture.dispose();
  }
}
```

## Event Handling

### Custom Event System
```javascript
export class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}
```

### Resize Handler
```javascript
export function setupResizeHandler(camera, renderer) {
  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  
  window.addEventListener('resize', handleResize);
  handleResize(); // Initial call
  
  return () => window.removeEventListener('resize', handleResize);
}
```

## Utility Functions

### Math Utilities
```javascript
export const MathUtils = {
  // Linear interpolation
  lerp: (start, end, factor) => start + (end - start) * factor,
  
  // Clamp value between min and max
  clamp: (value, min, max) => Math.max(min, Math.min(max, value)),
  
  // Map value from one range to another
  map: (value, inMin, inMax, outMin, outMax) => {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  },
  
  // Random number in range
  random: (min, max) => Math.random() * (max - min) + min,
  
  // Convert degrees to radians
  degToRad: (degrees) => degrees * Math.PI / 180,
  
  // Convert radians to degrees
  radToDeg: (radians) => radians * 180 / Math.PI
};
```

### DOM Utilities
```javascript
export const DOMUtils = {
  // Get element by selector
  $(selector) {
    return document.querySelector(selector);
  },
  
  // Get all elements by selector
  $$(selector) {
    return document.querySelectorAll(selector);
  },
  
  // Add class
  addClass: (element, className) => {
    element.classList.add(className);
  },
  
  // Remove class
  removeClass: (element, className) => {
    element.classList.remove(className);
  },
  
  // Toggle class
  toggleClass: (element, className) => {
    element.classList.toggle(className);
  },
  
  // Check if element has class
  hasClass: (element, className) => {
    return element.classList.contains(className);
  }
};
```

## Configuration Objects

### Animation Config
```javascript
export const AnimationConfig = {
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2
  },
  
  easings: {
    smooth: 'power2.out',
    bounce: 'bounce.out',
    elastic: 'elastic.out(1, 0.3)',
    back: 'back.out(1.7)'
  },
  
  stagger: {
    fast: 0.1,
    normal: 0.2,
    slow: 0.4
  }
};
```

### Performance Config
```javascript
export const PerformanceConfig = {
  mobile: {
    particleCount: 50,
    shadowMapSize: 512,
    antialias: false,
    postProcessing: false
  },
  
  desktop: {
    particleCount: 200,
    shadowMapSize: 1024,
    antialias: true,
    postProcessing: true
  },
  
  high: {
    particleCount: 500,
    shadowMapSize: 2048,
    antialias: true,
    postProcessing: true
  }
};
```

This documentation provides a comprehensive guide for working with the Three.js and GSAP APIs in your portfolio project. Refer to the official documentation for more advanced features and complete API references.
