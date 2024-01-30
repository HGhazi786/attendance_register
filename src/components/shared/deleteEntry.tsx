"use client";
import React from "react";
import toast from "react-hot-toast";
import {BsTrash3} from "react-icons/bs"
import { useRouter } from "next/navigation";

interface idm{
_id:number
}

interface idl{
  _id:string
}

export function DeleteProposal(props: idl) {
  const router = useRouter();
  const deleteApi = async (id: string) => {
    try {
      const response = await fetch(`/api/proposalDb/delete/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
    router.refresh();
  };
  async function handleDelete(id: string) {
    toast.promise(deleteApi(id), {
      loading: "Deleting item",
      success: "Item Deleted Successfully",
      error: "Failed to Delete",
    });
  }
  return (
    <button onClick={() => handleDelete(props._id)}>
      <BsTrash3 className="text-gray-900 hover:text-gray-700 text-xl" />
    </button>
  );
}

export function DeleteComplaint(props:idm) {
  const router=useRouter()
  const deleteApi=async (id:number)=>{
    try {
      const response = await fetch(`/api/complaints/delete/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
    router.refresh();
  }
  async function handleDelete(id: number) {
    toast.promise(deleteApi(id), {
      loading: "Deleting item",
      success: "Item Deleted Successfully",
      error: "Failed to Delete",
    });
}  
return <button onClick={()=>handleDelete(props._id)}><BsTrash3 className="text-gray-900 hover:text-gray-700 text-xl" /></button>
}

export function DeleteUser(props: idm) {
  const router = useRouter();
  const deleteApi = async (id: number) => {
    try {
      const response = await fetch(`/api/employee/delete?id=${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
    router.refresh();
  };
  async function handleDelete(id: number) {
    toast.promise(deleteApi(id), {
      loading: "Deleting item",
      success: "Item Deleted Successfully",
      error: "Failed to Delete",
    });
  }
  return (
    <button onClick={() => handleDelete(props._id)}>
      <BsTrash3 className="text-gray-100 hover:text-gray-300 text-xl" />
    </button>
  );
}