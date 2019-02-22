/*
   Παρασκευή, 22 Φεβρουαρίου 20192:14:57 μμ
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
CREATE TABLE dbo.Tmp_PitStops
	(
	RaceId smallint NOT NULL,
	DriverId smallint NOT NULL,
	Stop smallint NOT NULL,
	Lap smallint NOT NULL,
	Time time(7) NOT NULL,
	Duration nvarchar(MAX) NULL,
	Milliseconds int NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_PitStops SET (LOCK_ESCALATION = TABLE)
GO
IF EXISTS(SELECT * FROM dbo.PitStops)
	 EXEC('INSERT INTO dbo.Tmp_PitStops (RaceId, DriverId, Stop, Lap, Time, Duration, Milliseconds)
		SELECT RaceId, DriverId, Stop, Lap, Time, Duration, Milliseconds FROM dbo.PitStops WITH (HOLDLOCK TABLOCKX)')
GO
DROP TABLE dbo.PitStops
GO
EXECUTE sp_rename N'dbo.Tmp_PitStops', N'PitStops', 'OBJECT' 
GO
ALTER TABLE dbo.PitStops ADD CONSTRAINT
	PK_PitStops PRIMARY KEY CLUSTERED 
	(
	RaceId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
COMMIT
select Has_Perms_By_Name(N'dbo.PitStops', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.PitStops', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.PitStops', 'Object', 'CONTROL') as Contr_Per 