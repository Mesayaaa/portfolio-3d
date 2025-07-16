import "./style.css";
import Experience from "./Experience/Experience.js";
import Navigation from "./Experience/Navigation.js";
import TextAnimations from "./Experience/TextAnimations.js";
import ParticleEffect from "./Experience/ParticleEffect.js";
import CanvasDebugger from "./Experience/CanvasDebugger.js";

// Import dark mode test for development (can be removed in production)
// import DarkModeTest from "./Experience/DarkModeTest.js";

// Initialize the experience
const experience = new Experience(document.querySelector(".experience-canvas"));
const navigation = new Navigation();
const textAnimations = new TextAnimations();
const particleEffect = new ParticleEffect();
const canvasDebugger = new CanvasDebugger();

// Handle page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  console.log('Portfolio initialized successfully');
  
  // Initialize dark mode test in development
  // Uncomment the following line to run dark mode tests
  // new DarkModeTest();
  
  // Add smooth scrolling fallback
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Initialize theme persistence
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${savedTheme}-theme`);
  }
  
  // Add theme debugging info
  console.log('🌙 Dark mode system initialized');
  console.log('💡 Current theme:', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  console.log('🎮 Theme toggle shortcut: Ctrl/Cmd + Shift + T');
  
  // Add development helpers
  if (process.env.NODE_ENV === 'development') {
    window.toggleTheme = () => {
      const toggleButton = document.querySelector('.toggle-button');
      if (toggleButton) {
        // Prevent default behavior and trigger click
        const event = new Event('click', { bubbles: true });
        toggleButton.dispatchEvent(event);
      }
    };
    
    window.testDarkMode = () => {
      import('./Experience/DarkModeTest.js').then(module => {
        new module.default();
      });
    };
    
    window.debugCanvas = () => {
      canvasDebugger.startDebugging();
    };
    
    window.forceCanvasVisibility = () => {
      canvasDebugger.forceCanvasVisibility();
    };
    
    window.testThemeToggle = () => {
      import('./Experience/ThemeToggleTest.js').then(module => {
        new module.default();
      });
    };
    
    console.log('🔧 Development helpers available:');
    console.log('   - toggleTheme(): Toggle theme programmatically');
    console.log('   - testDarkMode(): Run dark mode test suite');
    console.log('   - debugCanvas(): Debug canvas visibility');
    console.log('   - forceCanvasVisibility(): Force canvas to be visible');
    console.log('   - testThemeToggle(): Test theme toggle scroll preservation');
  }
});

// Handle visibility change to maintain theme
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Re-apply theme when page becomes visible
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme && savedTheme !== currentTheme) {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${savedTheme}-theme`);
    }
  }
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only apply system theme if no user preference is saved
  if (!localStorage.getItem('portfolio-theme')) {
    const systemTheme = e.matches ? 'dark' : 'light';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${systemTheme}-theme`);
    
    // Update toggle button state
    const toggleCircle = document.querySelector('.toggle-circle');
    if (toggleCircle) {
      toggleCircle.classList.toggle('slide', e.matches);
    }
    
    console.log('🌙 System theme changed to:', systemTheme);
  }
});
