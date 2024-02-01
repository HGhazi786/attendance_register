import { db, attendance_records,employees } from "@/lib/drizzle";
import { eq, sql, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface emptype{
  id:number,
  service_no: number,
  name: string,
  email: string,
  category: string,
  designation: string,
}

interface curtype {
  service_no: number;
  name: string;
  designation: string;
  attendance_type: string;
}

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
    const cpl = await db
      .select({ compulsatoryLeaves: sql`COUNT(*)` })
      .from(attendance_records)
      .where(
        and(
          eq(attendance_records.employee_id, id),
          eq(attendance_records.attendance_type, "cpl")
        )
      );
    const Items = {
        cl: Number(cl[0].casualLeaves),
        pl: Number(pl[0].privilegedLeaves),
        sl: Number(sl[0].sickLeaves),
        cpl:Number(cpl[0].compulsatoryLeaves)
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

export async function getEmployees():Promise<emptype[]>{
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
      return ([]);
    }
};

export async function getTodayInsights():Promise<curtype[]>{
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
      service_no: Number(item.service_no),
      name: String(item.name),
      designation:String(item.designation),
      attendance_type: String(item.attendance_type),
     }));
    revalidatePath("/");
    return Items;
  } catch (error) {
    console.log(error);
    return[{
      service_no: 0,
      name:'',
      designation: '',
      attendance_type: '',
    }];
  }
}

export async function getSpecEmplyee(id:number) {
  try {
    // const mid = Number(params.id);
    const res = await db.select().from(employees).where(eq(employees.id, id));
    return res;
  } catch (error) {
    console.log(error);
    return ({
      Message: (error as { message: string }).message,
    });
  }

}

export async function getAllRecords(id:number){
  try {
    const records = await getUserInsights(id);
    const user = await getSpecEmplyee(id);
    // Merge the two objects into a single object
    // @ts-ignore
    const mergedItem = { ...records, ...user[0] };

    // Wrap the result in an array
    const result = mergedItem;
    return result;
  } catch (error) {
    console.log(error);
    return {
      Message: (error as { message: string }).message,
    };
  }
}

export async function getID(){
  try {
    // const mid = Number(params.id);
    const res = await db.select({id:employees.id}).from(employees);
    const responses = [];

  for (const { id } of res) {
      const response = await getAllRecords(id);
      responses.push(response);
  }
    return responses;
  } catch (error) {
    console.log(error);
    return {
      Message: (error as { message: string }).message,
    };
  }
}