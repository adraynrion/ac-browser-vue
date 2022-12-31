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

      renderedElements: [],
      spread: 15,
    }
  },

  created() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xaaaaaa)

    this.camera = new THREE.PerspectiveCamera(
      40, // fov
      window.innerWidth / window.innerHeight, // aspect
      0.1, // near
      1000 // far
    )
    this.camera.position.set(0, 0, 120)
    this.camera.lookAt(0, 0, 0)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  },

  mounted() {
    this.$refs['threejs-container'].appendChild(this.renderer.domElement)

    this.loadScene()
  },

  methods: {
    loadScene() {
      this.loadLights()

      {
        const width = 8
        const height = 8
        const depth = 8
        this.addSolidGeometry(-2, 2, new THREE.BoxGeometry(width, height, depth))
      }
      {
        const radius = 7
        const segments = 24
        this.addSolidGeometry(-1, 2, new THREE.CircleGeometry(radius, segments))
      }
      {
        const radius = 6
        const height = 8
        const segments = 16
        this.addSolidGeometry(0, 2, new THREE.ConeGeometry(radius, height, segments))
      }
      {
        const radiusTop = 4
        const radiusBottom = 4
        const height = 8
        const radialSegments = 12
        this.addSolidGeometry(1, 2, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments))
      }
      {
        const radius = 7
        this.addSolidGeometry(2, 2, new THREE.DodecahedronGeometry(radius))
      }
      {
        const shape = new THREE.Shape()
        const x = -2.5
        const y = -5
        shape.moveTo(x + 2.5, y + 2.5)
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5)
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5)
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)

        const extrudeSettings = {
          steps: 2,
          depth: 2,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 1,
          bevelSegments: 2,
        }

        this.addSolidGeometry(-2, 1, new THREE.ExtrudeGeometry(shape, extrudeSettings))
      }
      {
        const radius = 7
        this.addSolidGeometry(-1, 1, new THREE.IcosahedronGeometry(radius))
      }
      {
        const points = []
        for (let i = 0; i < 10; ++i) {
          points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8))
        }
        this.addSolidGeometry(0, 1, new THREE.LatheGeometry(points))
      }
      {
        const radius = 7
        this.addSolidGeometry(1, 1, new THREE.OctahedronGeometry(radius))
      }
      {
        const width = 9
        const height = 9
        const widthSegments = 2
        const heightSegments = 2
        this.addSolidGeometry(-2, 0, new THREE.PlaneGeometry(width, height, widthSegments, heightSegments))
      }
      {
        // eslint-disable-next-line prettier/prettier
        const verticesOfCube = [
          -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
          -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
        ]
        const indicesOfFaces = [
          // eslint-disable-next-line prettier/prettier
          2, 1, 0,    0, 3, 2,
          0, 4, 7,    7, 3, 0,
          0, 1, 5,    5, 4, 0,
          1, 2, 6,    6, 5, 1,
          2, 3, 7,    7, 6, 2,
          4, 5, 6,    6, 7, 4,
        ]
        const radius = 7
        const detail = 2
        this.addSolidGeometry(-1, 0, new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, radius, detail))
      }
      {
        const innerRadius = 2
        const outerRadius = 7
        const segments = 18
        this.addSolidGeometry(0, 0, new THREE.RingGeometry(innerRadius, outerRadius, segments))
      }
      {
        const shape = new THREE.Shape()
        const x = -2.5
        const y = -5
        shape.moveTo(x + 2.5, y + 2.5)
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5)
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5)
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)
        this.addSolidGeometry(1, 0, new THREE.ShapeGeometry(shape))
      }
      {
        const radius = 7
        const widthSegments = 12
        const heightSegments = 8
        this.addSolidGeometry(2, 0, new THREE.SphereGeometry(radius, widthSegments, heightSegments))
      }
      {
        const radius = 7
        this.addSolidGeometry(-2, -1, new THREE.TetrahedronGeometry(radius))
      }
      {
        const radius = 5
        const tubeRadius = 2
        const radialSegments = 8
        const tubularSegments = 24
        this.addSolidGeometry(0, -1, new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments))
      }
      {
        const radius = 3.5
        const tube = 1.5
        const radialSegments = 8
        const tubularSegments = 64
        const p = 2
        const q = 3
        this.addSolidGeometry(1, -1, new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q))
      }
      {
        class CustomSinCurve extends THREE.Curve {
          constructor(scale) {
            super()
            this.scale = scale
          }
          getPoint(t) {
            const tx = t * 3 - 1.5
            const ty = Math.sin(2 * Math.PI * t)
            const tz = 0
            return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale)
          }
        }

        const path = new CustomSinCurve(4)
        const tubularSegments = 20
        const radius = 1
        const radialSegments = 8
        const closed = false
        this.addSolidGeometry(2, -1, new THREE.TubeGeometry(path, tubularSegments, radius, radialSegments, closed))
      }
      {
        const width = 8
        const height = 8
        const depth = 8
        const thresholdAngle = 15
        this.addLineGeometry(
          -1,
          -2,
          new THREE.EdgesGeometry(new THREE.BoxGeometry(width, height, depth), thresholdAngle)
        )
      }
      {
        const width = 8
        const height = 8
        const depth = 8
        this.addLineGeometry(1, -2, new THREE.WireframeGeometry(new THREE.BoxGeometry(width, height, depth)))
      }

      this.animate()
    },

    loadLights() {
      const color = 0xffffff
      const intensity = 1

      const lightA = new THREE.DirectionalLight(color, intensity)
      lightA.position.set(-1, 2, 4)
      this.scene.add(lightA)

      const lightB = new THREE.DirectionalLight(color, intensity)
      lightB.position.set(1, -2, -4)
      this.scene.add(lightB)
    },

    addSolidGeometry(x, y, geometry) {
      const mesh = new THREE.Mesh(geometry, this.createMaterial())
      this.addObject(x, y, mesh)
    },

    addLineGeometry(x, y, geometry) {
      const material = new THREE.LineBasicMaterial({ color: 0x000000 })
      const mesh = new THREE.LineSegments(geometry, material)
      this.addObject(x, y, mesh)
    },

    addObject(x, y, obj) {
      obj.position.x = x * this.spread
      obj.position.y = y * this.spread

      this.scene.add(obj)
      this.renderedElements.push(obj)
    },

    createMaterial() {
      const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
      })

      const hue = Math.random()
      const saturation = 1
      const luminance = 0.5
      material.color.setHSL(hue, saturation, luminance)

      return material
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

      // Rotate objects
      this.renderedElements.forEach((m, i) => {
        const speed = 0.5 + i * 0.01
        const rot = time * speed

        m.rotation.x = rot
        m.rotation.y = rot
      })

      this.renderer.render(this.scene, this.camera)

      requestAnimationFrame(this.animate)
    },
  },
}
</script>
