﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class Circuit
	{
		public int Id { get; set; }
		public string CircuitRef { get; set; }
		public string Name { get; set; }
		public string Location { get; set; }
		public string Country { get; set; }
		public double lat { get; set; }
		public double lng { get; set; }
		public int alt { get; set; }
		public string Url { get; set; }
	}
}
