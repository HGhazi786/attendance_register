"use client"
import {useState} from "react";
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

interface prp{
  id:string
}

export function DrawerDialogDemo(prop:prp) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("p");
  const [reason, setReason] = useState("No Reason Entered");
  const currentDate = new Date()


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const response =async () => {
      await fetch("/api/record/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify({
        attendance_type: status,
        date: currentDate,
        reason: reason,
        employee_id: prop.id,
      }),
    });}
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
          Attendance
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
        <Label htmlFor="Attendance">Attendance</Label>
        <select
          name="status"
          id="status"
          onChange={(e) => {setStatus(e.target.value);console.log(status)}}
          className="bg-slate-950"
        >
          <option value="p">Present</option>
          <option value="cl">Casual Leave</option>
          <option value="sl">Sick Leave</option>
          <option value="hd">Holiday</option>
          <option value="lwop">Leave Without Pay</option>
          <option value="edp">Extra Duty Perform</option>
          <option value="cpl">Compensatory Leave</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reason">Reason</Label>
        <textarea
          id="reason"
          onChange={(e) => setReason(e.target.value)}
          className="mt-1 p-1 text-gray-400 font-sans focus:ring-0 block w-full text-brown bg-transparent border border-b-2 border-b-emerald-900 border-transparent shadow-sm"
        />
      </div>
      <Button type="submit" className="rounded-xl">Save changes</Button>
    </form>
      </DialogContent>
    </Dialog>
  );
}
