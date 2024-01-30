"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";


export function NewUserForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [service_no, setService_no] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setemail] = useState("");
  const [category,setcategory]=useState("")
  const currentDate = new Date();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Handle form submission logic here
    // You can use an API call or any other method to handle the data
    // For now, let's just show a success toast
    const response = async () => {
      await fetch("/api/employee/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          service_no: Number(service_no),
          name: name,
          email: email,
          category: category,
          designation: designation,
        }),
      });
    };
    toast.promise(response(), {
      loading: "Registering...",
      success: "Complaint registered successfully",
      error: "Failed to registered Complaint",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-xl bg-violet-600 hover:bg-violet-500"
        >
          <IoIosAddCircleOutline color="white" className="mr-2" size={25} />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
          <DialogDescription>
            Mark Attandance here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form className={cn("grid items-start gap-4")} onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="reason">Name</Label>
            <input
              type="text"
              id="name"
              className="mt-1 p-1 text-gray-400 font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <input
              type="email"
              id="email"
              className="mt-1 p-1 text-gray-400 font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="service_no">Service Number</Label>
            <input
              type="number"
              id="service_no"
              className="mt-1 p-1 text-gray-400 font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
              onChange={(e) => setService_no(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="designation">Designation</Label>
            <input
              type="text"
              id="designation"
              className="mt-1 p-1 text-gray-400 font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="Attendance">Category</Label>
            <select
              name="category"
              id="category"
              onChange={(e) => setcategory(e.target.value)}
              className="bg-slate-950"
            >
              <option value="p">Regular</option>
              <option value="On-contract">On Contract</option>
            </select>
          </div>
          <Button type="submit" className="rounded-xl">
            Save Employee
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
