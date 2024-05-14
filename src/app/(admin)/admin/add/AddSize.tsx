"use client";
import { Createsize } from "@/actions/Sizes";
import { CreateType } from "@/actions/types";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
const AddsizeDialog = () => {
    const SaveType = async (formData: FormData) => {
        const sizeName = formData.get("size-name");
        const sizeValue = formData.get("size-value");
        const res = await Createsize(sizeName as string, sizeValue as string);
        console.log(res);
    };
    return (
        <Dialog>
            <DialogTrigger>اضافة حجم</DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex items-center">
                    <DialogTitle>اضافة حجم</DialogTitle>
                </DialogHeader>
                <form
                    className=" flex items-center justify-center flex-col gap-2"
                    action={SaveType}
                >
                    <div className="flex  gap-2 w-full items-center  justify-center">
                        <label htmlFor="name" className="font-bold">
                            اسم الحجم
                        </label>
                        <input
                            type="text"
                            name="size-name"
                            className="flex-1 p-2 border  border-stone-300"
                        />
                        <label
                            htmlFor="name"
                            className="font-bold"
                            defaultValue={"#fffff"}
                        >
                            قيمة الحجم
                        </label>
                        <input
                            type="text"
                            name="size-value"
                            className="flex-1 p-2 border border-stone-300"
                        />
                        <Button className="mr-auto ">اضافة</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddsizeDialog;
