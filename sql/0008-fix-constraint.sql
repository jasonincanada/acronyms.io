BEGIN;
--
-- Remove constraint active_game_unique from model activegame
--
ALTER TABLE "acro_activegame" DROP CONSTRAINT "active_game_unique";
--
-- Create constraint one_active_game_per_room on model activegame
--
ALTER TABLE "acro_activegame" ADD CONSTRAINT "one_active_game_per_room" UNIQUE ("room_id");
COMMIT;
