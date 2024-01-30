import { NewUserForm } from '@/components/forms/newEmployee';
import EmployeeTable from '@/components/tables/employeeTable';
import React from 'react'

export default function page() {
  return (
    <div>
      <h2 className="text-center font-extrabold text-5xl my-5">Mark Attendance</h2>
      <div className="h-[60vh] sm:w-[580px] md:w-full xs:w-[380px] w-[300px] xl:w-full lg:w-full scroll-smooth overflow-y-auto overflow-x-auto mx-2 mt-5 mb-14 xl:mb-0 lg:mb-0 rounded-3xl shadow-xl">
        <EmployeeTable fltr="" />
      </div>
      <div className='mt-10'>
        <NewUserForm />
      </div>
    </div>
  );
}
