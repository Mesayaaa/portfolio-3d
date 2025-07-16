# 🎨 Customization Guide

## Personal Information

### 1. Update Header Information
Edit `index.html` lines 5-50:
```html
<title>YourName - Front-End Developer | Your Specializations</title>
<meta name="description" content="Your professional description here." />
<meta name="author" content="Your Name" />
```

### 2. Update Social Media Links
Edit `index.html` in the hero section:
```html
<div class="hero-social">
  <a href="https://github.com/yourusername" target="_blank">
    <i class="fab fa-github"></i>
  </a>
  <a href="https://linkedin.com/in/yourprofile" target="_blank">
    <i class="fab fa-linkedin"></i>
  </a>
  <!-- Add more social links -->
</div>
```

### 3. Update Contact Information
Edit `index.html` in the contact section:
```html
<div class="contact-info">
  <div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>your.email@example.com</span>
  </div>
  <div class="contact-item">
    <i class="fas fa-phone"></i>
    <span>+1 (555) 123-4567</span>
  </div>
  <div class="contact-item">
    <i class="fas fa-map-marker-alt"></i>
    <span>Your City, Country</span>
  </div>
</div>
```

## Content Customization

### 1. Hero Section
Edit `index.html` around line 60:
```html
<div class="hero-main">
  <h1 class="hero-main-title">Your Name</h1>
  <p class="hero-main-description">Your professional title and brief description</p>
  <div class="hero-tech-stack">
    <span class="tech-badge">React</span>
    <span class="tech-badge">Vue.js</span>
    <span class="tech-badge">TypeScript</span>
    <!-- Add your tech stack -->
  </div>
</div>
```

### 2. About Section
Edit `index.html` around line 100:
```html
<div class="about-text">
  <h2>About Me</h2>
  <p>Write your professional story here. Include your experience, passion, and what makes you unique as a developer.</p>
  <p>Mention your journey, achievements, and what you're currently working on.</p>
</div>
```

### 3. Skills Section
Edit `index.html` around line 200:
```html
<div class="skills-grid">
  <div class="skill-category">
    <h3>Frontend</h3>
    <div class="skill-tags">
      <span class="skill-tag">React</span>
      <span class="skill-tag">Vue.js</span>
      <span class="skill-tag">TypeScript</span>
      <!-- Add your skills -->
    </div>
  </div>
  <!-- Add more categories -->
</div>
```

### 4. Projects Section
Edit `index.html` around line 150:
```html
<div class="project-item">
  <div class="project-image">
    <img src="path/to/project-image.jpg" alt="Project Name">
  </div>
  <div class="project-info">
    <h3>Project Name</h3>
    <p>Project description and technologies used.</p>
    <div class="project-links">
      <a href="https://project-demo.com" target="_blank">Demo</a>
      <a href="https://github.com/yourusername/project" target="_blank">Code</a>
    </div>
  </div>
</div>
```

## Visual Customization

### 1. Color Scheme
Edit `style.css` CSS custom properties:
```css
:root {
  --color-primary: #your-primary-color;
  --color-secondary: #your-secondary-color;
  --color-accent: #your-accent-color;
  --color-text: #your-text-color;
  --color-text-light: #your-light-text-color;
  --color-background: #your-background-color;
  --color-background-alt: #your-alt-background-color;
}
```

### 2. Typography
Edit `style.css` font imports and variables:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700&display=swap');

:root {
  --font-family-primary: 'YourFont', sans-serif;
  --font-size-base: 16px;
  --font-size-large: 1.5rem;
  --font-size-xlarge: 2rem;
}
```

### 3. Animations
Edit `Experience/TextAnimations.js`:
```javascript
// Customize animation durations
const animationDurations = {
  typeWriter: 0.08,
  fadeIn: 0.8,
  slideIn: 1.0,
  counter: 2.0
};

// Customize animation easings
const animationEasings = {
  default: "power2.out",
  smooth: "power3.inOut",
  bounce: "bounce.out"
};
```

## 3D Model Customization

### 1. Replace 3D Model
1. Export your 3D model as `.glb` format
2. Replace `public/models/Finale Version 16.glb` with your model
3. Update the model path in `Experience/World/Room.js`:
```javascript
this.room = this.resources.items.room; // Make sure the key matches your model
```

### 2. Adjust Camera Settings
Edit `Experience/Camera.js`:
```javascript
// Adjust camera position and target
this.camera.position.set(x, y, z);
this.camera.lookAt(0, 0, 0);

// Adjust camera limits
this.controls.minDistance = 2;
this.controls.maxDistance = 10;
```

### 3. Lighting Setup
Edit `Experience/World/Environment.js`:
```javascript
// Adjust ambient light
this.ambientLight.intensity = 0.5;

// Adjust directional light
this.directionalLight.position.set(x, y, z);
this.directionalLight.intensity = 1.0;
```

## Performance Optimization

### 1. Mobile Optimization
Edit `Experience/Utils/Performance.js`:
```javascript
// Adjust mobile settings
const mobileSettings = {
  particleCount: 30,
  shadowMapSize: 256,
  antialias: false,
  postProcessing: false
};
```

### 2. Loading Optimization
Edit `Experience/Utils/Resources.js`:
```javascript
// Optimize resource loading
const resources = [
  {
    name: "room",
    type: "gltfModel",
    path: "/models/your-model.glb",
  },
  // Add your resources
];
```

## Adding New Features

### 1. Add New Animation
Create a new method in `Experience/TextAnimations.js`:
```javascript
customAnimation() {
  gsap.from(".your-element", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power2.out"
  });
}
```

### 2. Add New Section
1. Add HTML structure in `index.html`
2. Add CSS styles in `style.css`
3. Add JavaScript functionality in appropriate files

### 3. Add Particle Effects
Edit `Experience/ParticleEffect.js`:
```javascript
// Customize particle properties
const particleConfig = {
  count: 100,
  size: 2,
  color: "#your-color",
  speed: 0.5,
  connectionDistance: 100
};
```

## Testing Your Changes

### 1. Development Testing
```bash
npm run dev
```

### 2. Production Testing
```bash
npm run build
npm run preview
```

### 3. Mobile Testing
- Use Chrome DevTools device emulation
- Test on actual mobile devices
- Check performance on different devices

## Common Customizations

### 1. Change Background Color
```css
body {
  background: linear-gradient(45deg, #color1, #color2);
}
```

### 2. Update Logo/Favicon
Replace `favicon.svg` with your logo in SVG format

### 3. Add Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 4. Custom Cursor
```css
body {
  cursor: url('path/to/cursor.png'), auto;
}
```

## Best Practices

1. **Always backup** before making changes
2. **Test thoroughly** after each modification
3. **Keep performance in mind** when adding features
4. **Maintain responsive design** for all screen sizes
5. **Use semantic HTML** for better accessibility
6. **Optimize images** before adding them
7. **Follow naming conventions** for consistency

## Troubleshooting

### Common Issues
1. **3D model not showing**: Check file path and format
2. **Animations not working**: Verify GSAP library is loaded
3. **Mobile performance**: Enable performance optimizations
4. **Text not displaying**: Check font loading and CSS

### Getting Help
- Check browser console for errors
- Validate HTML and CSS
- Test in different browsers
- Refer to Three.js and GSAP documentation

Remember to test all changes thoroughly before deploying to production!
