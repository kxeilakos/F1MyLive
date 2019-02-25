using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class Qualifying
	{
		public int Id { get; set; }
		public int RaceId { get; set; }
		public int DriverId { get; set; }
		public int ConstructorId { get; set; }
		public int Number { get; set; }
		public int Position { get; set; }
		public string Q1 { get; set; }
		public string Q2 { get; set; }
		public string Q3 { get; set; }
	}
}
