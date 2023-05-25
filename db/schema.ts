import {
  mysqlTable as sqlTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

export const user = sqlTable("user", {
  id: serial("id").primaryKey(),
});
