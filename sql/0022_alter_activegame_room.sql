BEGIN;
--
-- Alter field room on activegame
--
SET CONSTRAINTS "acro_activegame_room_id_43469a0a_fk_acro_room_id" IMMEDIATE; ALTER TABLE "acro_activegame" DROP CONSTRAINT "acro_activegame_room_id_43469a0a_fk_acro_room_id";
ALTER TABLE "acro_activegame" ADD CONSTRAINT "acro_activegame_room_id_43469a0a_uniq" UNIQUE ("room_id");
ALTER TABLE "acro_activegame" ADD CONSTRAINT "acro_activegame_room_id_43469a0a_fk_acro_room_id" FOREIGN KEY ("room_id") REFERENCES "acro_room" ("id") DEFERRABLE INITIALLY DEFERRED;
COMMIT;
