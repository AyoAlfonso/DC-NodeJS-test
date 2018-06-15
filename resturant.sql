/*

 Source Server         : xserver-postgres
 Source Server Type    : PostgreSQL
 Source Server Version : 90510
 Source Host           : xserver:5432
 Source Catalog        : truenorth_db
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 90510
 File Encoding         : 65001

 Date: 20/11/2017 15:22:57
*/

-- ----------------------------
-- Sequence structure for tbl_meal_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_meal_id_seq";
CREATE SEQUENCE "public"."tbl_meal_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_order_detail_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_order_detail_id_seq";
CREATE SEQUENCE "public"."tbl_order_detail_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_order_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_order_id_seq";
CREATE SEQUENCE "public"."tbl_order_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_restorant_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_restorant_id_seq";
CREATE SEQUENCE "public"."tbl_restorant_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_review_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_review_id_seq";
CREATE SEQUENCE "public"."tbl_review_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for tbl_meal
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_meal";
CREATE TABLE "public"."tbl_meal" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_meal_id_seq'::regclass),
  "restorant_id" int4 NOT NULL DEFAULT NULL,
  "name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL::character varying,
  "description" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL::character varying,
  "price" numeric(10,2) NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of tbl_meal
-- ----------------------------
INSERT INTO "public"."tbl_meal" VALUES (3, 1, 'Beet Salad with Candied Marcona Almonds', 'imports from Spain. To help mellow the vinegar''s tang, Corry reduces tangerine juice to a syrup and adds it to the dressing. Inspired by peanut brittle, he candies marcona almonds to give the salad crunch. The nuts are fantastic on their own.', 40.00);

-- ----------------------------
-- Table structure for tbl_order
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_order";
CREATE TABLE "public"."tbl_order" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_order_id_seq'::regclass),
  "restorant_id" int4 NOT NULL DEFAULT NULL,
  "total" numeric(10,2) NOT NULL DEFAULT 0,
  "address" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL::character varying,
  "customer" varchar(120) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "eta" varchar(30) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "location" varchar(30) COLLATE "pg_catalog"."default" DEFAULT NULL
)
;

-- ----------------------------
-- Records of tbl_order
-- ----------------------------
INSERT INTO "public"."tbl_order" VALUES (4, 2, 140.00, 'La Jolla, San Diego, CA', 'Jose Smith', '2 days 5 hours', '32.842674,-117.257767');
INSERT INTO "public"."tbl_order" VALUES (5, 1, 140.00, 'La Jolla, San Diego, CA', 'Jose Smith', '5 hours 54 mins', '32.842674,-117.257767');

-- ----------------------------
-- Table structure for tbl_order_detail
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_order_detail";
CREATE TABLE "public"."tbl_order_detail" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_order_detail_id_seq'::regclass),
  "order_id" int4 NOT NULL DEFAULT NULL,
  "meal" varchar(200) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL::character varying,
  "quantity" int2 NOT NULL DEFAULT 0,
  "price" numeric(10,2) NOT NULL DEFAULT 0,
  "subtotal" numeric(10,2) NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of tbl_order_detail
-- ----------------------------
INSERT INTO "public"."tbl_order_detail" VALUES (7, 4, 'Pasta Super', 1, 50.00, 50.00);
INSERT INTO "public"."tbl_order_detail" VALUES (8, 4, 'Fried Fish', 2, 45.00, 90.00);
INSERT INTO "public"."tbl_order_detail" VALUES (9, 5, 'Pasta Super', 1, 50.00, 50.00);
INSERT INTO "public"."tbl_order_detail" VALUES (10, 5, 'Fried Fish', 2, 45.00, 90.00);

-- ----------------------------
-- Table structure for tbl_restorant
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_restorant";
CREATE TABLE "public"."tbl_restorant" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_restorant_id_seq'::regclass),
  "logo" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL::character varying,
  "commercial_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL::character varying,
  "legal_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL::character varying,
  "commercial_email" varchar(120) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL::character varying,
  "admin_number" varchar(100) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "address" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "location" varchar(30) COLLATE "pg_catalog"."default" DEFAULT NULL
)
;

