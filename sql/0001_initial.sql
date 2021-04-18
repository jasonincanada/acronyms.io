BEGIN;
--
-- Create model User
--
CREATE TABLE "acro_user" ("id" bigserial NOT NULL PRIMARY KEY, "password" varchar(128) NOT NULL, "last_login" timestamp with time zone NULL, "is_superuser" boolean NOT NULL, "username" varchar(150) NOT NULL UNIQUE, "first_name" varchar(150) NOT NULL, "last_name" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "is_staff" boolean NOT NULL, "is_active" boolean NOT NULL, "date_joined" timestamp with time zone NOT NULL);
CREATE TABLE "acro_user_groups" ("id" bigserial NOT NULL PRIMARY KEY, "user_id" bigint NOT NULL, "group_id" integer NOT NULL);
CREATE TABLE "acro_user_user_permissions" ("id" bigserial NOT NULL PRIMARY KEY, "user_id" bigint NOT NULL, "permission_id" integer NOT NULL);
CREATE INDEX "acro_user_username_69653519_like" ON "acro_user" ("username" varchar_pattern_ops);
ALTER TABLE "acro_user_groups" ADD CONSTRAINT "acro_user_groups_user_id_group_id_96b6f0b0_uniq" UNIQUE ("user_id", "group_id");
ALTER TABLE "acro_user_groups" ADD CONSTRAINT "acro_user_groups_user_id_9de277d2_fk_acro_user_id" FOREIGN KEY ("user_id") REFERENCES "acro_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "acro_user_groups" ADD CONSTRAINT "acro_user_groups_group_id_ea768387_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "acro_user_groups_user_id_9de277d2" ON "acro_user_groups" ("user_id");
CREATE INDEX "acro_user_groups_group_id_ea768387" ON "acro_user_groups" ("group_id");
ALTER TABLE "acro_user_user_permissions" ADD CONSTRAINT "acro_user_user_permissions_user_id_permission_id_cddd57be_uniq" UNIQUE ("user_id", "permission_id");
ALTER TABLE "acro_user_user_permissions" ADD CONSTRAINT "acro_user_user_permissions_user_id_b6edfad7_fk_acro_user_id" FOREIGN KEY ("user_id") REFERENCES "acro_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "acro_user_user_permissions" ADD CONSTRAINT "acro_user_user_permi_permission_id_5592f2d4_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "acro_user_user_permissions_user_id_b6edfad7" ON "acro_user_user_permissions" ("user_id");
CREATE INDEX "acro_user_user_permissions_permission_id_5592f2d4" ON "acro_user_user_permissions" ("permission_id");
COMMIT;
