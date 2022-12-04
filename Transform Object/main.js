import './style.css'
import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()





// Object
const geometry = new THREE.BoxGeometry(1.5, 1, 1) 
//X(-Left or +Right), Y(Height),  Z(-Back and + Forward)
/*
    Scaling belongs to Vector3. By default, x, y and z are equal to 1, meaning that the object has no scaling applied. If you put 0.5 as a value, the object will be half of its size on this axis, and if you put 2 as a value, it will be twice its original size on this axis.
*/
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
/*
    In order to change the position of the object we need to use method.
*/
    mesh.position.set(0, 0, -3)
     //X(-Left or +Right), Y(Heigh),  Z(-Back and + Forward)
/*
    The position property is not any object. It's an instance of the Vector3 class. While this class has an x, a y, and a z property, it also has many useful methods.
*/
/*
    This method can also be used to scale an object.
*/

    mesh.scale.x = 2
    mesh.scale.y = 0.25
    mesh.scale.z = 0.5 

/*
    The rotation property also has x, y, and z properties, but instead of a Vector3, it's a Euler. When you change the x, y, and z properties of a Euler, you can imagine putting a stick through your object's center in the axis's direction and then rotating that object on that stick.

    If you spin on the y axis, you can picture it like a carousel.
    If you spin on the x axis, you can imagine that you are rotating the wheels of a car you'd be in.
    And if you rotate on the z axis, you can imagine that you are rotating the propellers in front of an aircraft you'd be in.

    The value of these axes is expressed in radians. If you want to achieve half a rotation, you'll have to write something like 3.14159... You probably recognize that number as π. In native JavaScript, you can end up with an approximation of π using Math.PI.

    Comment the scale and add an eighth of a complete rotation in both x and y axes:
*/

    mesh.rotation.x = Math.PI * 0.25
    mesh.rotation.y = Math.PI * 0.25

scene.add(mesh) 

// Axes Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)





// Sizes
const sizes = { 
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1, 1, 3) 
scene.add(camera)
/*
    To find out the distance between camera and object.
*/
console.log(mesh.position.distanceTo(camera.position))
/*
We can also use any existing Vector3 such as the mesh's position, but that will result in the default camera position because our mesh is in the center of the scene.
*/
camera.lookAt(mesh.position)
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)  
renderer.render(scene, camera)  
