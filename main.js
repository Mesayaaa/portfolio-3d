import "./style.css";
import Experience from "./Experience/Experience.js";
import Navigation from "./Experience/Navigation.js";
import TextAnimations from "./Experience/TextAnimations.js";
import ParticleEffect from "./Experience/ParticleEffect.js";

// Initialize the experience
const experience = new Experience(document.querySelector(".experience-canvas"));
const navigation = new Navigation();
const textAnimations = new TextAnimations();
const particleEffect = new ParticleEffect();

// Handle page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  console.log('Portfolio initialized successfully');
  
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
});
