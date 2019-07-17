//Seasons
var buildSeasonsDrDn = function (seasons) {
	var element = $('#selSeason');
	element.html('');

	var fistOption = '<option value="-1">Select Season</option>';
	element.append(fistOption);

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

	var fistOption = '<option value="-1">Select Circuit</option>';
	element.append(fistOption);

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
	handleStatusLabel("Retrieving race day weather report...");

	var request = {
		year: getSeason(),
		circuitId: getCircuit()
	};

	var url = "/api/weatherforecasts/";
	CallWS("POST", url, "json", request, "application/json;charset = utf - 8", updateWeatherSection);
};

var updateWeatherSection = function (data) {
	clearWeatherActionPanel();

	if (data.StatusCode === 200) {
		var weatherData = data.daily.data[0];
		var weatherIconElement = getWeatherIcon(weatherData.icon);

		var wIcon = $('.wIcon');
		wIcon.append(weatherIconElement);
		wIcon.append(weatherData.summary);

		var wTempHigh = $('.wTempHigh');
		wTempHigh.append('<img src="Icons/temperature-max.svg" class="settingsImgWeather" />');
		wTempHigh.append('<br>');
		wTempHigh.append(weatherData.temperatureHigh + '°C');

		var wTempLow = $('.wTempLow');
		wTempLow.append('<img src="Icons/temperature-min.svg" class="settingsImgWeather" />');
		wTempLow.append('<br>');
		wTempLow.append(weatherData.temperatureLow + '°C');

		var wHumidity = $('.wHumidity');
		wHumidity.append('<img src="Icons/humidity.svg" class="settingsImgWeather" />');
		wHumidity.append('<br>');
		wHumidity.append(Math.round(weatherData.humidity * 100) + '%');

		var wWindSpeed = $('.wWindSpeed');
		wWindSpeed.append('<img src="Icons/flag-windy.svg" class="settingsImgWeather" />');
		wWindSpeed.append('<br>');
		wWindSpeed.append(weatherData.windSpeed + 'm/sec');

		handleStatusLabel("Race day weather report");
	} else {
		handleStatusLabel("Failed to retreive weather data");
	}
	
};

var getWeatherIcon = function (icon) {
	var weatherElm = '';
	switch (icon) {
		case "clear-day":
			{
				weatherIcon = '<img src="Icons/sun.svg" class="settingsImgWeather"/>';
				break;
			}
		case "clear-night":
			{
				weatherIcon = '<img src="Icons/moon-clear-star.svg" class="settingsImgWeather"/>';
				break;
			}
		case "rain":
			{
				weatherIcon = '<img src="Icons/rainy.svg" class="settingsImgWeather"/>';
				break;
			}
		case "snow":
			{
				weatherIcon = '<img src="Icons/snowy.svg" class="settingsImgWeather"/>';
				break;
			}
		case "cloudy":
			{
				weatherIcon = '<img src="Icons/cloudy.svg" class="settingsImgWeather"/>';
				break;
			}
		case "partly-cloudy-day":
			{
				weatherIcon = '<img src="Icons/partially-cloudy.svg" class="settingsImgWeather"/>';
				break;
			}
		case "partly-cloudy-night":
			{
				weatherIcon = '<img src="Icons/partially-cloudy.svg" class="settingsImgWeather"/>';
				break;
			}
		default:
			{
				weatherIcon = '<img src="Icons/partially-cloudy.svg" class="settingsImgWeather"/>';
				break;
			}
	}
	return weatherIcon;
};

var clearWeatherActionPanel = function () {
	var wIcon = $('.wIcon');
	wIcon.empty();
	var wTempHigh = $('.wTempHigh');
	wTempHigh.empty();
	var wTempLow = $('.wTempLow');
	wTempLow.empty();
	var wHumidity = $('.wHumidity');
	wHumidity.empty();
	var wWindSpeed = $('.wWindSpeed');
	wWindSpeed.empty();
};

var updateWeatherActionPanelWithStatisatics = function (statistics) {
	clearWeatherActionPanel();

	var wIcon = $('.wIcon');
	wIcon.append('Driver: ');
	wIcon.append(statistics[0].DriverName);

	var wTempHigh = $('.wTempHigh');
	wTempHigh.append('Lap: ');
	wTempHigh.append(statistics[0].Lap);

	var wTempLow = $('.wTempLow');
	wTempLow.append('Lap Time: ');
	wTempLow.append(statistics[0].Time);

	var wHumidity = $('.wHumidity');
	wHumidity.append('Lap Speed: ');
	wHumidity.append(statistics[0].DriverNumber);

	var wWindSpeed = $('.wWindSpeed');
	wWindSpeed.append('Position: ');
	wWindSpeed.append(statistics[0].Position);

	handleStatusLabel("Fastest Lap: ", "colorClassData");
};
