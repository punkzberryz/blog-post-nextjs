import {
  mysqlTable as sqlTable,
  serial,
  text,
  varchar,
  timestamp,
  int,
  uniqueIndex,
  index,
} from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";
export const users = sqlTable(
  "User",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 20 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().onUpdateNow().defaultNow(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("email_index").on(table.email),
    };
  }
);

export const posts = sqlTable(
  "Post",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 20 }).notNull(),
    body: text("body").notNull(),
    imageUrl: varchar("image_url", { length: 2024 }),
    authorId: int("author_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().onUpdateNow().defaultNow(),
  },
  (table) => {
    return {
      authorIndex: index("author_index").on(table.authorId),
    };
  }
);

export const comments = sqlTable(
  "Comment",
  {
    id: serial("id").primaryKey(),
    comment: text("comment").notNull(),
    postId: int("post_id").notNull(),
    authorId: int("author_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().onUpdateNow().defaultNow(),
  },
  (table) => {
    return {
      authorIndex: index("author_index").on(table.authorId),
      postIndex: index("post_index").on(table.postId),
    };
  }
);

export type User = InferModel<typeof users, "select">;
export type Post = InferModel<typeof posts>;
export type Comment = InferModel<typeof comments>;
