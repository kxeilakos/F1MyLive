using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Model
{
	public class OverTake
	{
		public Int16 Id { get; set; }
		public Int16 Lap { get; set; }
		public string FromDriver { get; set; }
		public string ToDriver { get; set; }
	}
}
