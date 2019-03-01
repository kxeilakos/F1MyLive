//Get settings
function getSeason() {
	var seasonsControl = $('#selSeason');
	return seasonsControl.val();
}

function getCircuit() {
	var circuitsControl = $('#selCircuit');
	return circuitsControl.val();
}

function getDriver() {
	var driversControl = $('#selDriver');
	return driversControl.val();
}

function getContructor() {
	var constructorsControl = $('#selConstructor');
	return constructorsControl.val();
}

function getSpeed() {
	var speedControl = $('#selSpeedAnm');
	return speedControl.val();
}

// Clear Controlls
function clearDriversAndConstructors() {
	var element = $('#selDriver');
	element.html('');
	element = $('#selConstructor');
	element.html('');
}

function clearTable() {
	$('#liveTimingList').empty();
}

function clearRaceEvents() {
	$('#raceEventsList').empty();
}

//Set label Status
function handleStatusLabel(label, cls) {
	var statusLabelElement = $('#labelStatus');
	statusLabelElement.text(label);
	statusLabelElement.removeClass();
	statusLabelElement.addClass(cls);
}

//Set Lap label
function handleLapLabel(label) {
	var lapLabelElement = $('#selLapSlider');
	lapLabelElement.text(label);
}

//Slider
function updateSliderWithRaceData(totalLaps){
	var slider = $('#rangeSlider');
	slider.attr("max", totalLaps);
	slider.attr("min", 0);
	slider.attr("value", 0);
}

function moveSliderToLap(lap) {
	var slider = $('#rangeSlider');
	slider.val(lap);
}

	

