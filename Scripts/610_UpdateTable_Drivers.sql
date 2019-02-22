/*
   Παρασκευή, 22 Φεβρουαρίου 20192:12:32 μμ
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
CREATE TABLE dbo.Tmp_Drivers
	(
	DriverId smallint NOT NULL,
	DriverRef nvarchar(MAX) NOT NULL,
	Number smallint NULL,
	Code nvarchar(50) NULL,
	FirstName nvarchar(MAX) NOT NULL,
	LastName nvarchar(MAX) NOT NULL,
	DateOfBirth date NULL,
	Nationality nvarchar(MAX) NULL,
	Url nvarchar(MAX) NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_Drivers SET (LOCK_ESCALATION = TABLE)
GO
IF EXISTS(SELECT * FROM dbo.Drivers)
	 EXEC('INSERT INTO dbo.Tmp_Drivers (DriverId, DriverRef, Number, Code, FirstName, LastName, DateOfBirth, Nationality, Url)
		SELECT DriverId, DriverRef, Number, Code, FirstName, LastName, CONVERT(date, DateOfBirth), Nationality, Url FROM dbo.Drivers WITH (HOLDLOCK TABLOCKX)')
GO
DROP TABLE dbo.Drivers
GO
EXECUTE sp_rename N'dbo.Tmp_Drivers', N'Drivers', 'OBJECT' 
GO
ALTER TABLE dbo.Drivers ADD CONSTRAINT
	PK_Drivers PRIMARY KEY CLUSTERED 
	(
	DriverId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
COMMIT
select Has_Perms_By_Name(N'dbo.Drivers', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Drivers', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Drivers', 'Object', 'CONTROL') as Contr_Per 