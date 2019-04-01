using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Model
{
	public class WeatherForecastResponse
	{
		public int StatusCode { get; set; }
		public bool IsSuccessStatusCode { get; set; }

		public string Message { get; set; }

		[JsonProperty(PropertyName = "offset")]
		public double  Offset { get; set; }

		[JsonProperty(PropertyName = "latitude")]
		public string Latitude { get; set; }

		[JsonProperty(PropertyName = "longitude")]
		public string Longitude { get; set; }

		[JsonProperty(PropertyName = "timezone")]
		public string Timezone { get; set; }

		[JsonProperty(PropertyName = "daily")]
		public DailyDataItems Daily { get; set; }
		
	}

	public class DailyDataItems
	{
		[JsonProperty(PropertyName = "data")]
		public List<DailyData> Data { get; set; }
	}

	public class DailyData
	{
		[JsonProperty(PropertyName = "time")]
		public long Time { get; set; }

		[JsonProperty(PropertyName = "summary")]
		public string Summary { get; set; }

		[JsonProperty(PropertyName = "icon")]
		public string Icon { get; set; }

		[JsonProperty(PropertyName = "temperatureHigh")]
		public double TemperatureHigh { get; set; }

		[JsonProperty(PropertyName = "temperatureLow")]
		public double TemperatureLow { get; set; }

		[JsonProperty(PropertyName = "apparentTemperatureHigh")]
		public double ApparentTemperatureHigh { get; set; }

		[JsonProperty(PropertyName = "apparentTemperatureLow")]
		public double ApparentTemperatureLow { get; set; }

		[JsonProperty(PropertyName = "humidity")]
		public double Humidity { get; set; }

		[JsonProperty(PropertyName = "windSpeed")]
		public double wWndSpeed { get; set; }
	}
}
