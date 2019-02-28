using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class Result
	{
		public int Id { get; set; }
		public Int16 RaceId { get; set; }
		public Int16 DriverId { get; set; }
		public Int16 ConstructorId { get; set; }
		public Int16? Number { get; set; }
		public Int16 Grid { get; set; }
		public Int16? Position { get; set; }
		public string PositionText { get; set; }
		public Int16 PositionOrder { get; set; }
		public int? Points { get; set; }
		public Int16 Laps { get; set; }
		public string Time { get; set; }
		public int? Milliseconds { get; set; }
		public Int16? FastestLap { get; set; }
		public Int16? Rank { get; set; }
		public string FastestLapTime { get; set; }
		public string FastestLapSpeed { get; set; }
		public Int16? StatusId {get;set;}
	}
}
