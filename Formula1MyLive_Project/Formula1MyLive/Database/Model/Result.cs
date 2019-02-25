using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class Result
	{
		public int Id { get; set; }
		public int RaceId { get; set; }
		public int DriverId { get; set; }
		public int ConstructorId { get; set; }
		public int Number { get; set; }
		public int Grid { get; set; }
		public int Position { get; set; }
		public string PositionText { get; set; }
		public int PositionOrder { get; set; }
		public int Points { get; set; }
		public int Laps { get; set; }
		public string Time { get; set; }
		public int Milliseconds { get; set; }
		public int FastestLap { get; set; }
		public int Rank { get; set; }
		public string FastestLapTime { get; set; }
		public string FastestLapSpeed { get; set; }
		public int StatusId {get;set;}
	}
}
