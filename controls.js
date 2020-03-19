


// setup default values for sliders, display
function createControls(){
	console.log('controls.js')

	const rows = document.getElementById('controls').children[0].children
	let lastTime = new Date(0, 0, 0)
	setup()
	function setup(){
		setValues()
		setupControlsResponse()
		updateTransform(...getAllSliderValues())
		// tick()
		// render()
	}

	
	// function tick(){
	// 	// render()
	// 	requestAnimationFrame(tick)
	// }
	
	function setValues(){
		// translate
		setSliderValue(0,0)
		setSliderValue(1,0)
		setSliderValue(2,300)
		// rotate
		setSliderValue(3,0)
		setSliderValue(4,0)
		setSliderValue(5,0)
		// scale
		setSliderValue(6,1)
		setSliderValue(7,1)
		setSliderValue(8,1)
		// origin
		setSliderValue(9,0)
		setSliderValue(10,0)
		setSliderValue(11,0)
	}
	
	function setupControlsResponse(){
		for(let i=0;i<rows.length;i++){
			setDisplayValue(i,getSlider(i).value)
			getSlider(i).addEventListener('change',()=>{
				changeHandler(i)
			})
			getSlider(i).addEventListener('mousemove',()=>{
				changeHandler(i)
			})
		}
	}
	
	function changeHandler(i){
		lastTime = new Date()
		console.log(lastTime)
		setDisplayValue(i,getSlider(i).value)
		updateTransform(...getAllSliderValues())
		console.log(...getAllSliderValues())
		// render()
	}
	// if slider change update display
	// re-render if change in one slider
	
	// set slider val
	function setSliderValue(i,val){
		rows[i].children[1].children[0].value = val
	}
	// set display val
	function setDisplayValue(i,val){
		rows[i].children[2].innerText = val
	}
	
	// get 
	function getSlider(i){
		return rows[i].children[1].children[0]
	}
	function getAllSliderValues(){
		const valueArray = []
		for(let i=0;i<rows.length;i++){
			valueArray[i]=Number(getSlider(i).value)
		}
		return valueArray
	}

	return {
		getLastTime: function(){
			return lastTime
		},
		getAllSliderValues
	}
	
}