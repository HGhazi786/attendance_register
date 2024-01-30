import { NextRequest, NextResponse } from "next/server";
import { db, attendance_records, employees } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export const DELETE = async (request:NextRequest) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = Number(searchParams.get("id"));

  try {
    const res = await db
      .delete(attendance_records)
      .where(eq(attendance_records.employee_id, id))
      .returning();
    const res2 = await db
      .delete(employees)
      .where(eq(employees.id, id))
      .returning();

    return NextResponse.json({ res2 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};
