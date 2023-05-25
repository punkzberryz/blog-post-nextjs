import {
  mysqlTable as sqlTable,
  serial,
  text,
  varchar,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";

export const users = sqlTable("user", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 20 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { fsp: 2 }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { fsp: 2 }).notNull().defaultNow(),
});

export const posts = sqlTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 20 }).notNull(),
  body: text("body").notNull(),
  imageUrl: varchar("image_url", { length: 2024 }),
  authorId: int("author_id").references(() => users.id),
  createdAt: timestamp("created_at", { fsp: 2 }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { fsp: 2 }).notNull().defaultNow(),
});

export const comments = sqlTable("comment", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
  postId: int("post_id").references(() => posts.id),
  authorId: int("author_id").references(() => users.id),
  createdAt: timestamp("created_at", { fsp: 2 }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { fsp: 2 }).notNull().defaultNow(),
});

// import { Kysely, sql } from "kysely";

// export async function up(db: Kysely<any>): Promise<void> {
//   await db.schema
//     .createTable("user")
//     .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
//     .addColumn("username", "varchar(20)", (col) => col.notNull())
//     .addColumn("email", "varchar(256)", (col) => col.notNull())
//     .addColumn("password", "varchar(256)", (col) => col.notNull())
//     .addColumn("created_at", "timestamp", (col) =>
//       col.defaultTo(sql`now()`).notNull()
//     )
//     .addColumn("updated_at", "timestamp", (col) =>
//       col
//         .onUpdate("set default")
//         .defaultTo(sql`now()`)
//         .notNull()
//     )
//     .execute();

//   await db.schema
//     .createTable("post")
//     .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
//     .addColumn("title", "varchar(255)", (col) => col.notNull())
//     .addColumn("body", "text", (col) => col.notNull())
//     .addColumn("image_url", "varchar(2024)")
//     .addColumn("author_id", "integer", (col) => col.notNull())
//     .addColumn("created_at", "timestamp", (col) =>
//       col.defaultTo(sql`now()`).notNull()
//     )
//     .addColumn("updated_at", "timestamp", (col) =>
//       col
//         .onUpdate("set default")
//         .defaultTo(sql`now()`)
//         .notNull()
//     )
//     .addForeignKeyConstraint(
//       "post_author_id_fk",
//       ["author_id"],
//       "user",
//       ["id"],
//       (cb) => cb.onDelete("cascade")
//     )
//     .execute();

//   await db.schema
//     .createTable("comment")
//     .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
//     .addColumn("comment", "text", (col) => col.notNull())
//     .addColumn("author_id", "integer", (col) => col.notNull())
//     .addColumn("post_id", "integer", (col) => col.notNull())
//     .addColumn("created_at", "timestamp", (col) =>
//       col.defaultTo(sql`now()`).notNull()
//     )
//     .addColumn("updated_at", "timestamp", (col) =>
//       col
//         .onUpdate("set default")
//         .defaultTo(sql`now()`)
//         .notNull()
//     )
//     .addForeignKeyConstraint(
//       "comment_author_id_fk",
//       ["author_id"],
//       "user",
//       ["id"],
//       (cb) => cb.onDelete("cascade")
//     )
//     .addForeignKeyConstraint(
//       "comment_post_id_fk",
//       ["post_id"],
//       "post",
//       ["id"],
//       (cb) => cb.onDelete("cascade")
//     )
//     .execute();

//   await db.schema
//     .createIndex("post_author_id_index")
//     .on("post")
//     .column("author_id")
//     .execute();

//   await db.schema
//     .createIndex("comment_author_id_index")
//     .on("comment")
//     .column("author_id")
//     .execute();

//   await db.schema
//     .createIndex("comment_post_id_index")
//     .on("comment")
//     .column("post_id")
//     .execute();
// }

// export async function down(db: Kysely<any>): Promise<void> {
//   await db.schema.dropTable("comment").execute();
//   await db.schema.dropTable("post").execute();
//   await db.schema.dropTable("user").execute();
// }
