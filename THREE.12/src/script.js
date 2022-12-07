import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DoubleSide, TextureLoader } from 'three'
import GUI from 'lil-gui'

/* -------------------------------------------------------------------------- */
/*                                    Debug                                   */
/* -------------------------------------------------------------------------- */
const gui = new GUI()
/* -------------------------------------------------------------------------- */
/*                                   Texture                                  */
/* -------------------------------------------------------------------------- */

const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughTexture = textureLoader.load('/textures/door/roughness.jpg')

const matCapTexture = textureLoader.load('/textures/matcaps/3.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
    gradientTexture.minFilter = THREE.NearestFilter
    gradientTexture.magFilter = THREE.NearestFilter
    gradientTexture.generateMipmaps = false

    const environmentMapTexture = cubeTextureLoader.load([
        '/textures/environmentMaps/0/px.jpg',
        '/textures/environmentMaps/0/nx.jpg',
        '/textures/environmentMaps/0/py.jpg',
        '/textures/environmentMaps/0/ny.jpg',
        '/textures/environmentMaps/0/pz.jpg',
        '/textures/environmentMaps/0/nz.jpg'
    ])
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/* -------------------------------------------------------------------------- */
/*                                    Scene                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   Objects                                  */
/* -------------------------------------------------------------------------- */
// const material = new THREE.MeshBasicMaterial()
//     material.map = doorColorTexture
//     material.color = new THREE.Color(0xFFFF)
//     material.wireframe = false
//     material.opacity = 0.5
//     material.transparent = true
//     material.alphaMap = doorAlphaTexture
//     material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial
//  material.side = THREE.DoubleSide
//  material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matCapTexture
// material.side = DoubleSide

//  const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 99
// material.specular = new THREE.Color(0xFF)

// const material = new THREE.MeshToonMaterial()
//     material.map = gradientTexture

const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7
    material.roughness = 0.2
    material.envMap = environmentMapTexture

     material.side = DoubleSide
    // material.wireframe = false
    // material.map = doorColorTexture
    // material.aoMap = doorAmbientTexture
    // material.aoMapIntensity = 2
    // material.displacementMap = doorHeightTexture
    // material.displacementScale = 0.05
    // material.metalnessMap = doorMetalTexture
    // material.roughnessMap = doorRoughTexture
    // material.normalMap = doorNormalTexture
    // material.normalScale.set(0.5, 0.5)
    // material.transparent = true
    // material.alphaMap = doorAlphaTexture
    

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'wireframe')
gui.add(material, 'side')
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
/* ------------------------------ aoMap Sphere ------------------------------ */
sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
    )
/* ------------------------------ aoMap Sphere ------------------------------ */
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100), 
    material
)
/* ---------------------------------- aoMap --------------------------------- */
plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
    )
/* ---------------------------------- aoMap --------------------------------- */

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
/* ---------------------------------- aoMap --------------------------------- */
torus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)
/* ---------------------------------- aoMap --------------------------------- */
torus.position.x = 1.5



scene.add(sphere, plane, torus)

/* -------------------------------------------------------------------------- */
/*                                   Objects                                  */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                  Lighting                                  */
/* -------------------------------------------------------------------------- */
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xFFFFFF, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update Object
    sphere.rotation.x = 0.5 * elapsedTime
    sphere.rotation.y = -0.5 * elapsedTime
    sphere.rotation.z = 0.5 * elapsedTime
   
    torus.rotation.x = 0.5 * elapsedTime
    torus.rotation.y = 0.5 * elapsedTime
    torus.rotation.z = 0.5 * elapsedTime

    plane.rotation.x = -0.5 * elapsedTime
    plane.rotation.y = -0.5 * elapsedTime
    plane.rotation.z = -0.5 * elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()