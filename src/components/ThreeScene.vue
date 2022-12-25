<template>
  <div ref="threejs-container"></div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "ThreeScene",

  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,

      cube: null,
    };
  },

  created() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
  },

  mounted() {
    const topbarHeight = document.getElementById("main-topbar").clientHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight - topbarHeight);

    this.$refs["threejs-container"].appendChild(this.renderer.domElement);

    this.loadScene();
  },

  methods: {
    loadScene() {
      this.cube = this.loadCube();

      this.camera.position.z = 5;

      this.animate();
    },

    loadCube() {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);

      this.scene.add(cube);

      return cube;
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);

      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
    },
  },
};
</script>
