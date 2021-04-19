BEGIN;
--
-- Rename field acronym on game to acrotext
--
ALTER TABLE "acro_game" RENAME COLUMN "acronym" TO "acrotext";
COMMIT;
