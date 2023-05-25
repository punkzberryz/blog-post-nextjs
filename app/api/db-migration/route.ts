import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
// import {  } from "@/db/schema";
import { db } from "@/db/schema";

export async function GET() {
  await migrate(db, { migrationsFolder: "./migrations-folder" });
  return NextResponse.json({ hi: "hello" });
}
