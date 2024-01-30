import { NextRequest, NextResponse } from "next/server";
import { db, employees } from "@/lib/drizzle";
import {eq} from "drizzle-orm";


export const GET = async (request:NextRequest) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search)
  const id = Number(searchParams.get("id"))
  try {
    // const mid = Number(params.id);
    const res = await db.select().from(employees).where(eq(employees.id, id));
   const Items = res.map((item) => ({
     service_no: item.service_no,
     name: item.name,
     designation: item.designation,
     category: item.category,
   }));
    return NextResponse.json(Items);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};
