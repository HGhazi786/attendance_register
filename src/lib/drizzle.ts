import {pgTable,varchar,integer,serial,text,date} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let conn;

if (!conn) {
  conn = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: Number(process.env.PGSQL_PORT),
    database: process.env.PGSQL_DATABASE,
  });
}

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  service_no: integer("service_no"),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 100 }),
  designation: varchar("designation", { length: 50 }),
  category: varchar("category", { length: 20 }),
});

export const attendance_records = pgTable("attendance_records", {
  id: serial("id").primaryKey(),
  attendance_type: varchar("attendance_type", { length: 10 }).notNull(),
  reason: text("reason"),
  employee_id: integer("employee_id").references(() => employees.id),
  date: date("date"),
});

export const db = drizzle(conn);