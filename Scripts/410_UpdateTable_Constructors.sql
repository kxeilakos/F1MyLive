/*
   Παρασκευή, 22 Φεβρουαρίου 20192:09:13 μμ
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
CREATE TABLE dbo.Tmp_Constructors
	(
	ConstructorId smallint NOT NULL,
	constructorRef nvarchar(MAX) NOT NULL,
	Name nvarchar(MAX) NOT NULL,
	Nationality nvarchar(MAX) NULL,
	Url nvarchar(MAX) NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_Constructors SET (LOCK_ESCALATION = TABLE)
GO
IF EXISTS(SELECT * FROM dbo.Constructors)
	 EXEC('INSERT INTO dbo.Tmp_Constructors (ConstructorId, constructorRef, Name, Nationality, Url)
		SELECT ConstructorId, constructorRef, Name, Nationality, Url FROM dbo.Constructors WITH (HOLDLOCK TABLOCKX)')
GO
DROP TABLE dbo.Constructors
GO
EXECUTE sp_rename N'dbo.Tmp_Constructors', N'Constructors', 'OBJECT' 
GO
ALTER TABLE dbo.Constructors ADD CONSTRAINT
	PK_Constructors PRIMARY KEY CLUSTERED 
	(
	ConstructorId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
COMMIT
select Has_Perms_By_Name(N'dbo.Constructors', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Constructors', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Constructors', 'Object', 'CONTROL') as Contr_Per 