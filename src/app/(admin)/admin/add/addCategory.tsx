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
import { type } from "@prisma/client";
import { useState } from "react";
const AddCategory = ({ types }: { types: type[] }) => {
    const [form, setform] = useState({
        typeID: "",
    });
    const SaveType = async (formData: FormData) => {
        const category = formData.get("category");
        const res = await CreateCategory(category as string, form.typeID);
    };
    return (
        <Dialog>
            <DialogTrigger>اضافة نوع</DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex items-center">
                    <DialogTitle>اضافة نوع جديد</DialogTitle>
                </DialogHeader>
                <form
                    className=" flex flex-col items-center justify-center  gap-2"
                    action={SaveType}
                >
                    <div className="flex">
                        <div className="flex-1 grow">
                            <label htmlFor="name" className="font-bold">
                                اسم النوع
                            </label>
                            <input
                                type="text"
                                name="category"
                                className="flex-1 p-2 border border-stone-300 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="font-bold">
                                الفئة{" "}
                            </label>
                            <Select
                                onValueChange={(id) => setform({ typeID: id })}
                                dir="rtl"
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="اختر فئة" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {types.map((type) => (
                                            <SelectItem
                                                key={type.id}
                                                value={type.id}
                                            >
                                                {type.name}{" "}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button className="mr-auto ">اضافة</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategory;
