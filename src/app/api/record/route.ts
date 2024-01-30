import { NextRequest, NextResponse } from "next/server";
import { db, attendance_records } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";


export const POST = async (request: NextRequest) => {
  const req = await request.json();

  try {
    const res = await db
      .insert(attendance_records)
      .values({
        attendance_type: req.attendance_type,
        reason:req.reason,
        date:req.date,
        employee_id:req.employee_id
      })
      .returning();
    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const PUT = async (request: NextRequest) => {
  const req = await request.json();
  console.log(req);
  try {
    const res = await db
      .update(attendance_records)
      .set({
        attendance_type: req.attendance_type,
        reason: req.reason,
        date: req.date,
        employee_id: req.employee_id,
      })
      .where(
        and(
          eq(attendance_records.date, req.date),
          eq(attendance_records.id, req.id)
        )
      )
      .returning();

    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const DELETE = async () => {
  try {
    const res = await db.delete(attendance_records).returning();

    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};