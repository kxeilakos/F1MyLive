using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class Qualifying
	{
		public Int16 Id { get; set; }
		public Int16 RaceId { get; set; }
		public Int16 DriverId { get; set; }
		public Int16 ConstructorId { get; set; }
		public Int16 Number { get; set; }
		public Int16 Position { get; set; }
		public string Q1 { get; set; }
		public string Q2 { get; set; }
		public string Q3 { get; set; }
	}
}
