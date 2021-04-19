BEGIN;
--
-- Add field acronym to game
--
ALTER TABLE "acro_game" ADD COLUMN "acronym_id" bigint NULL CONSTRAINT "acro_game_acronym_id_b7aa3f98_fk_acro_acronym_id" REFERENCES "acro_acronym"("id") DEFERRABLE INITIALLY DEFERRED; SET CONSTRAINTS "acro_game_acronym_id_b7aa3f98_fk_acro_acronym_id" IMMEDIATE;
CREATE INDEX "acro_game_acronym_id_b7aa3f98" ON "acro_game" ("acronym_id");
COMMIT;
