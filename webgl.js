console.log('loaded webgl.js')
const qwe = 1
const m4 = {
	identity: function(){
		return [
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			0,0,0,1
		]
	},
	perspective: function(degrees,aspect,zNear,zFar){
		const fov = degrees * Math.PI / 180
		const invDis = 1/(zNear-zFar)
		const f = Math.tan((Math.PI-fov)*0.5)
		return [
			f/aspect,0,0,0,
			0,f,0,0,
			0,0,-(zNear+zFar)*invDis,1,
			0,0,2*zFar*zNear*invDis,0
		]
	},
	orthographic: function(width,height,depth){
		return [
			2/width,0,0,0,
			0,2/height,0,0,
			0,0,2/depth,0,
			0,0,0,1
		]
	},
	multiply: function(a,b){
		a00 = a[0 * 4 + 0]
		a01 = a[0 * 4 + 1]
		a02 = a[0 * 4 + 2]
		a03 = a[0 * 4 + 3]
		a10 = a[1 * 4 + 0]
		a11 = a[1 * 4 + 1]
		a12 = a[1 * 4 + 2]
		a13 = a[1 * 4 + 3]
		a20 = a[2 * 4 + 0]
		a21 = a[2 * 4 + 1]
		a22 = a[2 * 4 + 2]
		a23 = a[2 * 4 + 3]
		a30 = a[3 * 4 + 0]
		a31 = a[3 * 4 + 1]
		a32 = a[3 * 4 + 2]
		a33 = a[3 * 4 + 3]
		
		b00 = b[0 * 4 + 0]
		b01 = b[0 * 4 + 1]
		b02 = b[0 * 4 + 2]
		b03 = b[0 * 4 + 3]
		b10 = b[1 * 4 + 0]
		b11 = b[1 * 4 + 1]
		b12 = b[1 * 4 + 2]
		b13 = b[1 * 4 + 3]
		b20 = b[2 * 4 + 0]
		b21 = b[2 * 4 + 1]
		b22 = b[2 * 4 + 2]
		b23 = b[2 * 4 + 3]
		b30 = b[3 * 4 + 0]
		b31 = b[3 * 4 + 1]
		b32 = b[3 * 4 + 2]
		b33 = b[3 * 4 + 3]
		
		return [
			a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
			a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
			a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
			a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
			a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
			a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
			a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
			a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
			a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
			a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
			a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
			a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
			a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
			a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
			a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
			a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33,
		]
	},
	scaling: function(sx,sy,sz){
		return [
			sx,0,0,0,
			0,sy,0,0,
			0,0,sz,0,
			0,0,0,1
		]
	},
	zRotation: function(degrees){
		const radians = Math.PI * degrees/180
		const c = Math.cos(radians)
		const s = Math.sin(radians)
		return [
			c,s,0,0,
			-s,c,0,0,
			0,0,1,0,
			0,0,0,1
		]
	},
	yRotation: function(degrees){
		const radians = Math.PI * degrees/180
		const c = Math.cos(radians)
		const s = Math.sin(radians)
		return [
			c,0,-s,0,
			0,1,0,0,
			s,0,c,0,
			0,0,0,1
		]
	},
	xRotation: function(degrees){
		const radians = Math.PI * degrees/180
		const c = Math.cos(radians)
		const s = Math.sin(radians)
		return [
			1,0,0,0,
			0,c,s,0,
			0,-s,c,0,
			0,0,0,1
		]
	},
	translation: function(tx,ty,tz){
		return[
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			tx,ty,tz,1
		]
	},
	scale: function(mat,sx,sy,sz){
		return m4.multiply(m4.scaling(sx,sy,sz),mat)
	},
	zRotate: function(mat,degrees){
		return m4.multiply(m4.zRotation(degrees),mat)
	},
	yRotate: function(mat,degrees){
		return m4.multiply(m4.yRotation(degrees),mat)
	},
	xRotate: function(mat,degrees){
		return m4.multiply(m4.xRotation(degrees),mat)
	},
	translate: function(mat,tx,ty,tz){
		return m4.multiply(m4.translation(tx,ty,tz),mat)
	},
	inverse: function(m){
		const m00 = m[0 * 4 + 0]
		const m01 = m[0 * 4 + 1]
		const m02 = m[0 * 4 + 2]
		const m03 = m[0 * 4 + 3]
		const m10 = m[1 * 4 + 0]
		const m11 = m[1 * 4 + 1]
		const m12 = m[1 * 4 + 2]
		const m13 = m[1 * 4 + 3]
		const m20 = m[2 * 4 + 0]
		const m21 = m[2 * 4 + 1]
		const m22 = m[2 * 4 + 2]
		const m23 = m[2 * 4 + 3]
		const m30 = m[3 * 4 + 0]
		const m31 = m[3 * 4 + 1]
		const m32 = m[3 * 4 + 2]
		const m33 = m[3 * 4 + 3]
		
		const A2323 = m22 * m33 - m23 * m32 ;
		const A1323 = m21 * m33 - m23 * m31 ;
		const A1223 = m21 * m32 - m22 * m31 ;
		const A0323 = m20 * m33 - m23 * m30 ;
		const A0223 = m20 * m32 - m22 * m30 ;
		const A0123 = m20 * m31 - m21 * m30 ;
		const A2313 = m12 * m33 - m13 * m32 ;
		const A1313 = m11 * m33 - m13 * m31 ;
		const A1213 = m11 * m32 - m12 * m31 ;
		const A2312 = m12 * m23 - m13 * m22 ;
		const A1312 = m11 * m23 - m13 * m21 ;
		const A1212 = m11 * m22 - m12 * m21 ;
		const A0313 = m10 * m33 - m13 * m30 ;
		const A0213 = m10 * m32 - m12 * m30 ;
		const A0312 = m10 * m23 - m13 * m20 ;
		const A0212 = m10 * m22 - m12 * m20 ;
		const A0113 = m10 * m31 - m11 * m30 ;
		const A0112 = m10 * m21 - m11 * m20 ;

		let det = m00 * ( m11 * A2323 - m12 * A1323 + m13 * A1223 ) 
				- m01 * ( m10 * A2323 - m12 * A0323 + m13 * A0223 ) 
				+ m02 * ( m10 * A1323 - m11 * A0323 + m13 * A0123 ) 
				- m03 * ( m10 * A1223 - m11 * A0223 + m12 * A0123 ) ;
		if(det > -0.001 && det < 0.001){
			console.error('det error')
		}
		det = 1 / det;
		if(det > -0.001 && det < 0.001){
			console.error('det error')
		}

		return [
			det *   ( m11 * A2323 - m12 * A1323 + m13 * A1223 ),
			det * - ( m01 * A2323 - m02 * A1323 + m03 * A1223 ),
			det *   ( m01 * A2313 - m02 * A1313 + m03 * A1213 ),
			det * - ( m01 * A2312 - m02 * A1312 + m03 * A1212 ),
			det * - ( m10 * A2323 - m12 * A0323 + m13 * A0223 ),
			det *   ( m00 * A2323 - m02 * A0323 + m03 * A0223 ),
			det * - ( m00 * A2313 - m02 * A0313 + m03 * A0213 ),
			det *   ( m00 * A2312 - m02 * A0312 + m03 * A0212 ),
			det *   ( m10 * A1323 - m11 * A0323 + m13 * A0123 ),
			det * - ( m00 * A1323 - m01 * A0323 + m03 * A0123 ),
			det *   ( m00 * A1313 - m01 * A0313 + m03 * A0113 ),
			det * - ( m00 * A1312 - m01 * A0312 + m03 * A0112 ),
			det * - ( m10 * A1223 - m11 * A0223 + m12 * A0123 ),
			det *   ( m00 * A1223 - m01 * A0223 + m02 * A0123 ),
			det * - ( m00 * A1213 - m01 * A0213 + m02 * A0113 ),
			det *   ( m00 * A1212 - m01 * A0212 + m02 * A0112 ),
		]
	}
}

