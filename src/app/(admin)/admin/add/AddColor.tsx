"use client";
import { CreateColor } from "@/actions/colors";
import { CreateType } from "@/actions/types";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
const AddColorDialog = () => {
    const SaveType = async (formData: FormData) => {
        const colorName = formData.get("color-name");
        const colorValue = formData.get("color-value");
        const res = await CreateColor(
            colorName as string,
            colorValue as string
        );
    };
    return (
        <Dialog>
            <DialogTrigger>اضافة لون</DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex items-center">
                    <DialogTitle>اضافة لون</DialogTitle>
                </DialogHeader>
                <form
                    className=" flex items-center justify-center flex-col gap-2"
                    action={SaveType}
                >
                    <div className="flex  gap-2 w-full items-center  justify-center">
                        <label htmlFor="name" className="font-bold">
                            اسم اللون
                        </label>
                        <input
                            type="text"
                            name="color-name"
                            className="flex-1 p-2 border  border-stone-300"
                        />
                        <label
                            htmlFor="name"
                            className="font-bold"
                            defaultValue={"#fffff"}
                        >
                            قيمة اللون
                        </label>
                        <input
                            type="text"
                            name="color-value"
                            className="flex-1 p-2 border border-stone-300"
                        />
                        <Button className="mr-auto ">اضافة</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddColorDialog;
