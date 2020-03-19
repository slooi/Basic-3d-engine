
class Camera{
	constructor(){
		this.x = 0
		this.y = 0
		this.z = -300
		this.xRot = 0
		this.yRot = 0
		// this.zRot = 0
		this.speed = 3
		this.shiftModifier = 2
		this.angleSpeed = 3
		this.lastTime = new Date(0, 0, 0)

		this.keyDown = {
			w: false,
			s: false,
			a: false,
			d: false,
			q: false,
			e: false,
			shift: false,
			arrowup: false,
			arrowdown: false,
			arrowleft: false,
			arrowright: false
		}
		
		document.addEventListener('keydown',e=>{
			this.processKey(e,true)
		})
		document.addEventListener('keyup',e=>{
			this.processKey(e,false)
		})
	}

	getInvMatrix(){
		let transform = m4.identity()
		transform = m4.translate(transform,this.x,this.y,this.z)
		transform = m4.yRotate(transform,this.yRot)	// WHY DOES ORDER MATTER
		transform = m4.xRotate(transform,this.xRot)
		transform = m4.inverse(transform)
		return transform
	}

	processKey(e,keyDown){
		// process keydown/keyup events
		const key = e.key.toLowerCase()
		if(this.keyDown[key] !== undefined){
			// if valid key
			this.keyDown[key] = keyDown
		} 
	}

	// updateOccurred(){
	// 	const invCam = this.getInvMatrix()
	// 	updateTransformCam(invCam)
	// }

	update(){
		let speed = this.speed 
		if(this.keyDown.shift)
			speed=speed*this.shiftModifier

		// update camera values
		if(this.keyDown.w){
			this.z += Math.cos(this.yRot*Math.PI/180) * speed
			this.x += Math.sin(this.yRot*Math.PI/180) * speed 
			this.lastTime = new Date()
		}
		if(this.keyDown.s){
			this.z -= Math.cos(this.yRot*Math.PI/180) * speed
			this.x -= Math.sin(this.yRot*Math.PI/180) * speed 
			this.lastTime = new Date()
		}
		if(this.keyDown.a){
			this.z += Math.sin(this.yRot*Math.PI/180) * speed
			this.x -= Math.cos(this.yRot*Math.PI/180) * speed 
			this.lastTime = new Date()
		}
		if(this.keyDown.d){
			this.z -= Math.sin(this.yRot*Math.PI/180) * speed
			this.x += Math.cos(this.yRot*Math.PI/180) * speed 
			this.lastTime = new Date()
		}
		if(this.keyDown.q){
			this.y -= speed
			this.lastTime = new Date()
		}
		if(this.keyDown.e){
			this.y += speed
			this.lastTime = new Date()
		}
		if(this.keyDown.arrowright){
			this.yRot += this.angleSpeed
			this.lastTime = new Date()
		}
		if(this.keyDown.arrowleft){
			this.yRot -= this.angleSpeed
			this.lastTime = new Date()
		}
		if(this.keyDown.arrowup){
			this.xRot -= this.angleSpeed
			this.lastTime = new Date()
		}
		if(this.keyDown.arrowdown){
			this.xRot += this.angleSpeed
			this.lastTime = new Date()
		}
	}
}
