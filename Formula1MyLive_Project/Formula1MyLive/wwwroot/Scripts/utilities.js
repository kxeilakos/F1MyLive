//Get - Set  settings
function getSeason() {
	var seasonsControl = $('#selSeason');
	return seasonsControl.val();
}

function setSeason(v) {
	var seasonsControl = $('#selSeason');
	seasonsControl.val(v);
}

function getCircuit() {
	var circuitsControl = $('#selCircuit');
	return circuitsControl.val();
}

function setCircuit(v) {
	var circuitsControl = $('#selCircuit');
	circuitsControl.val(v);
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

// Clear and Hide / Show Controlls
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

function togglePlayBackControls(view) {
	var plbkCtrl = $('#playBackControls');
	if (view)
		plbkCtrl.show();
	else
		plbkCtrl.hide();
}

//Set label Status
function handleStatusLabel(label, cls) {
	var statusLabelElement = $('#labelStatus');
	statusLabelElement.text(label);
	statusLabelElement.removeClass();
	if(cls && cls.length>0) statusLabelElement.addClass(cls);
}

//Set Lap label
function handleLapLabel(label) {
	var lapLabelElement = $('#selLapSlider');
	lapLabelElement.text(label);
	moveSliderToLap(+label);
}

//Set Start button label
function handleStartButtonLabel(label) {
	var startButtonLabel = $('.selStartBt');
	startButtonLabel.text(label);
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

function checkIfSliderCanBescrolled() {
	var plbk = $('#playBackControls');
	return plbk.is(":visible");
}

//Check Button Events
function isPistopEventChecked() {
	return $('#pitstop-event').is(":checked");
}
function isFinishedEventChecked() {
	return $('#finished-event').is(":checked");
}
function isAbandonedEventChecked() {
	return $('#abandoned-event').is(":checked");
}
function isLapsEventChecked() {
	return $('#laps-event').is(":checked");
}
function isStatusFinished(status){
	return status.RaceStatusId === 1;
}
function isStatusAbandoned(status) {
	return (status.RaceStatusId >= 1 && status.RaceStatusId <= 10) || (status.RaceStatusId >= 20 && status.RaceStatusId <= 44);
}
function isStatusLapsPlus(status) {
	return status.RaceStatusId >= 11 && status.RaceStatusId <= 19;
}


//Local storage
function updateSeasonFromLocalStorage() {
	if (window.localStorage.getItem("selectedYear") && window.localStorage.getItem("selectedYear").length > 0) {
		setSeason(window.localStorage.getItem("selectedYear"));
	}
}

function updateCircuitFromLocalStorage() {
	if (window.localStorage.getItem("selectedCircuit") && window.localStorage.getItem("selectedCircuit").length > 0) {
		setCircuit(window.localStorage.getItem("selectedCircuit"));
	}
}



	

