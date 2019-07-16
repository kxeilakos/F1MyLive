// ***** Constants     ******** //
var requestType = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE"
};

var dataType = {
	json: "json",
	xml: "xml"
};

var contentType = "application/json;charset = utf - 8";
var raceFinishedLabel = "Race finished";


// ***** Current File Selectors ***** //
function getTableBody() {
	return $('#liveTimingList');
}

function getRaceEventsList() {
	return $('#raceEventsList');
}

function getRaceControlLiveTiming() {
	return $('#raceControlLiveTiming');
}

function getRaceControlEvents() {
	return $('#raceControlEvents');
}

function getSelectedDriverId() {
	return $('#selDriver').val();
}

function getSelectedConstructorId() {
	return $('#selConstructor').val();
}

// ***** Live Timing Table Methods ***** //

//1. LiveTiming list
function startLiveTiming() {

	var request = {
		year: getSeason(),
		circuitId: getCircuit()
	};

	var url = "/api/laptimes/";
	CallWS(requestType.POST, url, dataType.json, request, contentType, populateLiveTimingTable);
}

//2. Simulate playback editor through an async Timer
function timer(ms) {
	return new Promise(res => setTimeout(res, ms));
}

async function populateLiveTimingTable(data) {
	handleStatusLabel("", "");
	togglePlayBackControls(true);

	if (data !== null) {
		lapTimesByLap = data;
		totalLaps = Object.keys(data).length -2;
		updateSliderWithRaceData(totalLaps);
	}

	var interval = getInterval();

	for (var prop in lapTimesByLap) {
		console.log(currentLap);

		//If user pauses Race Evolution trace current Lap
		if (stop) {
			currentLap = prop - 1;
			return;
		}
		//If user resumes Race Evolution skip Laps before current
		if (+prop < +currentLap) continue;
		if (+prop === -1 || +prop === 1000) continue; // These are 2 special entries containing Race statistics and will be handled exclusively once the race is Finished

		var driversList = lapTimesByLap[prop];
		clearTable();

		var tableBody = getTableBody();
		var raceListEvents = getRaceEventsList();

		for (var i = 0; i < driversList.length; i++) {
			var rowData = driversList[i];

			var row = generateLiveTimingTableRow(rowData);

			if (rowData.HasPitstop) {
				var pitStopItem = generateRaceEventsListPitStopItem(rowData);
				if (!isPistopEventChecked()) pitStopItem.addClass('disp-n');
				pitStopItem.addClass('status-pitstop');
				raceListEvents.prepend(pitStopItem);
			}
			if (rowData.RaceStatus && rowData.RaceStatus.length>0) {
				var raceStatusItem = generateRaceEventsListStatusItem(rowData);
				if (!isFinishedEventChecked() && isStatusFinished(rowData.RaceStatusId)) raceStatusItem.addClass('disp-n');
				if (isStatusFinished(rowData.RaceStatusId)) raceStatusItem.addClass('status-finished');

				if (!isAbandonedEventChecked() && isStatusAbandoned(rowData.RaceStatusId))  raceStatusItem.addClass('disp-n'); 
				if (isStatusAbandoned(rowData.RaceStatusId)) raceStatusItem.addClass('status-abandoned');

				if (!isLapsEventChecked() && isStatusLapsPlus(rowData.RaceStatusId)) raceStatusItem.addClass('disp-n');
				if (isStatusLapsPlus(rowData.RaceStatusId)) raceStatusItem.addClass('status-laps');

				raceListEvents.prepend(raceStatusItem);
			}
			if (rowData.OvertakeLabels !== null) {
				for (var k = 0; k < rowData.OvertakeLabels.length; k++) {
					var overTakeItem = generateRaceEventsListOvertakeItem(rowData.Lap, rowData.OvertakeLabels[k], rowData.DriverId);
					raceListEvents.prepend(overTakeItem);
				}
			}

			tableBody.append(row);
		}

		handleLapLabel(prop);
		moveSliderToLap(prop);
		raceInProgress = true;
		calclulateEventsListHeight();

		await timer(interval);

		if(+prop === totalLaps) {
			stop = true;
			raceInProgress = false;
			handleStatusLabel("Race finished", "colorClassDown");
			tableBody = getTableBody();
			var extraDataOfFinalLap = lapTimesByLap[1000];
			for (var l = 0; l < extraDataOfFinalLap.length; l++) {
				row = generateLiveTimingTableRow(extraDataOfFinalLap[l]);
				tableBody.append(row);
			}

			setTimeout(function () {
				updateWeatherActionPanelWithStatisatics(lapTimesByLap[-1]);
			}, interval);
		}
	}
}

