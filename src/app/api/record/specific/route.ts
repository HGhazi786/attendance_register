import { NextRequest, NextResponse } from "next/server";
import { db, attendance_records } from "@/lib/drizzle";
import {eq} from "drizzle-orm";

export const GET = async (request:NextRequest) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = Number(searchParams.get("id"));
  try {
    const mid = Number(id);
    const res = await db
      .select()
      .from(attendance_records)
      .where(eq(attendance_records.employee_id, mid));
    const Items = res.map((item: any) => ({
      date:item.date,
      attendance_type:item.attendance_type,
      reason:item.reason
    }));
    return NextResponse.json(Items);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};
