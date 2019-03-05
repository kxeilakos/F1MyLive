using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Model
{
	public class WeatherForecastRequest
	{
		public float Lat { get; set; }
		public float Lng { get; set; }
		public float Time { get; set; }
	}
}