//3. Generate Row for Table containing Race Evolution data
function generateLiveTimingTableRow(rowData) {

	var selectedDriverId = getSelectedDriverId();
	var selectedContructorId = getSelectedConstructorId();

	var row = $('<tr>');
	row.attr('id', rowData.Lap + "#" + rowData.DriverName);
	var th = $('<th scope="row">');
	th.append(rowData.Position < 1000 ? rowData.Position : "");
	var tdPositionStatus = $('<td>');
	var positionStatusIcon = getPositionStatusIcon(rowData.PositionStatus);
	tdPositionStatus.append(positionStatusIcon);
	var tdDriverName = $('<td>');

	if (rowData.DriverId === +selectedDriverId) {
		tdDriverName.addClass('selectedDriverAndTeam');
	}

	tdDriverName.append(rowData.DriverName);
	var tdConstructorName = $('<td>');
	tdConstructorName.append(rowData.ConstructorName);

	if (rowData.ConstructorId === +selectedContructorId) {
		tdConstructorName.addClass('selectedDriverAndTeam');
	}

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

//4.  Resolve Stastus Icon
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

//5. Interval according to user's selection
function getInterval() {
	var speed = this.getSpeed();
	switch (speed) {
		case speedStatus.Slow:
			return 5000;
		case speedStatus.Normal:
			return 3000;
		case speedStatus.Fast:
			return 2000;
		case speedStatus.TopSpeed:
			return 1000;
		default:
			return 3000;
	}
}

// 6. Set height of Events List Div according to LiveTiming list Div
function calclulateEventsListHeight() {
	var sourceDiv = getRaceControlLiveTiming();
	var sourceHeight = sourceDiv.innerHeight();
	var targetElement = getRaceControlEvents();
	targetElement.innerHeight(sourceHeight);
}



// ********  Generate Race Events List Items  ************** //

//1. PitstopItem
function generateRaceEventsListPitStopItem(rowData) {

	var selectedDriverId = getSelectedDriverId();

	var eventIcon = $('<img>');
	eventIcon.attr("src", "./Icons/pit-stop.svg");
	eventIcon.addClass("imgPitStop");
	eventIcon.addClass("marginRight1");

	var lapLabel = "Lap " + rowData.Lap + ": ";
	var pitStopLabel = rowData.DriverName;
	var li = $('<li>');
	var span = $('<span>');
	span.addClass("eventsListPitStopItem");
	span.addClass("marginBtm1");
	span.append(lapLabel);
	li.addClass("marginRight1");
	li.append(eventIcon);
	li.append(span);
	var span2 = $('<span>');
	span2.append(pitStopLabel);

	if (rowData.DriverId === +selectedDriverId) {
		span2.addClass('selectedDriverAndTeam');
		span.addClass('selectedDriverAndTeam');
	}

	li.append(span2);

	return li;
}

//2. Status Item
function generateRaceEventsListStatusItem(rowData) {

	var selectedDriverId = getSelectedDriverId();

	var eventIcon = $('<img>');
	if (rowData.RaceStatusId === 1 || isStatusLapsPlus(rowData.RaceStatusId)) {
		eventIcon.attr("src", "./Icons/racing-flag.svg");
	} else {
		eventIcon.attr("src", "./Icons/warning.svg");
	}
	eventIcon.addClass("imgPitStop");
	eventIcon.addClass("marginRight1");

	var lapLabel = "Lap " + rowData.Lap + ": ";
	var statusLabel = rowData.DriverName + ", " + rowData.RaceStatus;
	var li = $('<li>');
	var span = $('<span>');
	span.addClass("eventsListPitStopItem");
	span.addClass("marginBtm1");
	span.append(lapLabel);
	li.addClass("marginRight1");
	li.append(eventIcon);
	li.append(span);

	var span2 = $('<span>');
	span2.append(statusLabel);
	if (rowData.DriverId === +selectedDriverId) {
		span2.addClass('selectedDriverAndTeam');
		span.addClass('selectedDriverAndTeam');
	}

	li.append(span2);

	return li;
}

//3. Overtake item
function generateRaceEventsListOvertakeItem(lap, overtakeLabel, driverID) {

	var selectedDriverId = getSelectedDriverId();
	
	var eventIcon = $('<img>');
	eventIcon.attr("src", "./Icons/overtake1.svg");
	eventIcon.addClass("imgOvertake");
	eventIcon.addClass("marginRight1");

	var lapLabel = "Lap " + lap + ": ";
	var li = $('<li>');
	var span = $('<span>');
	span.addClass("eventsListOvertakeItem");
	span.addClass("marginBtm1");
	span.append(lapLabel);
	li.addClass("marginRight1");
	li.append(eventIcon);
	li.append(span);

	var span2 = $('<span>');
	span2.append(overtakeLabel);

	if (driverID === +selectedDriverId) {
		span2.addClass('selectedDriverAndTeam');
		span.addClass('selectedDriverAndTeam');
	}

	li.append(span2);

	return li;
}
