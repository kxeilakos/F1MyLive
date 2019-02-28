﻿//Seasons
var buildSeasonsDrDn = function (seasons) {
	var element = $('#selSeason');
	element.html('');
	$.each(seasons, function (i, item) {
		var option = "<option value = '" + item.Year + "'>" + item.Year + "</option>";
		element.append(option);
	});
};

//Circuits of Year
var buildCircuitsDrDn = function (circuits) {
	var element = $('#selCircuit');
	element.html('');
	$.each(circuits, function (i, item) {
		var option = "<option value = '" + item.Id + "'>" + item.Name + "</option>";
		element.append(option);
	});
};

//Drivers of Circuit
var buildDriversDrDn = function (drivers) {
	var element = $('#selDriver');
	element.html('');
	$.each(drivers, function (i, item) {
		var name = item.FirstName + " " + item.LastName;
		var option = "<option value = '" + item.Id + "'>" + name + "</option>";
		element.append(option);
	});
};

//Constructors of Circuit
var buildConstructorsDrDn = function (constructors) {
	var element = $('#selConstructor');
	element.html('');
	$.each(constructors, function (i, item) {
		var option = "<option value = '" + item.Id + "'>" + item.Name + "</option>";
		element.append(option);
	});
};
