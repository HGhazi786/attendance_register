// import { getNewestUser, getOldestUser, getUser } from "@/lib/actions";
import Link from "next/link";
import React from "react";
import { DeleteUser } from "../shared/deleteEntry";
import { DrawerDialogDemo } from "../forms/attendanceForm";
import { getEmployees } from "@/lib/action";

interface filter{
  fltr:string
}

export default async function EmployeeTable(props:filter) {
  const data = await getEmployees()
  // if(props.fltr=="oldest")
  // {
  //   const res =await getOldestUser()
  //   data = res
  // }
  // else if (props.fltr == "newest") {
  //   const res = await getNewestUser();
  //   data = res;
  // }
  // else{
  //   const res = await getUser();
  //   data = res
  // }
return (
  <table className="text-sm text-left rtl:text-right text-gray-100 w-full">
    <thead className="text-xs uppercase bg-slate-950 text-gray-100 rounded-xl">
      <tr>
        <th scope="col" className="px-6 py-3">
          Bio
        </th>
        <th scope="col" className="px-6 py-3">
          Designation
        </th>
        <th scope="col" className="px-6 py-3">
          Detail
        </th>
        <th scope="col" className="px-6 py-3">
          Status
        </th>
        <th scope="col" className="px-6 py-3">
          Delete
        </th>
      </tr>
    </thead>
    <tbody className="glassmorphism">
      {// @ts-ignore
        data?.map((item: any) => (
          <tr
            key={item.id}
            className=" border-b border-slate-800 rounded-3xl hover:bg-slate-800"
          >
            <Link href={`/attendance/${item.id}`}></Link>
            <th
              scope="row"
              className="flex items-center px-6 py-4 whitespace-nowrap text-white"
            >
              <div className="ps-3">
                <div className="text-base text-white font-semibold">
                  {item.name}
                </div>
                <div className="font-normal text-gray-300">
                  {item.service_no}
                </div>
              </div>
            </th>
            <td className="px-6 py-4 text-gray-300">{item.designation}</td>
            <td className="px-6 py-4">
              <Link
                href={`/attendance/${item.id}`}
                className="font-medium flex-nowrap text-white text-small-semibold bg-violet-600 px-4 py-3 hover:bg-violet-500 rounded-xl"
              >
                Details
              </Link>
            </td>
            <td className="px-6 py-4">
              <DrawerDialogDemo id={item.id} />
            </td>
            <td className="px-6 py-4">
              <DeleteUser _id={item.id} />
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
);
}
