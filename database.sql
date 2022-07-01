-- Adminer 4.8.1 PostgreSQL 10.14 dump

DROP TABLE IF EXISTS "customers";
DROP SEQUENCE IF EXISTS customers_id_seq;
CREATE SEQUENCE customers_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."customers" (
    "id" integer DEFAULT nextval('customers_id_seq') NOT NULL,
    "firstname" character varying(255),
    "lastname" character varying(255),
    "email" character varying(255),
    "password" character varying(255),
    "address" character varying(255),
    "city" character varying(255),
    "code" character varying(11),
    "updated_by" integer,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "customers" ("id", "firstname", "lastname", "email", "password", "address", "city", "code", "updated_by", "created_at", "updated_at") VALUES
(1,	'Customer',	'1',	'customer1@gmail.com',	'$2b$12$SQjfRCXTjH1gDkQnE/sFSOAbCLSKJxGP.ckNHjvjBZoSwsamaomg6',	'jl jalan',	'Bandung',	'C123',	NULL,	'2022-06-30 10:22:56.166+07',	'2022-06-30 10:22:56.166+07');

DROP TABLE IF EXISTS "item_galleries";
DROP SEQUENCE IF EXISTS item_galleries_id_seq;
CREATE SEQUENCE item_galleries_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 16 CACHE 1;

CREATE TABLE "public"."item_galleries" (
    "id" integer DEFAULT nextval('item_galleries_id_seq') NOT NULL,
    "id_item" integer,
    "picture" character varying(255),
    "created_by" integer,
    "updated_by" integer,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    CONSTRAINT "item_galleries_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "item_galleries" ("id", "id_item", "picture", "created_by", "updated_by", "created_at", "updated_at") VALUES
(13,	9,	'picture_1.jpg',	1,	NULL,	'2022-06-30 13:44:23.69+07',	'2022-06-30 13:44:23.69+07'),
(14,	9,	'picture_2.jpg',	1,	NULL,	'2022-06-30 13:44:23.691+07',	'2022-06-30 13:44:23.691+07');

DROP TABLE IF EXISTS "items";
DROP SEQUENCE IF EXISTS items_id_seq;
CREATE SEQUENCE items_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 10 CACHE 1;

CREATE TABLE "public"."items" (
    "id" integer DEFAULT nextval('items_id_seq') NOT NULL,
    "customer_code" character varying(11),
    "code" character varying(255),
    "title" character varying(255),
    "price" integer,
    "qty" integer,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    "updated_by" integer,
    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "items" ("id", "customer_code", "code", "title", "price", "qty", "created_at", "updated_at", "updated_by") VALUES
(9,	NULL,	'P001',	'Item 1',	129900,	12,	'2022-06-30 13:44:23.505+07',	'2022-06-30 13:44:23.505+07',	NULL);

DROP TABLE IF EXISTS "messages";
DROP SEQUENCE IF EXISTS messages_id_seq;
CREATE SEQUENCE messages_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."messages" (
    "id" integer DEFAULT nextval('messages_id_seq') NOT NULL,
    "id_customer" integer,
    "id_user" integer,
    "message" character varying(255),
    "status" integer,
    "created_by" integer,
    "updated_by" integer,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "order_details";
DROP SEQUENCE IF EXISTS order_details_id_seq;
CREATE SEQUENCE order_details_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."order_details" (
    "id" integer DEFAULT nextval('order_details_id_seq') NOT NULL,
    "order_id" integer,
    "item_id" integer,
    "price" integer,
    "qty" integer,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    CONSTRAINT "order_details_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "orders";
DROP SEQUENCE IF EXISTS orders_id_seq;
CREATE SEQUENCE orders_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."orders" (
    "id" integer DEFAULT nextval('orders_id_seq') NOT NULL,
    "customer_id" integer,
    "total" integer,
    "qty" integer,
    "status" character varying,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    "updated_by" integer,
    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "username" character varying(255),
    "name" character varying(255),
    "email" character varying(255),
    "password" character varying(255),
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    "updated_by" integer,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."item_galleries" ADD CONSTRAINT "item_galleries_created_by_fkey" FOREIGN KEY (created_by) REFERENCES customers(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."item_galleries" ADD CONSTRAINT "item_galleries_id_item_fkey" FOREIGN KEY (id_item) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2022-07-01 21:33:20.536166+07
