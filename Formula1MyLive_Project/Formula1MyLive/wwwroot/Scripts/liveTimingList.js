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
	handleStatusLabel("", "");
	togglePlayBackControls(true);

	if (data !== null) {
		lapTimesByLap = data;
		totalLaps = Object.keys(data).length;
		updateSliderWithRaceData(totalLaps);
	}

	var interval = getInterval();

	for (var prop in lapTimesByLap) {
		console.log(currentLap);
		if (stop) {
			currentLap = prop - 1;
			//break;
			return;
		}
		if (+prop < +currentLap) continue;

		var driversList = lapTimesByLap[prop];
		clearTable();

		var tableBody = $('#liveTimingList');
		var raceListEvents = $('#raceEventsList');

		for (var i = 0; i < driversList.length; i++) {
			var rowData = driversList[i];

			var row = generateLiveTimingTableRow(rowData);
			if (rowData.HasPitstop) {
				var pitStopItem = generateRaceEventsListPitStopItem(rowData);
				raceListEvents.append(pitStopItem);
			}
			if (rowData.RaceStatus && rowData.RaceStatus.length>0) {
				var raceStatusItem = generateRaceEventsListStatusItem(rowData);
				raceListEvents.append(raceStatusItem);
			}

			tableBody.append(row);
			
		}
		handleLapLabel(prop);
		moveSliderToLap(prop);
		raceInProgress = true;
		
		await timer(interval);

		if(+prop === totalLaps) {
			stop = true;
			raceInProgress = false;
			handleStatusLabel("Race finished", "colorClassData");
		}
	}
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

//Race Events List
function generateRaceEventsListPitStopItem(rowData) {
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
	li.append(eventIcon);
	li.append(span);
	li.append(pitStopLabel);

	return li;
}

function generateRaceEventsListStatusItem(rowData) {
	var eventIcon = $('<img>');
	if (rowData.RaceStatusId === 1) {
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

	li.append(eventIcon);
	li.append(span);
	li.append(statusLabel);

	return li;
}