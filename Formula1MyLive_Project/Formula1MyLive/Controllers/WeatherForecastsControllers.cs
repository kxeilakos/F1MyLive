using Formula1MyLive.Configuration;
using Formula1MyLive.Interfaces;
using Formula1MyLive.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Formula1MyLive.Controllers
{
	[Route("api/weatherforecasts")]
	public class WeatherForecastsControllers: Controller
	{
		private readonly ILoggerManager _logger;
		private readonly AppConfigurationService _appConfigurationService;

		private IConfiguration _configuration { get; set; }

		public WeatherForecastsControllers(ILoggerManager logger, AppConfigurationService appConfigurationService)
		{
			_logger = logger;
			_appConfigurationService = appConfigurationService;
		}

		[HttpGet]
		public IActionResult Get(/*[FromBody]WeatherForecastRequest request*/)
		{
			try
			{
				HttpClient Client = new HttpClient();
				string url = string.Empty;
				url = this._appConfigurationService.ApexBaseUrl + this._appConfigurationService.ApexKey;

				return Ok(url);

			}
			catch (Exception ex)
			{
				_logger.LogError("Internal server error" + ex.Message);
				return StatusCode(500, "Internal server error");
			}
		}

	}
}
