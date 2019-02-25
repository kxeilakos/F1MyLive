using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class PitStop
	{
		public int RaceId { get; set; }
		public int DriverId { get; set; }
		public int Stop { get; set; }
		public int Lap { get; set; }
		public TimeSpan Time { get; set; }
		public string Duration { get; set; }
		public int Milliseconds { get; set; }
	}
}
