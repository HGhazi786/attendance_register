import { DrawerDialogDemo } from "@/components/forms/attendanceForm";
import { DeleteUser } from "@/components/shared/deleteEntry";
import { getEmployees } from "@/lib/action";
import Link from "next/link";
import React from "react";

export default async function Page({ params }: { params: { name: string } }) {
  const res = await getEmployees();

  function searchByName(jsonArray:any, searchTerm:string) {
    // Convert the search term to lowercase for case-insensitive search
    searchTerm = searchTerm.toLowerCase();

    // Filter the array based on the search term
    const results = jsonArray.filter((item:any) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    return results;
  }
  const data = searchByName(res, params.name);
  return (
    <div className="flex justify-center items-center">
      <div className="h-[60vh] sm:w-[580px] md:w-full xs:w-[380px] w-[300px] xl:w-full lg:w-full scroll-smooth overflow-y-auto overflow-x-auto mx-2 mt-5 mb-14 xl:mb-0 lg:mb-0 rounded-3xl shadow-xl">
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
      </div>
    </div>
  );
}
