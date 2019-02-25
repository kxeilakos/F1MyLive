using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class ConstructorStanding
	{
		public int Id { get; set; }
		public int RaceId { get; set; }
		public int ConstructorId { get; set; }
		public int Points { get; set; }
		public int Position { get; set; }
		public string PositionText { get; set; }
		public int Wins { get; set; }
	}
}
