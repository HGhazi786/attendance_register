import RecordTable from '@/components/tables/attendanceTable';
import { getSpecAttendance, getUserInsights } from '@/lib/action';
import React from 'react'

export default async function page({params}:{params:{id:number}}) {
  const res = await fetch(`http://localhost:3000/api/employee/specific?id=${params.id}`, {
    method: "GET",
  });
  const empData = await res.json();
  const data = empData[0]
  const insights = await getUserInsights(params.id);

  return (
    <div>
      <div className="text-white grid grid-cols-2 gap-10">
        <div className="my-10 flex flex-col justify-between">
          <h2 className="text-4xl font-bold">{data.name}</h2>
          <h3 className="text-xl">
            Service number: {data.service_no}
          </h3>
          <h3 className="text-lg">Designation: {data.designation}</h3>
          <h3 className="text-lg">Category: {data.category}</h3>
        </div>
        <div className="grid grid-cols-2 gap-5 text-center">
          <div className="p-5 rounded-xl justify-center items-center bg-violet-500">
            <h3 className="text-4xl font-bold">{insights?.sl}</h3>
            <p className="">Sick Leaves</p>
          </div>
          <div className="p-5 rounded-xl justify-center items-center bg-violet-500">
            <h3 className="text-4xl font-bold">{insights?.pl}</h3>
            <p className="">Priviliged Leaves</p>
          </div>
          <div className="p-5 rounded-xl justify-center items-center bg-violet-500">
            <h3 className="text-4xl font-bold">{insights?.cl}</h3>
            <p className="">Casual Leaves</p>
          </div>
          <div></div>
        </div>
      </div>
      <div className="h-[44vh] sm:w-[580px] md:w-full xs:w-[380px] w-[300px] xl:w-full lg:w-full scroll-smooth overflow-y-auto overflow-x-auto mx-2 mt-5 mb-14 xl:mb-0 lg:mb-0 rounded-3xl shadow-xl">
        <RecordTable id={params.id} fltr="" />
      </div>
    </div>
  );
}
