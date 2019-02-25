using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class LapTime
	{
		public int RaceId { get; set; }
		public int DriverId { get; set; }
		public int Lap { get; set; }
		public int Position { get; set; }
		public string Time { get; set; }
		public int Milliseconds { get; set; }
	}
}