// shader source
const vsSource = document.getElementById('vsSource').innerText
const fsSource = document.getElementById('fsSource').innerText

// canvas
const canvas = document.createElement('canvas')
document.body.append(canvas)
canvas.width = 300
canvas.height = 300

// gl
let gl = canvas.getContext('webgl')
if (!gl)
	gl = canvas.getContext('experimental-webgl')
if (!gl)
	alert('ERROR: All versions of webgl are not supported on your browser. Try using an updated browser of chrome')

// viewport & clearcolor & enable
gl.viewport(0,0,canvas.width,canvas.height)
gl.clearColor(.5,0.4,.6,1)
gl.clear(gl.COLOR_BUFFER_BIT)
gl.enable(gl.DEPTH_TEST)
gl.enable(gl.CULL_FACE)

// program
const program = buildProgram()
gl.useProgram(program)

// locations
// attrib
const attribLocations = {}
for (let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_ATTRIBUTES);i++){
	const attribName = gl.getActiveAttrib(program,i).name
	attribLocations[attribName] = gl.getAttribLocation(program,attribName)
}
// unifrom
const uniformLocations = {}
for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);i++){
	const uniformName = gl.getActiveUniform(program,i).name
	uniformLocations[uniformName] = gl.getUniformLocation(program,uniformName)
}

