/*
   Παρασκευή, 22 Φεβρουαρίου 20191:21:40 μμ
   User: 
   Server: DEVEL-20\SQLEXPRESS
   Database: F1SampleDb
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.LapTimes
	(
	RaceId smallint NOT NULL,
	DriverId smallint NOT NULL,
	Lap smallint NOT NULL,
	Position smallint NULL,
	Time nvarchar(MAX) NULL,
	Milliseconds int NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.LapTimes ADD CONSTRAINT
	PK_LapTimes PRIMARY KEY CLUSTERED 
	(
	RaceId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.LapTimes SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.LapTimes', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.LapTimes', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.LapTimes', 'Object', 'CONTROL') as Contr_Per 