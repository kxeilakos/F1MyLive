using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class DriverStanding
	{
		public int Id { get; set; }
		public Int16 RaceId { get; set; }
		public Int16 DriverId { get; set; }
		public int Points { get; set; }
		public Int16 Position { get; set; }
		public string PositionText { get; set; }
		public Int16 Wins { get; set; }
	}
}
