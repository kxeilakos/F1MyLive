using Formula1MyLive.Configuration;
using Formula1MyLive.Database.Model;
using Formula1MyLive.Interfaces;
using Formula1MyLive.Model;
using Formula1MyLive.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Formula1MyLive.Controllers
{
	[Route("api/weatherforecasts")]
	public class WeatherForecastsControllers: Controller
	{
		private readonly DbContextService _dbContextService;
		private readonly AppConfigurationService _appConfigurationService;
		private readonly ILoggerManager _logger;
		private const string DefaultRaceTime = "T12:00:00";

		private IConfiguration _configuration { get; set; }

		public WeatherForecastsControllers( 
			AppConfigurationService appConfigurationService,
			DbContextService dbContextService,
			ILoggerManager logger)
		{
			_logger = logger;
			_appConfigurationService = appConfigurationService;
			_dbContextService = dbContextService;
		}

		[HttpPost]
		public async Task<WeatherForecastResponse> Get([FromBody]Request request)
		{
			Race raceOfCircuit = this._dbContextService.Race.Where(x => x.CircuitId == request.CircuitId && x.Year == request.Year).FirstOrDefault();
			if (raceOfCircuit == null) throw new Exception($"Could not retrieve Race data for Year: {request.Year.ToString()} and Circuit: {request.CircuitId}");

			Circuit circuit = this._dbContextService.Circuit.Where(x => x.Id == request.CircuitId).FirstOrDefault();
			if (circuit == null) throw new Exception($"Could not retrieve Circuit data for Circuit: {request.CircuitId}");

			WeatherForecastResponse weatherForecastResponse = new WeatherForecastResponse();
			if (circuit.lat.HasValue && circuit.lng.HasValue)
			{
				HttpClient Client = new HttpClient();
				string url = ConstructWeatherForecastResponseQueryString(circuit, raceOfCircuit);
				var response = await Client.GetAsync(url);
				string jsonResponse = response.Content.ReadAsStringAsync().Result;

				weatherForecastResponse = JsonConvert.DeserializeObject<WeatherForecastResponse>(jsonResponse);
			}

			return weatherForecastResponse;
		}

		#region Helpers

		private string ConstructWeatherForecastResponseQueryString(Circuit circuit, Race raceOfCircuit)
		{
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.Append(_appConfigurationService.WeatherForecastBaseUrl);
			stringBuilder.Append("/");
			stringBuilder.Append(_appConfigurationService.WeatherForecastKey);
			stringBuilder.Append("/");
			stringBuilder.Append(circuit.lat.Value.ToString().Replace(",", ".").Trim());
			stringBuilder.Append("/");
			stringBuilder.Append(circuit.lng.Value.ToString().Replace(",", ".").Trim());
			stringBuilder.Append("/");
			stringBuilder.Append(raceOfCircuit.Date.ToString("s").Split("T").First());
			stringBuilder.Append("T");
			string timeOfRace = raceOfCircuit.Time.HasValue ? raceOfCircuit.Time.Value.ToString() : DefaultRaceTime;
			stringBuilder.Append(timeOfRace);
			stringBuilder.Append("?exclude = currently,flags,daily,minutely&units=si");

			return stringBuilder.ToString();
		}

		#endregion

	}
}
