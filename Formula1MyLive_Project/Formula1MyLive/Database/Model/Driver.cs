using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Database.Model
{
	public class Driver
	{
		public int Id { get; set; }
		public string DriverRef { get; set; }
		public int Number { get; set; }
		public string Code { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public DateTime DateOfBirth { get; set; }
		public string Nationality { get; set; }
		public string Url { get; set; }
	}
}

