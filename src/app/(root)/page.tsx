import AnimatedNumber from "@/components/shared/animatedNumber";
import CurrTable from "@/components/tables/currTable";
import Image from "next/image";

export default function Home() {
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
    <main className="flex text-white min-h-screen flex-col items-center space-y-8 mt-20">
        <div className="font-extrabold text-2xl">{date}</div>
          <CurrTable fltr="" />
    </main>
  );
}


