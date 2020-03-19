console.log('main.js loaded')

const camera = new Camera()
let controls

function setup(){
	tick()
}

function tick(){
	camera.update()
	console.log(camera.lastTime > controls.getLastTime())
	if(camera.lastTime > controls.getLastTime()){
		updateTransformCam(camera.getInvMatrix())
	}else{
		console.log('false!')
		updateTransform(...controls.getAllSliderValues())
	}

	render()
	requestAnimationFrame(tick)
}



window.addEventListener('load',e=>{
	controls = createControls() 
	setup()
})