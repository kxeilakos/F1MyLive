using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Model
{
	public class WeatherForecastResponse
	{
		string Status { get; set; }
		string Message { get; set; }
		short Offset { get; set; }
		string Latitude { get; set; }
		string Longitude { get; set; }
		string Timezone { get; set; }
		string Daily { get; set; }
		List<DailyData> Data { get; set; }
	}

	public class DailyData
	{
		public long Time { get; set; }
		public string Summary { get; set; }
		public string Icon { get; set; }
		public double TemperatureHigh { get; set; }
		public double TemperatureLow { get; set; }
		public double ApparentTemperatureHigh { get; set; }
		public double ApparentTemperatureLow { get; set; }

	}
}
