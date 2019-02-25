using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class PitStop
	{
		public int Id { get; set; }
		public Int16 RaceId { get; set; }
		public Int16 DriverId { get; set; }
		public Int16 Stop { get; set; }
		public Int16 Lap { get; set; }
		public TimeSpan Time { get; set; }
		public string Duration { get; set; }
		public int Milliseconds { get; set; }
	}
}
