using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class LapTimeWithQualifiersAndConstructors: LapTime
	{
		public Int16 ConstructorId { get; set; }
		public string ConstructorName { get; set; }
		public PositionStatus PositionStatus { get; set; }
		public string DriverName { get; set; }
		public string DriverNumber { get; set; }
	}
}
