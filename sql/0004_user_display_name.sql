BEGIN;
--
-- Add field display_name to user
--
ALTER TABLE "acro_user" ADD COLUMN "display_name" varchar(50) DEFAULT '' NOT NULL;
ALTER TABLE "acro_user" ALTER COLUMN "display_name" DROP DEFAULT;
COMMIT;
