import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  return NextResponse.json({ hello: "world" });
  // return res.json({ hello: "world" });
}
