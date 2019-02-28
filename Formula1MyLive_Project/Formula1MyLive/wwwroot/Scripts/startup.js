var lapTimesByLap = null;
var selectedCircuit = null;
var selectedSeason = null;

var positionStatus = {
	Up: 0,
	Down: 1,
	NoChange: 2
};

$(document).ready(function () {

	CallWS("GET", "/api/seasons", "json",null, '', buildSeasonsDrDn);

	// Initialize Events

	//1. Once a season is selected, then we retrieve all Circuits of the selected season looking through Race entity
	// Check CircuitsController  =>  method: GetCircuitsOfYear(int year)
	var seasonsControl = $('#selSeason');
	$(seasonsControl).bind("change", function (e) {
		var selectedSeasonId = seasonsControl.val();
		updateCircuits(selectedSeasonId);
		clearDriversAndConstructors();
	});

	//2. Once a circuit is selected, then we retrieve all Drivers  & Constructors  of the selected season and circuit
	var circuitControl = $('#selCircuit');
	$(circuitControl).bind("change", function (e) {
		var selectedCircuitId = circuitControl.val();
		var selectedSeasonId = seasonsControl.val();
		updateDrivers(selectedSeasonId, selectedCircuitId);
		updateConstructors(selectedSeasonId, selectedCircuitId);
	});

	//3. Start Button event
	var startBtnControl = $('#selStart');
	startBtnControl.click(function () {
		console.log("Start!");
		
		clearTable();
		clearRaceEvents();
		startLiveTiming();
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

//LiveTiming list
function startLiveTiming() {

	var request = {
		year: getSeason(),
		circuitId: getCircuit()
	};

	var url = "/api/laptimes/";
	CallWS("POST", url, "json", request, "application/json;charset = utf - 8", populateLiveTimingTable);
}

function timer(ms) {
	return new Promise(res => setTimeout(res, ms));
}

async function populateLiveTimingTable(data) {
	this.lapTimesByLap = data;
	for (var prop in data) {
		var startingGrid = data[prop];
		clearTable();
		var tableBody = $('#liveTimingList');
		for (var i = 0; i < startingGrid.length; i++) {
			var row = generateLiveTimingTableRow(startingGrid[i]);
			tableBody.append(row);
		}
		await timer(3000);
	}
}

function myLoop() {
	setTimeout(function () {

	});
}

function generateLiveTimingTableRow(rowData) {
	var row = $('<tr>');
	row.attr('id', rowData.Lap + "#" + rowData.DriverName);
	var th = $('<th scope="row">');
	th.append(rowData.Position);
	var tdPositionStatus = $('<td>');
	var positionStatusIcon = getPositionStatusIcon(rowData.PositionStatus);
	tdPositionStatus.append(positionStatusIcon);
	var tdDriverName = $('<td>');
	tdDriverName.append(rowData.DriverName);
	var tdConstructorName = $('<td>');
	tdConstructorName.append(rowData.ConstructorName);
	var tdTime = $('<td>');
	tdTime.append(rowData.Time);
	var tdLap = $('<td>');
	tdLap.append(rowData.Lap);
	row.append(th);
	row.append(tdPositionStatus);
	row.append(tdDriverName);
	row.append(tdConstructorName);
	row.append(tdTime);
	row.append(tdLap);

	return row;
}

function getPositionStatusIcon(positionStatus) {
	var iconClass = '';
	var colorClass = '';
	switch (positionStatus) {
		case this.positionStatus.Up:
			iconClass = "fa fa-arrow-up";
			colorClass = "colorClassUp";
			break;
		case this.positionStatus.Down:
			iconClass = "fa fa-arrow-down";
			colorClass = "colorClassDown";
			break;
		case this.positionStatus.NoChange:
			iconClass = "fa fa-minus";
			break;
		default:
			iconClass = "fa fa-minus";
			break;
	}

	var iconSpan = $('<i>');
	iconSpan.addClass(iconClass);
	if (colorClass && colorClass.length > 0) iconSpan.addClass(colorClass);

	return iconSpan;
}

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
	var speedControl = $('#selspeed');
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

