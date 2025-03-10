import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.155.0/examples/jsm/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', () => {

    // Carousel script
    const carouselInner = document.querySelector('.carousel-inner');
    if(carouselInner){
        let counter = 0;
        const carouselItems = document.querySelectorAll('.carousel-item');
        setInterval(() => {
            counter++;
            if (counter >= carouselItems.length) {
                counter = 0;
            }
            carouselInner.style.transform = `translateX(-${counter * 100}%)`;
        }, 3000);
    }

    //ThreeJS Script.
    const canvasContainer = document.getElementById('canvas-container');
    if(canvasContainer){
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(300, 300);
        canvasContainer.appendChild(renderer.domElement);

        const loader = new GLTFLoader();

        loader.load('https://raw.githubusercontent.com/baronwatts/models/master/tomato.glb', function (gltf) {
            const tomato = gltf.scene;
            scene.add(tomato);
            tomato.scale.set(0.5, 0.5, 0.5);
            camera.position.z = 3;

            const animate = function () {
                requestAnimationFrame(animate);
                tomato.rotation.y += 0.01;
                renderer.render(scene, camera);
            };

            animate();
        });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
    }
});
