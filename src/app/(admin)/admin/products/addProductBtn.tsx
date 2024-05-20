"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const AddProductBtn = () => {
    return (
        <Button
            className="absolute left-14 top-2 Flex gap-2 "
            onClick={() => {
                redirect("admin/dsa");
            }}
        >
            اضافة منتج
            <PlusCircle />
        </Button>
    );
};

export default AddProductBtn;
