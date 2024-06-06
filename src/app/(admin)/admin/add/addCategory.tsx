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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SuitableFor } from "@prisma/client";
import { ObjectEnumValue } from "@prisma/client/runtime/library";
import { useState } from "react";
import toast from "react-hot-toast";
const AddCategory = () => {
    const [form, setform] = useState({
        typeID: "",
    });
    const SaveType = async (formData: FormData) => {
        const category = formData.get("category");
        const res = await CreateCategory(category as string);
        if (res.status === "ok") {
            toast.success("Category created successfully");
        }
    };
    return (
        <Dialog>
            <DialogTrigger>
                <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent>
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
                        <div className="flex gap-2 items-center justify-center w-full">
                            <label
                                htmlFor="name"
                                className="font-bold min-w-36 "
                            >
                                For
                            </label>
                            <Select
                                onValueChange={(id) => setform({ typeID: id })}
                            >
                                <SelectTrigger className="flex-1 rounded-none border-stone-300">
                                    <SelectValue placeholder="choose a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup></SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button className="ml-auto ">Save</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategory;
