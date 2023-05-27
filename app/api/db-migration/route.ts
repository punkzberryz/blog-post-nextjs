import { NextResponse } from "next/server";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";

import { db } from "@/db/db";

export async function GET() {
  await migrate(db, { migrationsFolder: "./db/migrations" });

  return NextResponse.json({ hi: "hello" });
}
