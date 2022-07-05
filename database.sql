-- Adminer 4.8.1 PostgreSQL 10.14 dump

DROP TABLE IF EXISTS "SequelizeMeta";
CREATE TABLE "public"."SequelizeMeta" (
    "name" character varying(255) NOT NULL,
    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
) WITH (oids = false);

INSERT INTO "SequelizeMeta" ("name") VALUES
('20220603062331-create-users.js'),
('20220603062527-create-items.js'),
('20220603062837-create-orders.js'),
('20220603062934-create-order-details.js'),
('20220630015146-create-customers.js'),
('20220630020652-create-messages.js'),
('20220630021014-create-item-gallery.js'),
('20220704021021-create-sellers.js'),
('20220704235207-create-categories.js');

DROP TABLE IF EXISTS "categories";
DROP SEQUENCE IF EXISTS categories_id_seq;
CREATE SEQUENCE categories_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 4 CACHE 1;

CREATE TABLE "public"."categories" (
    "id" integer DEFAULT nextval('categories_id_seq') NOT NULL,
    "seotitle" character varying(255),
    "title" character varying(255),
    "created_by" integer,
    "updated_by" integer,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "categories" ("id", "seotitle", "title", "created_by", "updated_by", "created_at", "updated_at") VALUES
(2,	'category-1',	'Category 1',	1,	1,	'2022-07-05 08:22:21.458+07',	'2022-07-05 08:22:21.458+07'),
(3,	'category-2',	'Category 2',	1,	1,	'2022-07-05 09:22:47.825+07',	'2022-07-05 09:22:47.825+07'),
(4,	'category-3',	'Category 3',	1,	1,	'2022-07-05 09:23:08.269+07',	'2022-07-05 09:23:08.269+07');

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
CREATE SEQUENCE item_galleries_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 28 CACHE 1;

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
(21,	13,	'picture_1.jpg',	1,	NULL,	'2022-07-04 10:22:45.081+07',	'2022-07-04 10:22:45.081+07'),
(22,	13,	'picture_2.jpg',	1,	NULL,	'2022-07-04 10:22:45.082+07',	'2022-07-04 10:22:45.082+07'),
(23,	14,	'picture_1.jpg',	1,	NULL,	'2022-07-04 10:23:21.923+07',	'2022-07-04 10:23:21.923+07'),
(24,	14,	'picture_2.jpg',	1,	NULL,	'2022-07-04 10:23:21.923+07',	'2022-07-04 10:23:21.923+07'),
(25,	15,	'picture_15.jpg',	1,	NULL,	'2022-07-04 10:23:40.333+07',	'2022-07-04 10:23:40.333+07'),
(26,	15,	'picture_16.jpg',	1,	NULL,	'2022-07-04 10:23:40.333+07',	'2022-07-04 10:23:40.333+07'),
(27,	19,	'picture_1.jpg',	1,	NULL,	'2022-07-04 11:59:44.451+07',	'2022-07-04 11:59:44.451+07'),
(28,	19,	'picture_2.jpg',	1,	NULL,	'2022-07-04 11:59:44.452+07',	'2022-07-04 11:59:44.452+07');

DROP TABLE IF EXISTS "items";
DROP SEQUENCE IF EXISTS items_id_seq;
CREATE SEQUENCE items_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."items" (
    "id" integer DEFAULT nextval('items_id_seq') NOT NULL,
    "seller_code" character varying(11),
    "category_id" integer,
    "code" character varying(255),
    "seotitle" character varying(255) NOT NULL,
    "title" character varying(255),
    "price" integer,
    "qty" integer,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    "updated_by" integer,
    "created_by" integer,
    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "items" ("id", "seller_code", "category_id", "code", "seotitle", "title", "price", "qty", "created_at", "updated_at", "updated_by", "created_by") VALUES
(13,	'S6321',	1,	'P002',	'item-2',	'Item 2',	129900,	12,	'2022-07-04 10:22:45.045+07',	'2022-07-04 10:22:45.045+07',	NULL,	NULL),
(15,	'S6321',	1,	'P004',	'item-4',	'Item 4',	179900,	12,	'2022-07-04 10:23:40.309+07',	'2022-07-04 10:23:40.309+07',	NULL,	NULL),
(16,	'S6321',	2,	'P001',	'item-1',	'Item 1',	119900,	12,	'2022-07-04 11:40:59.714+07',	'2022-07-04 11:40:59.714+07',	NULL,	NULL),
(19,	'S6321',	2,	'P005',	'item-5',	'Item 5',	119900,	12,	'2022-07-04 11:59:44.413+07',	'2022-07-04 11:59:44.413+07',	NULL,	NULL),
(14,	'S6321',	3,	'P003',	'item-3',	'Item 3',	121900,	12,	'2022-07-04 10:23:21.917+07',	'2022-07-04 13:06:02.79+07',	NULL,	NULL);

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
CREATE SEQUENCE order_details_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 2 CACHE 1;

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

CREATE INDEX "order_details_item_id" ON "public"."order_details" USING btree ("item_id");

CREATE INDEX "order_details_order_id" ON "public"."order_details" USING btree ("order_id");


DROP TABLE IF EXISTS "orders";
DROP SEQUENCE IF EXISTS orders_id_seq;
CREATE SEQUENCE orders_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

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


DROP TABLE IF EXISTS "sellers";
DROP SEQUENCE IF EXISTS sellers_id_seq;
CREATE SEQUENCE sellers_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."sellers" (
    "id" integer DEFAULT nextval('sellers_id_seq') NOT NULL,
    "firstname" character varying(255),
    "lastname" character varying(255),
    "email" character varying(255),
    "password" character varying(255),
    "address" character varying(255),
    "city" character varying(255),
    "code" character varying(255),
    "updated_by" integer,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    CONSTRAINT "sellers_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "sellers" ("id", "firstname", "lastname", "email", "password", "address", "city", "code", "updated_by", "created_at", "updated_at") VALUES
(1,	'Seller',	'1',	'seller1@gmail.com',	'$2b$12$RF9.clCNEXC5NO23DNGsQe5XqZQT6MpqZVyUI35Tc4j6Z97L/kt8S',	'jl jalan seller',	'Bdg',	'S6321',	NULL,	'2022-07-04 09:34:24.129+07',	'2022-07-04 09:34:24.129+07');

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

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

INSERT INTO "users" ("id", "username", "name", "email", "password", "created_at", "updated_at", "updated_by") VALUES
(1,	'admin1',	'Admin 1',	'admin1@gmail.com',	'$2a$12$IQ43fmcuylGid/GjZgD4YeDinHQbp.RfxLWFT4X2IlHM.9qXwnw/u',	'2022-07-05 07:28:13.961+07',	'2022-07-05 07:28:13.961+07',	NULL);

ALTER TABLE ONLY "public"."item_galleries" ADD CONSTRAINT "item_galleries_created_by_fkey" FOREIGN KEY (created_by) REFERENCES customers(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."order_details" ADD CONSTRAINT "order_details_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2022-07-05 09:42:11.506396+07
