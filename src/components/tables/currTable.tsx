// import { getNewestUser, getOldestUser, getUser } from "@/lib/actions";
import Link from "next/link";
import React from "react";
import AnimatedNumber from "../shared/animatedNumber";
import { getTodayInsights } from "@/lib/action";

interface filter {
  fltr: string;
}

export default async function CurrTable(props: filter) {
const data = await getTodayInsights()
console.log(data)
  // Initialize counters
  let clCount = 0;
  let plCount = 0;
  let slCount = 0;
  let pCount = 0;
  
  // Loop through the array
  // @ts-ignore
  for (const entry of data) {
    switch (entry.attendance_type) {
      case "cl":
        clCount++;
        break;
      case "pl":
        plCount++;
        break;
      case "sl":
        slCount++;
        break;
      case "p":
        pCount++;
        break;
      // Add more cases if needed for other attendance types
    }
  }

  const leave = clCount + plCount + slCount;
  // @ts-ignore
  const absent = data.length - leave - pCount 
  
  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <AnimatedNumber targetNumber={leave} bgr="bg-violet-500" desc="Leave" />
        <AnimatedNumber targetNumber={pCount} bgr="bg-violet-500" desc="Present" />
        <AnimatedNumber targetNumber={absent} bgr="bg-violet-500" desc="Absent" />
      </div>
      <div className="h-[50vh] sm:w-[580px] md:w-full xs:w-[380px] w-[300px] xl:w-full lg:w-full scroll-smooth overflow-y-auto overflow-x-auto mx-2 mt-5 mb-14 xl:mb-0 lg:mb-0 rounded-3xl shadow-xl">
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
                Attendance
              </th>
            </tr>
          </thead>
          <tbody className="glassmorphism">
            {
              // @ts-ignore
              data?.map((item: any) => (
                <tr
                  key={item.service_no}
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
                  <td className="px-6 py-4 text-gray-300">
                    {item.designation}
                  </td>
                  <td className="px-6 py-4">
                    <Attype mtype={item.attendance_type} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface prp{
    mtype:string
}

function Attype (props:prp){
if (props.mtype == "p") {
  return <p className="text-white">Present</p>;
} else if (props.mtype == "cl") {
  return <p className="text-green-300">Casual Leave</p>;
} else if (props.mtype == "pl") {
  return <p className="text-yellow-300">Privilged Leave</p>;
} else if (props.mtype == "sl") {
  return <p className="text-orange-300">Sick Leave</p>;
} else if (props.mtype == "hd") {
  return <p className="text-sky-300">Holiday</p>;
} else if (props.mtype == "od") {
  return <p className="text-gray-300">Official Duty</p>;
} else if (props.mtype == "lwop") {
  return <p className="text-rose-500">Leave Without Pay</p>;
} else if (props.mtype == "edp") {
  return <p className="text-pink-300">Extra Duty Perform</p>;
} else if (props.mtype == "cpl") {
  return <p className="text-violet-400">Compensatory Leave</p>;
}

}