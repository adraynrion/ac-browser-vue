<template>
  <div ref="threejs-container"></div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'ThreeScene',

  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,

      renderedElements: {
        mesh: [],
        line: [],
        light: [],
      },
    }
  },

  created() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75, // fov
      window.innerWidth / window.innerHeight, // aspect
      1, // near
      20 // far
    )

    this.renderer = new THREE.WebGLRenderer()
  },

  mounted() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.$refs['threejs-container'].appendChild(this.renderer.domElement)

    this.loadScene()
  },

  methods: {
    loadScene() {
      this.renderedElements.light.push(this.loadLight())

      const boxWidth = 1,
        boxHeight = 1,
        boxDepth = 1
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
      this.renderedElements.mesh.push(this.loadCube(geometry, 0x44aa88, 0))
      this.renderedElements.mesh.push(this.loadCube(geometry, 0x8844aa, -2))
      this.renderedElements.mesh.push(this.loadCube(geometry, 0xaa8844, 2))
      // this.renderedElements.line.push(this.loadLine());

      this.camera.position.set(0, 0, 2)
      this.camera.lookAt(0, 0, 0)

      this.animate()
    },

    loadCube(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({ color })
      const cube = new THREE.Mesh(geometry, material)

      this.scene.add(cube)

      cube.position.x = x

      return cube
    },

    loadLine() {
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff })

      const points = []
      points.push(new THREE.Vector3(-10, 0, 0))
      points.push(new THREE.Vector3(0, 10, 0))
      points.push(new THREE.Vector3(10, 0, 0))
      const geometry = new THREE.BufferGeometry().setFromPoints(points)

      const cube = new THREE.Line(geometry, material)

      this.scene.add(cube)

      return cube
    },

    loadLight() {
      const color = 0xffffff
      const intensity = 1
      const light = new THREE.DirectionalLight(color, intensity)

      light.position.set(-1, 2, 4)

      this.scene.add(light)

      return light
    },

    resizeRendererToDisplaySize() {
      const canvas = this.renderer.domElement
      const pixelRatio = window.devicePixelRatio

      const width = (canvas.clientWidth * pixelRatio) | 0
      const height = (canvas.clientHeight * pixelRatio) | 0
      const needResize = canvas.width !== width || canvas.height !== height

      if (needResize) this.renderer.setSize(width, height, false)

      return needResize
    },

    animate(time) {
      time *= 0.001

      // Remove distorsion of Mesh elements (if resize occured)
      if (this.resizeRendererToDisplaySize()) {
        const canvas = this.renderer.domElement
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
      }

      // Rotate cubes
      if (this.renderedElements.mesh.length) {
        this.renderedElements.mesh.forEach((m, i) => {
          const speed = 1 + i * 0.1
          const rot = time * speed

          m.rotation.x = rot
          m.rotation.y = rot
        })
      }

      this.renderer.render(this.scene, this.camera)

      requestAnimationFrame(this.animate)
    },
  },
}
</script>
