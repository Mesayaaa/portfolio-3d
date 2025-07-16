import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Theme from "./Theme.js";
import Renderer from "./Renderer.js";
import Preloader from "./Preloader.js";

import World from "./World/World.js";
import Controls from "./World/Controls.js";

export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        this.preloader.on("enablecontrols", () => {
            this.controls = new Controls();
        });

        this.sizes.on("resize", () => {
            this.resize();
        });
        this.time.on("update", () => {
            this.update();
        });
        
        // Initialize theme after all components are loaded
        this.initializeTheme();
    }

    initializeTheme() {
        // Apply initial theme to 3D scene
        this.theme.on("switch", (theme) => {
            this.handleThemeSwitch(theme);
        });
        
        // Apply current theme immediately
        this.handleThemeSwitch(this.theme.getCurrentTheme());
    }

    handleThemeSwitch(theme) {
        console.log(`🌙 Theme switching to: ${theme}`);
        
        // Update scene background
        if (this.scene) {
            const bgColor = theme === 'dark' ? 0x1a1a1a : 0xFAF4E5;
            this.scene.background = new THREE.Color(bgColor);
            console.log(`🎨 Scene background updated to: ${bgColor.toString(16)}`);
        }

        // Update renderer clear color using the new method
        if (this.renderer && this.renderer.renderer) {
            const clearColor = theme === 'dark' ? 0x1a1a1a : 0xFAF4E5;
            this.renderer.updateBackgroundColor(clearColor);
            console.log(`🖥️ Renderer clear color updated to: ${clearColor.toString(16)}`);
        }

        // Update canvas style background as backup
        if (this.canvas) {
            this.canvas.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#FAF4E5';
            console.log(`🎯 Canvas style background updated`);
        }
        
        // Update world environment lighting
        if (this.world && this.world.environment) {
            this.world.environment.switchTheme(theme);
            console.log(`💡 Environment lighting updated`);
        }
        
        // Force canvas visibility
        const experienceDiv = document.querySelector('.experience');
        if (experienceDiv) {
            experienceDiv.style.visibility = 'visible';
            experienceDiv.style.opacity = '1';
            experienceDiv.style.display = 'block';
            console.log(`👁️ Experience container visibility forced`);
        }
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

    update() {
        this.preloader.update();
        this.camera.update();
        this.world.update();
        this.renderer.update();
        if (this.controls) {
            this.controls.update();
        }
    }
}
