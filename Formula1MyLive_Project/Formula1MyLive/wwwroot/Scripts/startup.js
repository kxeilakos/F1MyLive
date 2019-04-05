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
	Slow: "0",
	Normal: "1",
	Fast: "2",
	TopSpeed:"3"
};

$(document).ready(function () {

	CallWS("GET", "/api/seasons", "json",null, '', buildSeasonsDrDn);

	// Initialize Events
	handleStatusLabel("", "");
	handleLapLabel("0");
	raceInProgress = false;
	togglePlayBackControls(false);
	handleStartButtonLabel("Start");

	//1. Once a season is selected, then we retrieve all Circuits of the selected season looking through Race entity
	// Check CircuitsController  =>  method: GetCircuitsOfYear(int year)
	var seasonsControl = $('#selSeason');
	$(seasonsControl).bind("change", function (e) {
		var selectedSeasonId = seasonsControl.val();
		if (selectedSeasonId === "-1") return;

		handleStatusLabel("", "");
		updateCircuits(selectedSeasonId);
		clearDriversAndConstructors();
		clearWeatherActionPanel();
	});
	//2. Once a circuit is selected, then we retrieve all Drivers  & Constructors  of the selected season and circuit
	var circuitControl = $('#selCircuit');
	$(circuitControl).bind("change", function (e) {
		
		var selectedCircuitId = circuitControl.val();
		if (selectedCircuitId === "-1") return;

		handleStatusLabel("", "");
		var selectedSeasonId = seasonsControl.val();
		updateDrivers(selectedSeasonId, selectedCircuitId);
		updateConstructors(selectedSeasonId, selectedCircuitId);
		clearWeatherActionPanel();
	});
	//3. Start Button event
	var startBtnControl = $('#selStart');
	startBtnControl.click(function () {
		if ($(this).hasClass("started") && raceInProgress) {
			location.reload();
			return;
		}
		else {
			$(this).addClass("started");
			var selectedCircuit = getCircuit();
			var selectedYear = getSeason();
			if (selectedCircuit === null || selectedYear === null || selectedCircuit === "-1" || selectedYear === "-1") {
				handleStatusLabel("Please select Circuit & Season First", "colorClassData");
				return;
			}

			window.localStorage.setItem("selectedCircuit", selectedCircuit);
			window.localStorage.setItem("selectedYear", selectedYear);

			console.log("Start!");
			handleStatusLabel("Retrieving race data. Please wait...", "colorClassData");
			clearTable();
			clearRaceEvents();
			stop = false;
			startLiveTiming();
			raceInProgress = true;
			handleStartButtonLabel("Stop Race");
		}
		
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
		}, getInterval());
	});
	//6. Go to Start Button
	var gotoStartButton = $('.fa-fast-backward');
	gotoStartButton.click(function () {
		if (raceInProgress) {
			handleStatusLabel("Please pause the race first and try again.", "colorClassData");
			return;
		}
		handleStatusLabel("Going to Start...", "");
		setTimeout(function () {
			currentLap = 0;
			clearTable();
			clearRaceEvents();
			handleStatusLabel("Start");
			handleLapLabel("0");
			//populateLiveTimingTable(null);
		}, getInterval());
	});
	//7. Go to Last Lap
	var gotoFinishButton = $('.fa-fast-forward');
	gotoFinishButton.click(function () {
		if (raceInProgress) {
			handleStatusLabel("Please pause the race first and try again.", "colorClassData");
			return;
		} 
		handleStatusLabel("Going to Finish...", "");
		setTimeout(function () {
			currentLap = totalLaps-1;
			clearTable();
			clearRaceEvents();
			handleStatusLabel("Finish");
			handleLapLabel(currentLap);
		}, getInterval());
	});
	//8. Range slider
	var slider = $('#rangeSlider');
	slider.on('change', function () {
		var self = this;
		if (raceInProgress) {
			handleStatusLabel("Please pause the race first and try again.", "colorClassData");
			return;
		} else if (!checkIfSliderCanBescrolled()) {
			handleStatusLabel("");
			handleLapLabel("0");
			return;
		}
		handleLapLabel(this.value);
		handleStatusLabel("Going to Lap... " + this.value, "colorClassData");
		setTimeout(function () {
			if (!stop) return;
			handleStatusLabel("", "");
			stop = false;
			currentLap = self.value;
			raceInProgress = true;
			populateLiveTimingTable(null);
		}, getInterval());
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