import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffe6a2,
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.3;
        this.plane.receiveShadow = true;
    }

    setCircles() {
        const geometry = new THREE.CircleGeometry(5, 64);
        this.material1 = new THREE.MeshStandardMaterial({ color: 0xe5a1aa });
        this.material2 = new THREE.MeshStandardMaterial({ color: 0x8395cd });
        this.material3 = new THREE.MeshStandardMaterial({ color: 0x7ad0ac });

        this.circleFirst = new THREE.Mesh(geometry, this.material1);
        this.circleSecond = new THREE.Mesh(geometry, this.material2);
        this.circleThird = new THREE.Mesh(geometry, this.material3);

        this.circleFirst.position.y = -0.29;

        this.circleSecond.position.y = -0.28;
        this.circleSecond.position.x = 2;

        this.circleThird.position.y = -0.27;

        this.circleFirst.scale.set(0, 0, 0);
        this.circleSecond.scale.set(0, 0, 0);
        this.circleThird.scale.set(0, 0, 0);

        this.circleFirst.rotation.x =
            this.circleSecond.rotation.x =
            this.circleThird.rotation.x =
                -Math.PI / 2;

        this.circleFirst.receiveShadow =
            this.circleSecond.receiveShadow =
            this.circleThird.receiveShadow =
                true;

        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);
    }

    switchTheme(theme) {
        if (theme === "dark") {
            // Adjust floor material for dark theme
            this.material.color.setHex(0x2a2a2a);
            
            // Adjust circle materials for dark theme
            this.material1.color.setHex(0xe5a1aa);
            this.material2.color.setHex(0x8395cd);
            this.material3.color.setHex(0x7ad0ac);
        } else {
            // Reset to light theme
            this.material.color.setHex(0xffe6a2);
            
            // Reset circle materials
            this.material1.color.setHex(0xe5a1aa);
            this.material2.color.setHex(0x8395cd);
            this.material3.color.setHex(0x7ad0ac);
        }
    }

    resize() {}

    update() {}
}
