/*
   Παρασκευή, 22 Φεβρουαρίου 20191:06:26 μμ
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
CREATE TABLE dbo.Constructors
	(
	ConstructorId smallint NOT NULL,
	constructorRef nvarchar(MAX) NOT NULL,
	Name nvarchar(MAX) NOT NULL,
	Nationality nvarchar(MAX) NULL,
	Url nvarchar(MAX) NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Constructors ADD CONSTRAINT
	PK_Constructors PRIMARY KEY CLUSTERED 
	(
	ConstructorId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Constructors SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.Constructors', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.Constructors', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.Constructors', 'Object', 'CONTROL') as Contr_Per 