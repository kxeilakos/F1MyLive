using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Configuration
{
	public class AppConfigurationService
	{
		private IConfiguration _configuration { get; set; }

		public AppConfigurationService(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public string ApexBaseUrl { get { return this._configuration.GetSection("ApexApi:BaseUrl").Value; } }
		public string ApexKey { get { return this._configuration.GetSection("ApexApi:Key").Value; } }

		public string WeatherForecastBaseUrl { get { return this._configuration.GetSection("DarkSkyApi:BaseUrl").Value; } }
		public string WeatherForecastKey { get { return this._configuration.GetSection("DarkSkyApi:BaseUrl").Value; } }
	}
}
