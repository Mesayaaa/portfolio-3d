export default class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]'); // Hanya section dengan ID
        this.progressLine = document.querySelector('.progress-line');
        this.currentSection = 0;
        
        // Definisikan target scroll untuk setiap section
        this.sectionTargets = {
            'hero': '#hero-title',
            'about': '#about-title',
            'projects': '#projects-title',
            'skills': '#skills-title',
            'contact': '#contact-title'
        };
        
        this.init();
    }

    init() {
        this.setupScrollProgress();
        this.setupNavigation();
        // Hapus keyboard dan mouse wheel navigation untuk scroll normal
        // this.setupKeyboardNavigation();
        // this.setupMouseWheelNavigation();
    }

    setupScrollProgress() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            
            this.progressLine.style.width = `${scrollProgress}%`;
            
            // Check current theme for consistent colors
            const isDarkMode = document.body.classList.contains('dark-theme');
            const glowColor = isDarkMode ? '229, 161, 170' : '229, 161, 170';
            
            // Add pulsing effect when scrolling
            this.progressLine.style.boxShadow = `0 0 20px rgba(${glowColor}, ${scrollProgress / 100})`;
        });
    }

    setupNavigation() {
        this.navLinks.forEach((link, index) => {
            // Add hover effects
            link.addEventListener('mouseenter', () => {
                const isDarkMode = document.body.classList.contains('dark-theme');
                const glowColor = isDarkMode ? '229, 161, 170' : '229, 161, 170';
                
                link.style.transform = 'scale(1.3)';
                link.style.boxShadow = `0 0 15px rgba(${glowColor}, 0.5)`;
            });
            
            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active')) {
                    link.style.transform = 'scale(1)';
                    link.style.boxShadow = 'none';
                }
            });
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                this.navLinks.forEach(nav => {
                    nav.classList.remove('active');
                    nav.style.transform = 'scale(1)';
                    nav.style.boxShadow = 'none';
                });
                
                // Add active class to clicked link
                const isDarkMode = document.body.classList.contains('dark-theme');
                const glowColor = isDarkMode ? '229, 161, 170' : '229, 161, 170';
                
                link.classList.add('active');
                link.style.transform = 'scale(1.3)';
                link.style.boxShadow = `0 0 15px rgba(${glowColor}, 0.8)`;
                
                // Get target section
                const targetSection = this.sections[index];
                if (targetSection) {
                    const sectionId = targetSection.id;
                    const targetSelector = this.sectionTargets[sectionId];
                    
                    if (targetSelector) {
                        // Cari element target dengan ID selector
                        const targetElement = document.querySelector(targetSelector);
                        if (targetElement) {
                            // Scroll ke element target dengan smooth behavior
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        } else {
                            // Fallback ke section jika target tidak ditemukan
                            targetSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    } else {
                        // Fallback ke section
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    
                    this.currentSection = index;
                }
            });
        });

        // Update active navigation on scroll - tanpa navigation otomatis
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        });
    }

    // Hapus keyboard navigation untuk scroll normal
    // setupKeyboardNavigation() {
    //     document.addEventListener('keydown', (e) => {
    //         if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    //             e.preventDefault();
    //             this.navigateToSection(this.currentSection + 1);
    //         } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    //             e.preventDefault();
    //             this.navigateToSection(this.currentSection - 1);
    //         }
    //     });
    // }

    // Hapus mouse wheel navigation untuk scroll normal
    // setupMouseWheelNavigation() {
    //     let wheelTimeout;
        
    //     window.addEventListener('wheel', (e) => {
    //         clearTimeout(wheelTimeout);
            
    //         wheelTimeout = setTimeout(() => {
    //             if (e.deltaY > 0) {
    //                 // Scrolling down
    //                 this.navigateToSection(this.currentSection + 1);
    //             } else {
    //                 // Scrolling up
    //                 this.navigateToSection(this.currentSection - 1);
    //             }
    //         }, 150);
    //     });
    // }

    // Hapus navigasi otomatis
    // navigateToSection(index) {
    //     if (index >= 0 && index < this.sections.length) {
    //         this.currentSection = index;
    //         const targetSection = this.sections[index];
    //         this.smoothScrollTo(targetSection);
            
    //         // Update navigation
    //         this.navLinks.forEach((nav, i) => {
    //             nav.classList.toggle('active', i === index);
    //             if (i === index) {
    //                 nav.style.transform = 'scale(1.3)';
    //                 nav.style.boxShadow = '0 0 15px rgba(229, 161, 170, 0.8)';
    //             } else {
    //                 nav.style.transform = 'scale(1)';
    //                 nav.style.boxShadow = 'none';
    //             }
    //         });
    //     }
    // }

    // Hapus custom smooth scroll
    // smoothScrollTo(target) {
    //     const startPosition = window.pageYOffset;
    //     const targetPosition = target.offsetTop;
    //     const distance = targetPosition - startPosition;
    //     const duration = 1000;
    //     let start = null;

    //     const animation = (currentTime) => {
    //         if (start === null) start = currentTime;
    //         const timeElapsed = currentTime - start;
    //         const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
    //         window.scrollTo(0, run);
    //         if (timeElapsed < duration) requestAnimationFrame(animation);
    //     };

    //     requestAnimationFrame(animation);
    // }

    // easeInOutQuad(t, b, c, d) {
    //     t /= d / 2;
    //     if (t < 1) return c / 2 * t * t + b;
    //     t--;
    //     return -c / 2 * (t * (t - 2) - 1) + b;
    // }

    updateActiveNavigation() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop - windowHeight / 2 && 
                scrollPos < sectionTop + sectionHeight - windowHeight / 2) {
                
                this.currentSection = index;
                
                // Remove active class from all links
                this.navLinks.forEach((nav, i) => {
                    nav.classList.toggle('active', i === index);
                    if (i === index) {
                        nav.style.transform = 'scale(1.3)';
                        nav.style.boxShadow = '0 0 15px rgba(229, 161, 170, 0.8)';
                    } else {
                        nav.style.transform = 'scale(1)';
                        nav.style.boxShadow = 'none';
                    }
                });
            }
        });
    }
}
