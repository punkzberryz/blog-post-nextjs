import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
// import {  } from "@/db/schema";
import { db } from "@/db/db";

export async function GET() {
  await migrate(db, { migrationsFolder: "./db/migrations" });

  // // this will automatically run needed migrations on the database
  // migrate(db, { migrationsFolder: "./db/migrations" })
  //   .then(() => {
  //     console.log("Migrations complete!");
  //     process.exit(0);
  //   })
  //   .catch((err) => {
  //     console.error("Migrations failed!", err);
  //     process.exit(1);
  //   });

  return NextResponse.json({ hi: "hello" });
}
