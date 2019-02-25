USE [F1Statistics]
GO

/****** Object:  Table [dbo].[ConstructorResult]    Script Date: 25/2/2019 12:05:53 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ConstructorResult](
	[Id] [smallint] NOT NULL,
	[RaceId] [smallint] NOT NULL,
	[ConstructorId] [smallint] NOT NULL,
	[Points] [int] NULL,
	[Status] [nvarchar](max) NULL,
 CONSTRAINT [PK_ConstructorResults] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[ConstructorResult] ADD  CONSTRAINT [DF_ConstructorResults_Points]  DEFAULT ((0)) FOR [Points]
GO


