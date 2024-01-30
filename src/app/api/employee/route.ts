import { NextRequest, NextResponse } from "next/server";
import { attendance_records, db, employees } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export const GET = async () => {
  try {
    const res = await db.select().from(employees);
    const Items = res.map((item) => ({
      id:item.id,
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

export const POST = async (request: NextRequest) => {
  const req = await request.json();

  try {
    const res = await db
      .insert(employees)
      .values({
        service_no:req.service_no,
        name:req.name,
        email:req.email,
        category:req.category,
        designation:req.designation
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
      .update(employees)
      .set({ email: req.email, name: req.name, designation: req.designation, category:req.category, service_no:req.service_no})
      .where(eq(employees.id, req.id))
      .returning();

    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const DELETE =async () => {
  try {
    const res2 = await db.delete(attendance_records).returning();
    const res = await db.delete(employees).returning();

    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}