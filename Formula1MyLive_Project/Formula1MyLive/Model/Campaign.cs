using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Model
{
	public class Campaign
	{
		public Guid Id { get; set; }
		public string Code { get; set; }
		public short Status { get; set; }
		public string OriginIntegrationId { get; set; }
		public short OriginProvider { get; set; }
		public string OutboundIntegrationId { get; set; }
		public short OutboundType { get; set; }
		public short OutboundProvider { get; set; }
		public string OutboundOptions { get; set; }
		public DateTime CreationTime { get; set; }
		public DateTime LastUpdateTime { get; set; }
	}
}
