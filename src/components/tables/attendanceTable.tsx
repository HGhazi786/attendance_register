// import { getNewestUser, getOldestUser, getUser } from "@/lib/actions";
import Link from "next/link";
import React from "react";
import { DeleteUser } from "../shared/deleteEntry";
import { DrawerDialogDemo } from "../forms/attendanceForm";
import { getSpecAttendance } from "@/lib/action";

interface filter {
  fltr: string;
  id:number
}

export default async function RecordTable(props: filter) {
  const data = await getSpecAttendance(props.id);
  return (
    <table className="text-sm text-left rtl:text-right text-gray-100 w-full">
      <thead className="text-xs uppercase bg-slate-950 text-gray-100 rounded-xl">
        <tr>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Reason
          </th>
        </tr>
      </thead>
      <tbody className="glassmorphism">
        {
          // @ts-ignore
          data?.map((item: any) => (
            <tr
              key={item.id}
              className=" border-b border-slate-800 rounded-3xl hover:bg-slate-800"
            >
              <th
                scope="row"
                className="flex items-center px-6 py-4 whitespace-nowrap text-white"
              >
                {item.date}
              </th>
              <td className="px-6 py-4">{item.attendance_type}</td>
              <td className="px-6 py-4">{item.reason}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
