using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class LapTime
	{
		public int Id { get; set;}
		public Int16 RaceId { get; set; }
		public Int16 DriverId { get; set; }
		public Int16 Lap { get; set; }
		public Int16 Position { get; set; }
		public string Time { get; set; }
		public int Milliseconds { get; set; }
	}
}
