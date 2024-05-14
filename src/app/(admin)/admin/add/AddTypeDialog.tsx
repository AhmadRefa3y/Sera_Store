"use client";
import { CreateType } from "@/actions/types";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
const AddTypeDialog = () => {
    const SaveType = async (formData: FormData) => {
        const type = formData.get("type");
        const res = await CreateType(type as string);
        console.log(res);
    };
    return (
        <Dialog>
            <DialogTrigger>اضافة فئة</DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex items-center">
                    <DialogTitle>اضافة فئة جديدة</DialogTitle>
                </DialogHeader>
                <form
                    className=" flex items-center justify-center flex-col gap-2"
                    action={SaveType}
                >
                    <div className="flex  gap-2 w-full items-center  justify-center">
                        <label htmlFor="name" className="font-bold">
                            اسم الفئة
                        </label>
                        <input
                            type="text"
                            name="type"
                            className="flex-1 p-2 border border-stone-300"
                        />
                        <Button className="mr-auto ">اضافة</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTypeDialog;
