"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


import { sidebarLinks } from "@/constants";

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar rounded-3xl m-5 sticky left-0 top-0 z-20 flex h-[90vh] w-[250px] flex-col justify-between overflow-auto shadow-2xl  bg-slate-900 pb-5 pt-14 max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        <div className="flex items-center">
          <Image
            src={"/logo.png"}
            width={50}
            height={50}
            alt="Logo of website"
            className=""
          />
          <Link href={"/"} className="text-2xl font-extrabold ml-1">
            WORKSYNC
          </Link>
        </div>
        {sidebarLinks.map((link: any) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex items-center gap-4 rounded-xl p-5 ${
                isActive && "bg-violet-500"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className="text-white max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SideBar;
