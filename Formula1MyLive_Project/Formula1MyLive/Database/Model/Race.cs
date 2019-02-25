using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class Race
	{
		public Int16 Id { get; set; }
		public Int16 Year { get; set; }
		public Int16 Round { get; set; }
		public Int16 CircuitId { get; set; }
		public string Name { get; set; }
		public DateTime Date {get;set;}
		public TimeSpan? Time { get; set; }
		public string Url { get; set; }
	}
}
