import {getID} from '@/lib/action'
import Link from 'next/link';
import React from 'react'

export default async function page() {
const data = await getID()
const today = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};
// @ts-ignore
const date = today.toLocaleDateString("en-US", options);
return (
  <div>
    <h2 className="font-bold text-center text-3xl my-5">
      Employee Attendance Report Summary
    </h2>
    <p className="text-center">Generated on: {date}</p>
    <div className="flex justify-center items-center text-center">
      <div className="scroll-smooth overflow-y-auto overflow-x-auto w-[750px] mt-5 mb-14 xl:mb-0 lg:mb-0">
        <table className="text-sm text-center rtl:text-center text-gray-100 w-full ">
          <thead className="text-sm uppercase bg-slate-950 text-gray-100">
            <tr>
              <th scope="col" className="px-3 py-3 text-center">
                Service Number
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Designation
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Casual Leaves
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Sick Leaves
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Priviliged Leaves
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Compulsatory Leaves
              </th>
            </tr>
          </thead>
          <tbody className="text-black">
            {
              // @ts-ignore
              data?.map((item: any) => (
                <tr
                  key={item.service_no}
                  className=" border-b border-slate-300 hover:bg-slate-200"
                >
                  <th
                    scope="row"
                    className="flex items-center px-3 py-4 whitespace-nowrap text-black"
                  >
                    {item.service_no}
                  </th>
                  <td className="px-3 py-4 text-gray-800 text-center">
                    {item.name}
                  </td>
                  <td className="px-3 py-4 text-gray-800 text-center">
                    {item.designation}
                  </td>
                  <td className="px-3 py-4 text-center">{item.cl}</td>
                  <td className="px-3 py-4 text-center">{item.sl}</td>
                  <td className="px-3 py-4 text-center">{item.pl}</td>
                  <td className="px-3 py-4 text-center">{item.cpl}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}
