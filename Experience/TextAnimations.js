export default class TextAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypingEffect();
        this.setupScrollAnimations();
        this.setupSkillTagInteractions();
        this.setupCounterAnimations();
        this.setupProjectHoverEffects();
    }

    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-main-title');
        const heroDescription = document.querySelector('.hero-main-description');
        
        if (heroTitle && heroDescription) {
            // Add typing cursor effect
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('typing-complete');
                        this.typeWriter(entry.target);
                    }
                });
            });

            observer.observe(heroTitle);
            observer.observe(heroDescription);
        }
    }

    typeWriter(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--color-pink)';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.section-text, .section-heading, .skill-card, .project-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupSkillTagInteractions() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace('+', ''));
                    this.animateCounter(counter, target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 30);
    }

    setupProjectHoverEffects() {
        const projectItems = document.querySelectorAll('.project-item');
        
        projectItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const techTags = item.querySelectorAll('.tech-tag');
                techTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-5px)';
                    }, index * 100);
                });
            });
            
            item.addEventListener('mouseleave', () => {
                const techTags = item.querySelectorAll('.tech-tag');
                techTags.forEach(tag => {
                    tag.style.transform = 'translateY(0)';
                });
            });
        });
    }
}

// Add enhanced CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .typing-complete {
        animation: typeWriter 2s steps(40, end);
    }

    @keyframes typeWriter {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    .fade-in {
        animation: fadeInUp 0.8s ease-out;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .section-text,
    .section-heading,
    .skill-card,
    .project-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }

    .section-text.fade-in,
    .section-heading.fade-in,
    .skill-card.fade-in,
    .project-item.fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* Enhanced hover effects */
    .skill-tag {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .tech-tag {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .project-item:hover .tech-tag {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    /* Smooth transitions for stats */
    .stat-number {
        transition: all 0.3s ease;
    }

    .stat-item:hover .stat-number {
        transform: scale(1.1);
        color: var(--color-blue);
    }

    /* Enhanced badge animations */
    .badge {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .badge:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    /* Improved contact item interactions */
    .contact-item:hover .contact-icon {
        animation: pulse 1s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;

document.head.appendChild(style);
