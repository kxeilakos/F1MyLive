using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Formula1MyLive.Model
{
	public class CampaignContactGroup
	{
		public Guid Id { get; set; }
		public Guid CampaignId { get; set; }
		public string OriginIntegrationId { get; set; }
		public short Type { get; set; }
		public string OutboundIntegrationId { get; set; }
		short CampaignWaveNumber { get; set; }
		public string Options { get; set; }
		public DateTime CreationTime { get; set; }
		public DateTime LastUpdateTime { get; set; }
	}
}
