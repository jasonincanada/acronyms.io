BEGIN;
--
-- Create model FinishedGame
--
CREATE TABLE "acro_finishedgame" ("id" bigserial NOT NULL PRIMARY KEY, "started" timestamp with time zone NOT NULL, "finished" timestamp with time zone NOT NULL, "acronym_id" bigint NOT NULL, "room_id" bigint NOT NULL);
--
-- Remove field game from activegame
--
ALTER TABLE "acro_activegame" DROP COLUMN "game_id" CASCADE;
--
-- Add field acronym to activegame
--
ALTER TABLE "acro_activegame" ADD COLUMN "acronym_id" bigint DEFAULT 3 NOT NULL CONSTRAINT "acro_activegame_acronym_id_3738041a_fk_acro_acronym_id" REFERENCES "acro_acronym"("id") DEFERRABLE INITIALLY DEFERRED; SET CONSTRAINTS "acro_activegame_acronym_id_3738041a_fk_acro_acronym_id" IMMEDIATE;
ALTER TABLE "acro_activegame" ALTER COLUMN "acronym_id" DROP DEFAULT;
--
-- Add field started to activegame
--
ALTER TABLE "acro_activegame" ADD COLUMN "started" timestamp with time zone DEFAULT '2021-04-19T22:36:07.985269+00:00'::timestamptz NOT NULL;
ALTER TABLE "acro_activegame" ALTER COLUMN "started" DROP DEFAULT;
--
-- Delete model Game
--
DROP TABLE "acro_game" CASCADE;
ALTER TABLE "acro_finishedgame" ADD CONSTRAINT "acro_finishedgame_acronym_id_a81b2b39_fk_acro_acronym_id" FOREIGN KEY ("acronym_id") REFERENCES "acro_acronym" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "acro_finishedgame" ADD CONSTRAINT "acro_finishedgame_room_id_852bb4e3_fk_acro_room_id" FOREIGN KEY ("room_id") REFERENCES "acro_room" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "acro_finishedgame_acronym_id_a81b2b39" ON "acro_finishedgame" ("acronym_id");
CREATE INDEX "acro_finishedgame_room_id_852bb4e3" ON "acro_finishedgame" ("room_id");
CREATE INDEX "acro_activegame_acronym_id_3738041a" ON "acro_activegame" ("acronym_id");
COMMIT;
