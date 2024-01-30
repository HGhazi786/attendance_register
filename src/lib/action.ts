"use server"
import { db, attendance_records,employees } from "@/lib/drizzle";
import { eq, sql, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// User Action
export async function getUserInsights(id:number) {
  try {
    const cl = await db.select({casualLeaves: sql`COUNT(*)`}).from(attendance_records).where(and(eq(attendance_records.employee_id,id),eq(attendance_records.attendance_type,'cl')))
    const pl = await db
      .select({ privilegedLeaves: sql`COUNT(*)` })
      .from(attendance_records)
      .where(
        and(
          eq(attendance_records.employee_id, id),
          eq(attendance_records.attendance_type, "pl")
        )
      );
    const sl = await db
        .select({ sickLeaves: sql`COUNT(*)` })
        .from(attendance_records)
        .where(and(eq(attendance_records.employee_id,id),eq(attendance_records.attendance_type, "sl")));
    const Items = {
        cl: Number(cl[0].casualLeaves),
        pl: Number(pl[0].privilegedLeaves),
        sl: Number(sl[0].sickLeaves),
    };
    revalidatePath("/");
    return Items;
  } catch (error) {
    console.log(error);
  }
}

export async function getSpecAttendance(id: number){
    try {
      const mid = Number(id);
      const res = await db
        .select()
        .from(attendance_records)
        .where(eq(attendance_records.employee_id, mid));
      const Items = res.map((item: any) => ({
        date: item.date,
        attendance_type: item.attendance_type,
        reason: item.reason,
      }));
      revalidatePath("/");
      return Items;
    } catch (error) {
      console.log(error);
      return ({
        Message: (error as { message: string }).message,
      });
    }
};

export async function getEmployees(){
    try {
      const res = await db
        .select()
        .from(employees)
      const Items = res.map((item: any) => ({
        id:item.id,
        service_no: item.service_no,
        name: item.name,
        email: item.email,
        category: item.category,
        designation: item.designation,
      }));
      revalidatePath("/");
      return Items;
    } catch (error) {
      console.log(error);
      return ({
        Message: (error as { message: string }).message,
      });
    }
};

export async function getTodayInsights(){
  const currentDate = new Date();
  const conDate = currentDate.toLocaleDateString().replace(/\//g, "-");
  try {
    const res = await db
      .select({
        service_no: employees.service_no,
        name: employees.name,
        designation: employees.designation,
        attendance_type: attendance_records.attendance_type,
      })
      .from(attendance_records)
      .fullJoin(employees, eq(employees.id, attendance_records.employee_id))
      .where(eq(attendance_records.date, String(conDate)));
     const Items = res.map((item: any) => ({
      service_no: item.service_no,
      name: item.name,
      email: item.email,
      designation:item.designation,
      attendance_type: item.attendance_type,

     }));
    revalidatePath("/");
    return Items;
  } catch (error) {
    console.log(error);
    return ({
      Message: (error as { message: string }).message,
    });
  }
}
