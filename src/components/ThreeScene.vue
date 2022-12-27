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

      renderedElements: {
        mesh: [],
        line: [],
      },
    };
  },

  created() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      500
    );

    this.renderer = new THREE.WebGLRenderer();
  },

  mounted() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.$refs["threejs-container"].appendChild(this.renderer.domElement);

    this.loadScene();
  },

  methods: {
    loadScene() {
      this.renderedElements.mesh.push(this.loadCube());
      this.renderedElements.line.push(this.loadLine());

      this.camera.position.set(0, 0, 10);
      this.camera.lookAt(0, 0, 0);

      this.animate();
    },

    loadCube() {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);

      this.scene.add(cube);

      return cube;
    },

    loadLine() {
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

      const points = [];
      points.push(new THREE.Vector3(-10, 0, 0));
      points.push(new THREE.Vector3(0, 10, 0));
      points.push(new THREE.Vector3(10, 0, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const cube = new THREE.Line(geometry, material);

      this.scene.add(cube);

      return cube;
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);

      if (this.renderedElements.mesh.length) {
        this.renderedElements.mesh[0].rotation.x += 0.01;
        this.renderedElements.mesh[0].rotation.y += 0.01;
      }
    },
  },
};
</script>
