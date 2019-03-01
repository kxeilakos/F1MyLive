var lapTimesByLap = null;
var stop = false;
var raceInProgress = false;
var currentLap = -1;
var totalLaps = -1;

var positionStatus = {
	Up: 0,
	Down: 1,
	NoChange: 2
};
var speedStatus = {
	Slow: 0,
	Normal: 1,
	Fast: 2,
	TopSpeed:3
};

$(document).ready(function () {

	CallWS("GET", "/api/seasons", "json",null, '', buildSeasonsDrDn);

	// Initialize Events
	handleStatusLabel("", "");
	handleLapLabel("0");
	raceInProgress = false;
	$('#playBackControls').hide();

	//1. Once a season is selected, then we retrieve all Circuits of the selected season looking through Race entity
	// Check CircuitsController  =>  method: GetCircuitsOfYear(int year)
	var seasonsControl = $('#selSeason');
	$(seasonsControl).bind("change", function (e) {
		var selectedSeasonId = seasonsControl.val();
		handleStatusLabel("", "");
		updateCircuits(selectedSeasonId);
		clearDriversAndConstructors();
	});
	//2. Once a circuit is selected, then we retrieve all Drivers  & Constructors  of the selected season and circuit
	var circuitControl = $('#selCircuit');
	$(circuitControl).bind("change", function (e) {
		handleStatusLabel("", "");
		var selectedCircuitId = circuitControl.val();
		var selectedSeasonId = seasonsControl.val();
		updateDrivers(selectedSeasonId, selectedCircuitId);
		updateConstructors(selectedSeasonId, selectedCircuitId);
	});
	//3. Start Button event
	var startBtnControl = $('#selStart');
	startBtnControl.click(function () {
		if (raceInProgress) {
			handleStatusLabel("Please Stop Race First", "colorClassData");
			return;
		}
		var selectedCircuit = getCircuit();
		var selectedYear = getSeason();
		if (selectedCircuit === null || selectedYear === null) {
			handleStatusLabel("Please select Circuit & Season First", "colorClassData");
			return;
		}
		console.log("Start!");
		handleStatusLabel("Retrieving race data. Please wait...", "colorClassData");
		clearTable();
		clearRaceEvents();
		stop = false;
		startLiveTiming();
		raceInProgress = true;
	});
	//4. Pause Live Timing  button
	var pauseButton = $('.fa-pause');
	pauseButton.click(function () {
		if (!raceInProgress) {
			return;
		}
		stop = true;
		raceInProgress = false;
		handleStatusLabel("Paused", "colorClassDown");
	});
	//5. Resume - play button
	var playButton = $('.fa-play');
	playButton.click(function () {
		if (raceInProgress) {
			return;
		}
		handleStatusLabel("Resuming...", "colorClassUp");
		setTimeout(function () {
			if (!stop) return;
			handleStatusLabel("","");
			stop = false;
			raceInProgress = true;
			populateLiveTimingTable(null);
		}, 3000);
	});
	//6. Go to Start Button
	var gotoStartButton = $('.fa-fast-backward');
	gotoStartButton.click(function () {
		if (raceInProgress) {
			handleStatusLabel("Please stop the race first and try again.", "colorClassData");
			return;
		}
		handleStatusLabel("Going to Start...", "");
		setTimeout(function () {
			currentLap = 0;
			clearTable();
			handleStatusLabel("Start");
			handleLapLabel("0");
			//populateLiveTimingTable(null);
		}, 3000);
	});
	//7. Go to Last Lap
	var gotoFinishButton = $('.fa-fast-forward');
	gotoFinishButton.click(function () {
		if (raceInProgress) {
			handleStatusLabel("Please stop the race first and try again.", "colorClassData");
			return;
		}
		handleStatusLabel("Going to Finish...", "");
		setTimeout(function () {
			currentLap = totalLaps-1;
			clearTable();
			handleStatusLabel("Finish");
			handleLapLabel(currentLap);
		}, 3000);
	});
	//8. Range slider
	var slider = $('#rangeSlider');
	slider.on('slide', function (ev) {
		if (raceInProgress) {
			handleStatusLabel("Please stop the race first and try again.", "colorClassData");
			return;
		}
		handleLapLabel(this.value);
	});

});

//Update DropDowns on selection
function updateCircuits(selectedSeasonId) {
	var url = "/api/circuits/" + selectedSeasonId;
	CallWS("GET", url, "json", null, '',  buildCircuitsDrDn);
}

function updateDrivers(selectedSeasonId, selectedCircuitId) {
	var url = "/api/drivers/";
	var request = {
		year: selectedSeasonId,
		circuitId: selectedCircuitId
	};

	CallWS("POST", url, "json", request, "application/json;charset = utf - 8",buildDriversDrDn);
}

function updateConstructors(selectedSeasonId, selectedCircuitId) {
	var url = "/api/constructors/";
	var request = {
		year: selectedSeasonId,
		circuitId: selectedCircuitId
	};

	CallWS("POST", url, "json", request, "application/json;charset = utf - 8", buildConstructorsDrDn);
}