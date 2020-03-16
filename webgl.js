console.log('loaded webgl.js')

const m3 = {
	identity: function(){
		return [
			1,0,0,
			0,1,0,
			0,0,1
		]
	},
	multiply: function(a,b){
		a00 = a[0 * 3 + 0]
		a01 = a[0 * 3 + 1]
		a02 = a[0 * 3 + 2]
		a10 = a[1 * 3 + 0]
		a11 = a[1 * 3 + 1]
		a12 = a[1 * 3 + 2]
		a20 = a[2 * 3 + 0]
		a21 = a[2 * 3 + 1]
		a22 = a[2 * 3 + 2]

		b00 = b[0 * 3 + 0]
		b01 = b[0 * 3 + 1]
		b02 = b[0 * 3 + 2]
		b10 = b[1 * 3 + 0]
		b11 = b[1 * 3 + 1]
		b12 = b[1 * 3 + 2]
		b20 = b[2 * 3 + 0]
		b21 = b[2 * 3 + 1]
		b22 = b[2 * 3 + 2]
		return [
			a00 * b00 + a01 * b10 + a02 * b20,
			a00 * b01 + a01 * b11 + a02 * b21,
			a00 * b02 + a01 * b12 + a02 * b22,
			a10 * b00 + a11 * b10 + a12 * b20,
			a10 * b01 + a11 * b11 + a12 * b21,
			a10 * b02 + a11 * b12 + a12 * b22,
			a20 * b00 + a21 * b10 + a22 * b20,
			a20 * b01 + a21 * b11 + a22 * b21,
			a20 * b02 + a21 * b12 + a22 * b22,
		]
	},
	scaling: function(sx,sy){
		return [
			sx,0,0,
			0,sy,0,
			0,0,1
		]
	},
	rotation: function(degrees){
		const radians = Math.PI * degrees/180
		const c = Math.cos(radians)
		const s = Math.sin(radians)
		return [
			c,s,0,
			-s,c,0,
			0,0,1
		]
	},
	translation: function(tx,ty){
		return[
			1,0,0,
			0,1,0,
			tx,ty,1
		]
	},
	scale: function(mat,sx,sy){
		return m3.multiply(m3.scaling(sx,sy),mat)
	},
	rotate: function(mat,degrees){
		return m3.multiply(m3.rotation(degrees),mat)
	},
	translate: function(mat,tx,ty){
		return m3.multiply(m3.translation(tx,ty),mat)
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

// viewport & clearcolor
gl.viewport(0,0,canvas.width,canvas.height)
gl.clearColor(0,0,1,1)
gl.clear(gl.COLOR_BUFFER_BIT)

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
const elementSize = 2
const position = [
//	X		Y	
// column
	0,	0,
	30, 0,
	30, 150,
	30, 150,
	0, 150,
	0,	0,
// top-bar
	30,	60,
	60, 60,
	60, 90,
	60,	90,
	30,	90,
	30,	60,
// bottom-bar
	30,120,
	60,120,
	60,150,
	60,150,
	30,150,
	30,120
]

// buffer data
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

// uniform
let transform = m3.identity()
transform = m3.scale(transform,0.5,0.5)
transform = m3.rotate(transform,90)

gl.uniformMatrix3fv(uniformLocations.u_Transform,false,transform)

// render
gl.drawArrays(gl.POINTS,0,position.length/elementSize)
gl.drawArrays(gl.TRIANGLES,0,position.length/elementSize)

// FUNCTIONS
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

