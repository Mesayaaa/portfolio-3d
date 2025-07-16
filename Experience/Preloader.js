import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/covertDivsToSpans.js";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;
        
        // Scroll blocking state
        this.isScrollBlocked = true;
        
        // Initialize white preloader
        this.initWhitePreloader();
        
        // Initialize scroll blocking
        this.initScrollBlocking();

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    initWhitePreloader() {
        // Show white preloader initially
        const whitePreloader = document.querySelector('.white-preloader');
        if (whitePreloader) {
            whitePreloader.style.opacity = '1';
            whitePreloader.style.visibility = 'visible';
        }
        
        // Update progress during resource loading
        this.resources.on('progress', (progress) => {
            this.updateWhitePreloaderProgress(progress);
        });
    }

    updateWhitePreloaderProgress(progress) {
        const preloaderBar = document.querySelector('.preloader-bar');
        const preloaderText = document.querySelector('.preloader-text');
        
        if (preloaderBar) {
            preloaderBar.style.width = `${progress * 100}%`;
        }
        
        if (preloaderText) {
            const percentage = Math.round(progress * 100);
            preloaderText.textContent = `Loading Experience... ${percentage}%`;
        }
    }

    hideWhitePreloader() {
        const whitePreloader = document.querySelector('.white-preloader');
        const mainContent = document.querySelector('.main-content');
        
        if (whitePreloader) {
            GSAP.to(whitePreloader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    whitePreloader.classList.add('hidden');
                    whitePreloader.style.display = 'none';
                    
                    // Show main content with smooth transition
                    if (mainContent) {
                        GSAP.to(mainContent, {
                            opacity: 1,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                }
            });
        }
    }

    initScrollBlocking() {
        // Add scroll-disabled class to body and page
        document.body.classList.add('scroll-disabled');
        const page = document.querySelector('.page');
        if (page) {
            page.classList.add('scroll-disabled');
        }

        // Prevent scroll events
        this.preventScroll = this.preventScroll.bind(this);
        this.preventKeyboardScroll = this.preventKeyboardScroll.bind(this);
        
        // Add event listeners to prevent scrolling
        window.addEventListener('wheel', this.preventScroll, { passive: false });
        window.addEventListener('touchmove', this.preventScroll, { passive: false });
        window.addEventListener('keydown', this.preventKeyboardScroll, { passive: false });
        
        // Also prevent scrolling via scrollbar
        document.addEventListener('scroll', this.preventScroll, { passive: false });
        
        // Add loading message
        this.showLoadingMessage();
    }

    showLoadingMessage() {
        // Create or update loading message
        let loadingMessage = document.querySelector('.loading-message');
        if (!loadingMessage) {
            loadingMessage = document.createElement('div');
            loadingMessage.className = 'loading-message';
            document.body.appendChild(loadingMessage);
        }
        
        // Show loading message
        GSAP.to(loadingMessage, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    updateLoadingProgress(progress) {
        const loadingBar = document.querySelector('.loading-bar');
        if (loadingBar) {
            loadingBar.style.width = `${progress * 100}%`;
        }
    }

    hideLoadingMessage() {
        const loadingMessage = document.querySelector('.loading-message');
        if (loadingMessage) {
            GSAP.to(loadingMessage, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    loadingMessage.remove();
                }
            });
        }
    }

    preventScroll(e) {
        if (this.isScrollBlocked) {
            e.preventDefault();
            e.stopPropagation();
            
            // Reset scroll position to top
            if (e.type === 'scroll') {
                window.scrollTo(0, 0);
            }
            
            // Show subtle feedback that scrolling is disabled
            this.showScrollBlockedFeedback();
            
            return false;
        }
    }

    showScrollBlockedFeedback() {
        // Throttle feedback to prevent spam
        if (this.feedbackTimeout) return;
        
        this.feedbackTimeout = setTimeout(() => {
            this.feedbackTimeout = null;
        }, 500);
        
        // Shake the loading message slightly
        const loadingMessage = document.querySelector('.loading-message');
        if (loadingMessage) {
            GSAP.to(loadingMessage, {
                x: -5,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 3,
                onComplete: () => {
                    GSAP.set(loadingMessage, { x: 0 });
                }
            });
        }
    }

    preventKeyboardScroll(e) {
        if (this.isScrollBlocked) {
            // Prevent arrow keys, space, page up/down, home, end
            const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
            if (keys.includes(e.keyCode)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
    }

    enableScroll() {
        this.isScrollBlocked = false;
        
        // Remove scroll-disabled class from body and page
        document.body.classList.remove('scroll-disabled');
        const page = document.querySelector('.page');
        if (page) {
            page.classList.remove('scroll-disabled');
        }

        // Remove event listeners
        window.removeEventListener('wheel', this.preventScroll);
        window.removeEventListener('touchmove', this.preventScroll);
        window.removeEventListener('keydown', this.preventKeyboardScroll);
        document.removeEventListener('scroll', this.preventScroll);
        
        // Hide loading message
        this.hideLoadingMessage();
        
        // Add smooth fade-in for scrollable content
        this.animateScrollableContent();
    }

    showScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.classList.add('ready');
            
            // Add pulsing animation to make it more noticeable
            GSAP.to(scrollIndicator, {
                scale: 1.1,
                duration: 1.5,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });
        }
    }

    animateScrollableContent() {
        // Animate page content to indicate it's now scrollable
        const pageWrapper = document.querySelector('.page-wrapper');
        if (pageWrapper) {
            GSAP.fromTo(pageWrapper, 
                { y: 20, opacity: 0.8 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.6,
                    ease: "power2.out" 
                }
            );
        }
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise((resolve) => {
            // Hide white preloader after a small delay to ensure it's visible
            setTimeout(() => {
                this.hideWhitePreloader();
            }, 1000);
            
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1.5, // Slightly longer delay to sync with white preloader
                onComplete: () => {
                    const preloader = document.querySelector(".preloader");
                    if (preloader) {
                        preloader.classList.add("hidden");
                    }
                },
            });
            if (this.device === "desktop") {
                this.timeline
                    .to(this.roomChildren.cube.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    })
                    .to(this.room.position, {
                        x: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            } else {
                this.timeline
                    .to(this.roomChildren.cube.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    })
                    .to(this.room.position, {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            }
            this.timeline
                .to(".intro-text .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                })
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".toggle-bar",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".navigation",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".scroll-indicator",
                    {
                        opacity: 1,
                        delay: 2,
                        duration: 1,
                        onComplete: () => {
                            // Add ready class and pulsing animation
                            this.showScrollIndicator();
                            resolve();
                        },
                    },
                    "same"
                );
        });
    }

    secondIntro() {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
                .to(
                    ".intro-text .animatedis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 0,
                    },
                    "fadeout"
                )
                .to(
                    ".scroll-indicator",
                    {
                        opacity: 0,
                        duration: 0.5,
                    },
                    "fadeout"
                )
                .to(
                    this.room.position,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power1.out",
                    },
                    "same"
                )
                .to(
                    this.roomChildren.cube.rotation,
                    {
                        y: 2 * Math.PI + Math.PI / 4,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.cube.scale,
                    {
                        x: 10,
                        y: 10,
                        z: 10,
                    },
                    "same"
                )
                .to(
                    this.camera.orthographicCamera.position,
                    {
                        y: 6.5,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.cube.position,
                    {
                        x: 0.638711,
                        y: 8.5618,
                        z: 1.3243,
                    },
                    "same"
                )
                .set(this.roomChildren.body.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                })
                .to(
                    this.roomChildren.cube.scale,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 1,
                    },
                    "introtext"
                )
                .to(
                    ".hero-main-title .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".hero-main-description .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".first-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".second-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    this.roomChildren.aquarium.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                )
                .to(
                    this.roomChildren.clock.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.4"
                )
                .to(
                    this.roomChildren.shelves.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.3"
                )
                .to(
                    this.roomChildren.floor_items.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.2"
                )
                .to(
                    this.roomChildren.desks.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(
                    this.roomChildren.table_stuff.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(this.roomChildren.computer.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                })
                .set(this.roomChildren.mini_floor.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                })
                .to(
                    this.roomChildren.chair.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    this.roomChildren.fish.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    this.roomChildren.chair.rotation,
                    {
                        y: 4 * Math.PI + Math.PI / 4,
                        ease: "power2.out",
                        duration: 1,
                    },
                    "chair"
                )
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                    onComplete: () => {
                        // Hide scroll indicator when animation completes
                        const scrollIndicator = document.querySelector('.scroll-indicator');
                        if (scrollIndicator) {
                            GSAP.to(scrollIndicator, {
                                opacity: 0,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }
                        resolve();
                    },
                });
        });
    }

    onScroll(e) {
        if (e.deltaY > 0 && this.moveFlag) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0 && this.moveFlag) {
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.intialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        this.scaleFlag = true;
        this.updateLoadingProgress(0.3); // 30% when starting first intro
        await this.firstIntro();
        this.updateLoadingProgress(0.7); // 70% when first intro completes
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    async playSecondIntro() {
        this.moveFlag = false;
        this.updateLoadingProgress(0.9); // 90% when starting second intro
        await this.secondIntro();
        this.updateLoadingProgress(1.0); // 100% when second intro completes
        this.scaleFlag = false;
        
        // Add a small delay to ensure all 3D animations are complete
        setTimeout(() => {
            // Enable scroll after 3D animation is complete
            this.enableScroll();
            
            this.emit("enablecontrols");
        }, 500); // 500ms delay to ensure smooth transition
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    }

    scale() {
        this.roomChildren.rectLight.width = 0;
        this.roomChildren.rectLight.height = 0;

        if (this.device === "desktop") {
            this.room.scale.set(0.11, 0.11, 0.11);
        } else {
            this.room.scale.set(0.07, 0.07, 0.07);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}
