BEGIN;
--
-- Create model LatestPhrase
--
CREATE TABLE "acro_latestphrase" ("id" bigserial NOT NULL PRIMARY KEY, "sent" timestamp with time zone NOT NULL, "phrase" varchar(50) NOT NULL, "game_id" bigint NOT NULL, "user_id" bigint NOT NULL);
--
-- Create constraint latest_phrase_one_per_game_user on model latestphrase
--
ALTER TABLE "acro_latestphrase" ADD CONSTRAINT "latest_phrase_one_per_game_user" UNIQUE ("game_id", "user_id");
ALTER TABLE "acro_latestphrase" ADD CONSTRAINT "acro_latestphrase_game_id_de7268b5_fk_acro_activegame_id" FOREIGN KEY ("game_id") REFERENCES "acro_activegame" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "acro_latestphrase" ADD CONSTRAINT "acro_latestphrase_user_id_0d1ebf18_fk_acro_user_id" FOREIGN KEY ("user_id") REFERENCES "acro_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "acro_latestphrase_game_id_de7268b5" ON "acro_latestphrase" ("game_id");
CREATE INDEX "acro_latestphrase_user_id_0d1ebf18" ON "acro_latestphrase" ("user_id");
COMMIT;
