"use client";
import { CreateCategory } from "@/actions/categories";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
const AddCategory = () => {
    const [open, setOpen] = useState(false);
    const SaveType = async (formData: FormData) => {
        const category = formData.get("category");
        const res = await CreateCategory(category as string);
        if (res.status === "ok") {
            toast.success("Category created successfully");
            setOpen(false);
        } else {
            toast.error(" something went wrong");
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-black text-white rounded-md hover:bg-black/80 mt-1 h-fit p-3">
                Add Category
            </DialogTrigger>
            <DialogContent className="rounded-md">
                <DialogHeader className="flex items-center">
                    <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <form
                    className=" flex flex-col items-center justify-center  gap-2"
                    action={SaveType}
                >
                    <div className="flex flex-col  gap-2 w-full items-center justify-center">
                        <div className="flex gap-2 items-center justify-center w-full">
                            <label
                                htmlFor="name"
                                className="font-bold min-w-36 "
                            >
                                Category Name
                            </label>
                            <input
                                type="text"
                                name="category"
                                className="flex-1 p-2 border border-stone-300 w-full"
                            />
                        </div>
                    </div>
                    <Button className="ml-auto ">Save</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategory;
