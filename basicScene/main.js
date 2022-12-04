import '/style.css'
import * as THREE from 'three'

/*
    A basic scene consists of 4 important elements:
    1. Scene    -is like a container where you put all elements to your set.
    2. Object   -your 3D object e.g. a cube or imported custom 3d models.
    3. Camera   -a set requires a camera in order to showcase your object.
    4. Renderer -renders all your added elements.
*/

// Native Javascript:
const canvas = document.querySelector('canvas.webgl')
/*
    With  (querySelector), we accessing through JS the HTML document.
    The <canvas class="webgl"> element will show us the first scene.
*/

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh) // This is a method

/*
    Sizes & Camera
*/
// Sizes
const sizes = { //This is an object.
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 3)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)  // This is a method
renderer.render(scene, camera)  // This is a method
