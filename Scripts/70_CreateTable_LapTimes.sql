USE [F1Statistics]
GO

/****** Object:  Table [dbo].[LapTime]    Script Date: 25/2/2019 12:07:00 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[LapTime](
	[RaceId] [smallint] NULL,
	[DriverId] [smallint] NULL,
	[Lap] [smallint] NULL,
	[Position] [smallint] NULL,
	[Time] [nvarchar](max) NULL,
	[Milliseconds] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


