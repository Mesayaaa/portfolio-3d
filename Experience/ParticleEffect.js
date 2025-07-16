export default class ParticleEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isDarkMode = false;
        
        // Theme-based colors
        this.lightColors = ['#e5a1aa', '#8395cd', '#7ad0ac', '#f39c12'];
        this.darkColors = ['#e5a1aa', '#8395cd', '#7ad0ac', '#e67e22'];
        this.colors = this.lightColors;
        
        this.init();
        this.setupThemeListener();
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }

    setupCanvas() {
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.updateCanvasOpacity();
        
        document.body.appendChild(this.canvas);
        this.resizeCanvas();
    }

    updateCanvasOpacity() {
        this.canvas.style.opacity = this.isDarkMode ? '0.6' : '0.4';
    }

    setupThemeListener() {
        // Check initial theme
        this.isDarkMode = document.body.classList.contains('dark-theme');
        this.updateTheme();
        
        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const newIsDarkMode = document.body.classList.contains('dark-theme');
                    if (newIsDarkMode !== this.isDarkMode) {
                        this.isDarkMode = newIsDarkMode;
                        this.updateTheme();
                    }
                }
            });
        });
        
        observer.observe(document.body, { attributes: true });
    }

    updateTheme() {
        this.colors = this.isDarkMode ? this.darkColors : this.lightColors;
        this.updateCanvasOpacity();
        
        // Update existing particles with new colors
        this.particles.forEach(particle => {
            particle.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Add particles on scroll
        window.addEventListener('scroll', () => {
            if (Math.random() < 0.1) {
                this.addParticle();
            }
        });
    }

    addParticle() {
        this.particles.push({
            x: this.mouse.x + (Math.random() - 0.5) * 100,
            y: this.mouse.y + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 3 + 2,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            opacity: 1,
            life: 60
        });
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse attraction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100 * 0.01;
                particle.vx += dx * force;
                particle.vy += dy * force;
            }
            
            // Boundary checking
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -0.8;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -0.8;
            }
            
            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Fade out particles with life
            if (particle.life) {
                particle.life--;
                particle.opacity = particle.life / 60;
                if (particle.life <= 0) {
                    this.particles.splice(i, 1);
                }
            }
            
            // Add slight random movement
            particle.vx += (Math.random() - 0.5) * 0.01;
            particle.vy += (Math.random() - 0.5) * 0.01;
            
            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (const particle of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.hexToRgba(particle.color, particle.opacity);
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
        
        // Draw connections between nearby particles
        this.drawConnections();
    }

    drawConnections() {
        const connectionColor = this.isDarkMode ? '#e5a1aa' : '#e5a1aa';
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const particle1 = this.particles[i];
                const particle2 = this.particles[j];
                
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * (this.isDarkMode ? 0.3 : 0.2);
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle1.x, particle1.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    this.ctx.strokeStyle = this.hexToRgba(connectionColor, opacity);
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}
