/*
   Παρασκευή, 22 Φεβρουαρίου 20192:02:07 μμ
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
CREATE TABLE dbo.Tmp_Circuits
	(
	CircuitId smallint NOT NULL,
	CircuitRef nvarchar(MAX) NULL,
	Name nvarchar(MAX) NOT NULL,
	Location nvarchar(MAX) NULL,
	Country nvarchar(MAX) NULL,
	lat float(53) NULL,
	lng float(53) NULL,
	alt smallint NULL,
	url nvarchar(MAX) NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_Circuits SET (LOCK_ESCALATION = TABLE)
GO
IF EXISTS(SELECT * FROM dbo.Circuits)
	 EXEC('INSERT INTO dbo.Tmp_Circuits (CircuitId, CircuitRef, Name, Location, Country, lat, lng, alt, url)
		SELECT CircuitId, CONVERT(nvarchar(MAX), CircuitRef), CONVERT(nvarchar(MAX), Name), CONVERT(nvarchar(MAX), Location), CONVERT(nvarchar(MAX), Country), lat, lng, alt, url FROM dbo.Circuits WITH (HOLDLOCK TABLOCKX)')
GO
DROP TABLE dbo.Circuits
GO
EXECUTE sp_rename N'dbo.Tmp_Circuits', N'Circuits', 'OBJECT' 
GO
ALTER TABLE dbo.Circuits ADD CONSTRAINT
	PK_Circuits PRIMARY KEY CLUSTERED 
	(
	CircuitId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
COMMIT
select Has_Perms_By_Name(N'dbo.Circuits', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Circuits', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Circuits', 'Object', 'CONTROL') as Contr_Per 