// data
const elementSize = 3

// buffer data
// position
const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(position),gl.STATIC_DRAW)

gl.vertexAttribPointer(
	attribLocations.a_Position,
	elementSize,
	gl.FLOAT,
	0,
	0,
	0
)
gl.enableVertexAttribArray(attribLocations)

// color
const colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colors),gl.STATIC_DRAW)

gl.vertexAttribPointer(
	attribLocations.a_Color,
	3,
	gl.FLOAT,
	0,
	0,
	0
)
gl.enableVertexAttribArray(attribLocations.a_Color)

// uniform
let transform = m4.orthographic(300,300,300)
// transform = m4.perspective(60,1,100,300)
// transform = m4.translate(transform,0,0,0)
// transform = m4.zRotate(transform,90)
// transform = m4.yRotate(transform,0)
// transform = m4.xRotate(transform,0)
// transform = m4.scale(transform,0.5,0.5)

gl.uniformMatrix4fv(uniformLocations.u_Transform,false,transform)

// render
render()

// FUNCTIONS
function updateTransformCam(camTransform){
	
	transform = m4.perspective(80,1,1,4000)
	transform = m4.multiply(camTransform,transform)
	gl.uniformMatrix4fv(uniformLocations.u_Transform,false,transform)

}

function updateTransform(tx,ty,tz,rx,ry,rz,sx,sy,sz,ox,oy,oz){
	// transform = m4.orthographic(300,300,300)
	transform = m4.perspective(80,1,1,4000)
	transform = m4.translate(transform,tx,ty,tz)
	transform = m4.zRotate(transform,rz)
	transform = m4.yRotate(transform,ry)
	transform = m4.xRotate(transform,rx)
	transform = m4.translate(transform,ox,oy,oz)
	transform = m4.scale(transform,sx,sy,sz)

	gl.uniformMatrix4fv(uniformLocations.u_Transform,false,transform)

}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.drawArrays(gl.POINTS,0,position.length/elementSize)
	gl.drawArrays(gl.TRIANGLES,0,position.length/elementSize)
}

function buildShader(type,source){
	const shader = gl.createShader(type)
	gl.shaderSource(shader,source)
	gl.compileShader(shader)

	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
		throw new Error('ERROR compiling shader of type: '+type+' Info: '+gl.getShaderInfoLog(shader))
	}

	return shader
}

function buildProgram(){
	const program = gl.createProgram()
	gl.attachShader(program,buildShader(gl.VERTEX_SHADER,vsSource))
	gl.attachShader(program,buildShader(gl.FRAGMENT_SHADER,fsSource))
	gl.linkProgram(program)
	gl.validateProgram(program)

	if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
		throw new Error('ERROR linking program. Info: '+gl.getProgramInfoLog(program))
	}
	if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)){
		throw new Error('ERROR validating program. Info: '+gl.getProgramInfoLog(program))
	}

	return program
}


function print(m){
	console.log('### PRINTING ###')
	for(let i=0;i<4;i++){
		console.log(`${m[i*4+0]}\t\t${m[i*4+1]}\t\t${m[i*4+2]}\t\t${m[i*4+3]}`)
	}
}