BEGIN;
--
-- Create model Room
--
CREATE TABLE "acro_room" ("id" bigserial NOT NULL PRIMARY KEY, "slug" varchar(50) NOT NULL);
--
-- Create model Game
--
CREATE TABLE "acro_game" ("id" bigserial NOT NULL PRIMARY KEY, "acronym" varchar(50) NOT NULL, "phase" varchar(1) NOT NULL, "room_id" bigint NOT NULL);
ALTER TABLE "acro_game" ADD CONSTRAINT "acro_game_room_id_f5913a42_fk_acro_room_id" FOREIGN KEY ("room_id") REFERENCES "acro_room" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "acro_game_room_id_f5913a42" ON "acro_game" ("room_id");
COMMIT;
