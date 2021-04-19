BEGIN;
--
-- Alter field acronym on game
--
SET CONSTRAINTS "acro_game_acronym_id_b7aa3f98_fk_acro_acronym_id" IMMEDIATE; ALTER TABLE "acro_game" DROP CONSTRAINT "acro_game_acronym_id_b7aa3f98_fk_acro_acronym_id";
ALTER TABLE "acro_game" ALTER COLUMN "acronym_id" SET NOT NULL;
ALTER TABLE "acro_game" ADD CONSTRAINT "acro_game_acronym_id_b7aa3f98_fk_acro_acronym_id" FOREIGN KEY ("acronym_id") REFERENCES "acro_acronym" ("id") DEFERRABLE INITIALLY DEFERRED;
COMMIT;
