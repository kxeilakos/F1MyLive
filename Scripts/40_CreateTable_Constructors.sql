USE [F1Statistics]
GO

/****** Object:  Table [dbo].[Constructor]    Script Date: 25/2/2019 12:05:31 μμ ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Constructor](
	[Id] [smallint] NOT NULL,
	[ConstructorRef] [nvarchar](max) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Nationality] [nvarchar](max) NULL,
	[Url] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Constructors] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


