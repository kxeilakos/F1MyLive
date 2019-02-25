USE [F1Statistics]
GO

/****** Object:  Table [dbo].[PitStop]    Script Date: 25/2/2019 12:07:16 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PitStop](
	[RaceId] [smallint] NOT NULL,
	[DriverId] [smallint] NOT NULL,
	[Stop] [smallint] NOT NULL,
	[Lap] [smallint] NOT NULL,
	[Time] [time](7) NOT NULL,
	[Duration] [nvarchar](max) NULL,
	[Milliseconds] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


