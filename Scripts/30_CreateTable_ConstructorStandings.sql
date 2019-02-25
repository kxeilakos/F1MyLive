USE [F1Statistics]
GO

/****** Object:  Table [dbo].[ConstructorStanding]    Script Date: 25/2/2019 12:06:08 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ConstructorStanding](
	[Id] [smallint] NOT NULL,
	[RaceId] [smallint] NOT NULL,
	[ConstructorId] [smallint] NOT NULL,
	[Points] [int] NOT NULL,
	[Position] [smallint] NULL,
	[PositionText] [nvarchar](max) NULL,
	[Wins] [smallint] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[ConstructorStanding] ADD  CONSTRAINT [DF_ConstructorStandings_Wins]  DEFAULT ((0)) FOR [Wins]
GO