-- ----------------------------
-- Records of tbl_restorant
-- ----------------------------
INSERT INTO "public"."tbl_restorant" VALUES (3, 'www.caracasbbqsmokehouse.com', 'Caracas BBQ smoke house', 'Caracas BBQ smoke house', 'contact@ccsbbqsh.com', '555-4423424', 'someplace..', NULL);
INSERT INTO "public"."tbl_restorant" VALUES (2, 'www.bistro.com', 'my bistro', 'bistro', 'contact@bistro.com', '555-4423424', 'San Francisco CA', '40.7421,-73.9914');
INSERT INTO "public"."tbl_restorant" VALUES (1, 'www.myrestorant.com/img/logo.png', 'My Restorant', 'very good rest', 'contact@myrestorant.com', '555-4234234', 'Temecula, CA', '33.487007, -117.143784');

-- ----------------------------
-- Table structure for tbl_review
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_review";
CREATE TABLE "public"."tbl_review" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_review_id_seq'::regclass),
  "restorant_id" int4 NOT NULL DEFAULT NULL,
  "review" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "rating" int2 NOT NULL DEFAULT 0,
  "name" varchar(120) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL::character varying
)
;

-- ----------------------------
-- Records of tbl_review
-- ----------------------------
INSERT INTO "public"."tbl_review" VALUES (2, 2, 'i won''t comeback to this place, awful', 1, 'Jose Lopez');
INSERT INTO "public"."tbl_review" VALUES (3, 2, 'Tha''s was excellent, very good food', 4, 'Maria Rivera');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_meal_id_seq"
OWNED BY "public"."tbl_meal"."id";
SELECT setval('"public"."tbl_meal_id_seq"', 4, true);
ALTER SEQUENCE "public"."tbl_order_detail_id_seq"
OWNED BY "public"."tbl_order_detail"."id";
SELECT setval('"public"."tbl_order_detail_id_seq"', 11, true);
ALTER SEQUENCE "public"."tbl_order_id_seq"
OWNED BY "public"."tbl_order"."id";
SELECT setval('"public"."tbl_order_id_seq"', 6, true);
ALTER SEQUENCE "public"."tbl_restorant_id_seq"
OWNED BY "public"."tbl_restorant"."id";
SELECT setval('"public"."tbl_restorant_id_seq"', 3, true);
ALTER SEQUENCE "public"."tbl_review_id_seq"
OWNED BY "public"."tbl_review"."id";
SELECT setval('"public"."tbl_review_id_seq"', 4, true);

-- ----------------------------
-- Primary Key structure for table tbl_meal
-- ----------------------------
ALTER TABLE "public"."tbl_meal" ADD CONSTRAINT "tbl_meal_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_order
-- ----------------------------
ALTER TABLE "public"."tbl_order" ADD CONSTRAINT "tbl_order_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_order_detail
-- ----------------------------
ALTER TABLE "public"."tbl_order_detail" ADD CONSTRAINT "tbl_order_detail_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_restorant
-- ----------------------------
ALTER TABLE "public"."tbl_restorant" ADD CONSTRAINT "tbl_restorant_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_review
-- ----------------------------
ALTER TABLE "public"."tbl_review" ADD CONSTRAINT "tbl_review_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_meal
-- ----------------------------
ALTER TABLE "public"."tbl_meal" ADD CONSTRAINT "tbl_meal_restorant_id_fkey" FOREIGN KEY ("restorant_id") REFERENCES "tbl_restorant" ("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table tbl_order
-- ----------------------------
ALTER TABLE "public"."tbl_order" ADD CONSTRAINT "tbl_order_restorant_id_fkey" FOREIGN KEY ("restorant_id") REFERENCES "tbl_restorant" ("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table tbl_order_detail
-- ----------------------------
ALTER TABLE "public"."tbl_order_detail" ADD CONSTRAINT "tbl_order_detail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "tbl_order" ("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table tbl_review
-- ----------------------------
ALTER TABLE "public"."tbl_review" ADD CONSTRAINT "tbl_review_restorant_id_fkey" FOREIGN KEY ("restorant_id") REFERENCES "tbl_restorant" ("id") ON DELETE CASCADE ON UPDATE RESTRICT;
