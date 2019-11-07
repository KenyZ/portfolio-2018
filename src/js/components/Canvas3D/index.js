import React from 'react';
import * as THREE from 'three';

import noise from './vendors/perlin.js'
import EventBus from '../../helpers/EventBus.js';

import TweenLite from 'gsap/TweenLite'
import Globals from '../../helpers/Globals.js';

const utils = {
    w(){ return window.innerWidth },
    h(){ return window.innerHeight },
    getLight(color, intensity, dist){
        let bulb = new THREE.Mesh(
            new THREE.SphereBufferGeometry(6),
            new THREE.MeshBasicMaterial({color})
        )
        let light = new THREE.PointLight(color, intensity, dist)
        bulb.add(light)
        return bulb
    }
}

export default class Canvas3d extends React.Component{

    constructor(props){
        super(props)
        this.state = {}
    }

    componentWillUnmount(){
        // this.state.self.unbindEvents()
    }
    
    componentWillMount(){

        const positions = {
            home: [-45, 75, -80],
            about: [0, 19, 100]
        }

        let self = {}

        this.setState({
            self
        })

        self.createRender = function(){
            self.renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('canvas3d')
            })
            self.renderer.setSize(utils.w(), utils.h())
        }

        self.builder = function(){
        
            self.scene = new THREE.Scene()
            self.camera = new THREE.PerspectiveCamera(45, utils.w() / utils.h(), .1, 200)

            // let controls = new OrbitControls(self.camera, self.renderer.domElement)
        }

        self.mouse = {}
        self.movingCameraOffset = {}
        self.listeners = {}

        self.listeners.onResize = function onResize(){
            self.renderer.setSize(utils.w(), utils.h())
            self.camera.aspect = utils.w() / utils.h();
            self.camera.updateProjectionMatrix();
        }

        self.listeners.onMousemove = function onMousemove(e){
            self.mouse.x = (e.clientX * 2 - window.innerWidth) / window.innerWidth
            self.mouse.y = (e.clientY * -2 + window.innerHeight) / window.innerHeight

            self.movingCameraOffset.x = self.mouse.x * 10
            self.movingCameraOffset.y = self.mouse.y * 10

            TweenLite.to(self.cameraTarget.position, .3, {
                x: self.cameraTarget.userData.currentOrigin.x + self.movingCameraOffset.x,
                y: self.cameraTarget.userData.currentOrigin.y + self.movingCameraOffset.y
            })
            // self.cameraTarget.position.y = self.cameraTarget.userData.currentOrigin.y + self.movingCameraOffset.y
            // self.cameraTarget.position.x = self.cameraTarget.userData.currentOrigin.x + self.movingCameraOffset.x
        }

        self.unbindEvents = function(){
            window.removeEventListener('resize', self.listeners.onResize, false)
            window.removeEventListener('mousemove', self.listeners.onMousemove, false)
        }

        self.bindEvents = function(){

            self.listeners.onResize()
            
            window.addEventListener('resize', self.listeners.onResize, false)
            window.addEventListener('mousemove', self.listeners.onMousemove, false)
        }

        let floor = null

        noise.seed(.4)
        const offsetY = 15
        const speed = .001
        const details = .045

        self.updateFloor = function(forceUpdate = true){

            let position = self.floorGeo.attributes.position
            let count = position.count
            let array = position.array

            for(let i = 0; i < count; i++){

                let time = Date.now()

                let j = i * 3

                let verticeX = array[j + 0]
                let verticeY = array[j + 1]
                // let verticeZ = array[j + 2]

                array[j + 2] = noise.perlin3(verticeX * details, verticeY * details, time * speed) * offsetY
                
            }

            if(forceUpdate) position.needsUpdate = true
        }

        self.setScene = function(){

            const floorSize = 300
            const floorDetail = 35
    
            self.camera.position.set(...positions['home'])
            self.camera.userData.defaultPosition = self.camera.position.clone()
    
            self.cameraTarget = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshStandardMaterial({color: 'red'})
            )

            self.cameraTarget.visible = false //

            self.cameraTarget.userData.defaultPosition = self.cameraTarget.position.clone()
            self.cameraTarget.userData.currentOrigin = self.cameraTarget.position.clone()
            self.scene.add(self.cameraTarget)

            self.floorGeo = new THREE.PlaneBufferGeometry(floorSize, floorSize, floorDetail, floorDetail)

            self.updateFloor(false)
            
            floor = new THREE.Mesh(
                self.floorGeo,
                new THREE.MeshPhongMaterial({color: '#fff', flatShading: false, side: THREE.DoubleSide})
            )
            floor.rotation.x = Math.PI * -.5
            self.scene.add(floor)

            // let textGeometry
            // let textMaterial = new THREE.MeshBasicMaterial({
            //     color: 'blue'
            // })
            // let text
            // let textParameter = {
            //     font,
            //     size: 8,
            //     height: .3
            // }
            // let loader = new THREE.FontLoader()

            // loader.load('http://localhost:3000/fonts/Montserrat_Regular.json', function(font){
            //     textGeometry = new THREE.TextGeometry('Sound\nExperiment', textParameter)
            //     textGeometry.computeBoundingBox()
            //     let bbox = textGeometry.boundingBox
            //     let distance = bbox.min.distanceTo(bbox.max)
            //     console.log(distance)

            //     text = new THREE.Mesh(textGeometry, textMaterial)
            //     text.rotation.x = -Math.PI * .5
            //     text.rotation.z = Math.PI
            //     text.position.set(distance * .2, distance * .2, distance * -.2)
            //     self.scene.add(text)

            // })


            // LIGTHS

            let directional = new THREE.DirectionalLight('#fff', .4)
            self.scene.add(directional)
            let ambient = new THREE.AmbientLight('#fff', .4)
            self.scene.add(ambient)

            let point1 = new THREE.PointLight('blue', .1, floorSize * .8)
            point1.position.setY(floorSize * .5)
            self.scene.add(point1)

            let point2 = new THREE.PointLight('blue', 1, 250 * 2)
            point2.position.y = -250
            point2.position.x += 250 * .2
            point2.position.z += 250 * .2
            
            self.scene.add(point2)


            // FOG

            self.scene.fog = new THREE.Fog(0x000000, .1, 150)


            self.cubes = []
            for(let i = 0; i < 5; i++){

                let rand = (1 - (i / 5)) * 12 + 6

                let item = new THREE.Mesh(
                    new THREE.BoxGeometry(rand, rand, rand),
                    new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        side: THREE.DoubleSide
                    })
                )
                item.rotation.x = Math.random() * Math.PI * 2
                item.rotation.z = Math.random() * Math.PI * 2

                item.position.y = - 50 * (i + 1)
                self.scene.add(item)

                self.cubes.push(item)
            }
        }

        self.updateRender = function(){
        
            requestAnimationFrame(self.updateRender)
            self.animate()
            self.renderer.render(self.scene, self.camera)
        }

        self.animate = function(){

            self.camera.lookAt(self.cameraTarget.position)
            self.updateFloor(true)

            for(let i = 0; i < self.cubes.length; i++){
                let cube = self.cubes[i]
                cube.rotation.x += .0035
                cube.rotation.y += .0035
            }

        }

        self.scrollCamera = function({scrollValue}){

            const distance = 200

            const offsetY = scrollValue * -distance

            const from1 = self.camera.position.y
            const from2 = self.cameraTarget.position.y

            let defaultCamera = self.camera.userData.defaultPosition.y
            let defaultCameraTarget = self.cameraTarget.userData.defaultPosition.y

            let newCamera = defaultCamera + offsetY
            let newCameraTarget = defaultCameraTarget + offsetY

            // let progress = {value : 0}

            // TweenLite.to(progress, .1, {
            //     value: 1,
            
            //     onUpdate(){

            //         let fromTo1 = newCamera - self.camera.position.y
            //         let fromTo2 = newCameraTarget - self.cameraTarget.position.y

            //         self.camera.position.setY(from1 + fromTo1 * progress.value)
            //         self.cameraTarget.position.setY(from2 + fromTo2 * progress.value)
            //     }
            // })


            let fromTo1 = newCamera - self.camera.position.y
            let fromTo2 = newCameraTarget - self.cameraTarget.position.y


            self.camera.position.setY(from1 + fromTo1)
            self.cameraTarget.position.setY(from2 + fromTo2)

            self.cameraTarget.userData.currentOrigin = self.cameraTarget.position.clone()

            
        }

        self.start = function(){
            requestAnimationFrame(self.updateRender)
        }
        
        self.goAbout = function(){
            TweenLite.to(self.camera.position, 2, {
                x: positions['about'][0],
                y: positions['about'][1],
                z: positions['about'][2],

                onComplete(){
                    self.camera.userData.defaultPosition = self.camera.position.clone()
                }
            })
        }

        self.goHome = function(){
            
            TweenLite.to(self.camera.position, 2, {
                x: positions['home'][0],
                y: positions['home'][1],
                z: positions['home'][2],

                onComplete(){
                    self.camera.userData.defaultPosition = self.camera.position.clone()
                }
            })

            TweenLite.to(self.cameraTarget.position, 2, {
                x: 0,
                y: 0,
                z: 0,

                onUpdate(){
                    self.cameraTarget.userData.defaultPosition = self.cameraTarget.position.clone()
                    self.cameraTarget.userData.currentOrigin = self.cameraTarget.position.clone()
                }
            })
        }
        
        self.builder()
        self.setScene()

        EventBus.addEventListener('scrolling', self.scrollCamera)

        // Constants.globals.setCanvasForAbout = function(){
        //     self.camera.position.set(0, 17, 70)
        //     self.camera.userData.defaultPosition = self.camera.position.clone()
        // }
    }

    componentDidMount(){
        this.state.self.createRender()
        this.state.self.bindEvents()
        this.state.self.start()
        Globals.Canvas3d = this
    }

    render(){
        return(
            <div className="canvas3d-wrapper" id="canvas3d-wrapper">
                <canvas id="canvas3d"></canvas>
            </div>
        )
    }
}