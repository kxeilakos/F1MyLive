using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class Race
	{
		public int Id { get; set; }
		public int Year { get; set; }
		public int Round { get; set; }
		public int CircuitId { get; set; }
		public string Name { get; set; }
		public DateTime Date {get;set;}
		public TimeSpan Time { get; set; }
		public string Url { get; set; }
	}
}
