import { NextRequest, NextResponse } from "next/server";
import { db, employees, attendance_records } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export const GET = async () => {
const currentDate = new Date()
const conDate=currentDate.toLocaleDateString().replace(/\//g, "-");
try {
    const res = await db
      .select(
        {
        service_no: employees.service_no,
        name: employees.name,
        designation: employees.designation,
        attendance_type: attendance_records.attendance_type,
      }
      )
      .from(attendance_records).fullJoin(employees,eq(employees.id,attendance_records.employee_id)).where(eq(attendance_records.date,String(conDate)))
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};
