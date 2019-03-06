//Seasons
var buildSeasonsDrDn = function (seasons) {
	var element = $('#selSeason');
	element.html('');
	$.each(seasons, function (i, item) {
		var option = "<option value = '" + item.Year + "'>" + item.Year + "</option>";
		element.append(option);
	});

	//updateSeasonFromLocalStorage();
};

//Circuits of Year
var buildCircuitsDrDn = function (circuits) {
	var element = $('#selCircuit');
	element.html('');
	$.each(circuits, function (i, item) {
		var option = "<option value = '" + item.Id + "'>" + item.Name + "</option>";
		element.append(option);
	});

	//updateCircuitFromLocalStorage();
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

	updateWeatherConditions();
};

//Weather forecast of Race
var updateWeatherConditions = function () {

	var request = {
		year: getSeason(),
		circuitId: getCircuit()
	};

	var url = "/api/weatherforecasts/";
	CallWS("POST", url, "json", request, "application/json;charset = utf - 8", updateWeatherSection);
};

var updateWeatherSection = function (data) {
	var weatherStatusElement = $('weatherStatus');
	var weatherIconElement = getWeatherIcon(data.Icon);
	
};

var getWeatherIcon = function (icon) {
	var weatherElm = '';
	switch (icon) {
		case "clear-day":
			{
				weatherIcon = '<img src="Icons/sun.svg" class="settingsImg"/>';
				break;
			}
		case "clear-night":
			{
				weatherIcon = '<img src="Icons/moon-clear-star.svg" class="settingsImg"/>';
				break;
			}
		case "rain":
			{
				weatherIcon = '<img src="Icons/rainy.svg" class="settingsImg"/>';
				break;
			}
		case "snow":
			{
				weatherIcon = '<img src="Icons/sowy.svg" class="settingsImg"/>';
				break;
			}
		case "cloudy":
			{
				weatherIcon = '<img src="Icons/cloudy.svg" class="settingsImg"/>';
				break;
			}
		case "partly-cloudy-day":
			{
				weatherIcon = '<img src="Icons/partially-cloudy.svg" class="settingsImg"/>';
				break;
			}
		case "partly-cloudy-night":
			{
				weatherIcon = '<img src="Icons/partially-cloudy.svg" class="settingsImg"/>';
				break;
			}
		default:
			{
				weatherIcon = '<img src="Icons/partially-cloudy.svg" class="settingsImg"/>';
				break;
			}
	}
	return weatherIcon;
}
