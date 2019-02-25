USE [F1Statistics]
GO

/****** Object:  Table [dbo].[DriverStanding]    Script Date: 25/2/2019 12:06:38 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DriverStanding](
	[Id] [int] NOT NULL,
	[RaceId] [smallint] NOT NULL,
	[DriverId] [smallint] NOT NULL,
	[Points] [int] NOT NULL,
	[Position] [smallint] NOT NULL,
	[PositionText] [nvarchar](max) NULL,
	[Wins] [smallint] NOT NULL,
 CONSTRAINT [PK_DriverStandings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[DriverStanding] ADD  CONSTRAINT [DF_DriverStandings_Wins]  DEFAULT ((0)) FOR [Wins]
GO


