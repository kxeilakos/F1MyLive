/*
   Παρασκευή, 22 Φεβρουαρίου 20191:11:42 μμ
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
CREATE TABLE dbo.Drivers
	(
	DriverId smallint NOT NULL,
	DriverRef nvarchar(MAX) NULL,
	Number smallint NOT NULL,
	Code nvarchar(50) NULL,
	FirstName nvarchar(MAX) NOT NULL,
	LastName nvarchar(MAX) NOT NULL,
	DateOfBirth datetime NULL,
	Nationality nvarchar(MAX) NULL,
	Url nvarchar(MAX) NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Drivers ADD CONSTRAINT
	PK_Drivers PRIMARY KEY CLUSTERED 
	(
	DriverId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Drivers SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Drivers', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Drivers', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Drivers', 'Object', 'CONTROL') as Contr_Per 