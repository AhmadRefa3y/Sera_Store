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
    };
    return (
        <Dialog>
            <DialogTrigger>
                <Button>Add size</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex items-center">
                    <DialogTitle className="text-lg">Add size</DialogTitle>
                </DialogHeader>
                <form
                    className=" flex items-center justify-center  gap-2"
                    action={SaveType}
                >
                    <div className="flex flex-col  gap-2 w-full items-center justify-center">
                        <div className="flex gap-2 items-center justify-center w-full">
                            <label
                                htmlFor="size-name"
                                className="font-bold min-w-24 "
                            >
                                Size Name
                            </label>
                            <input
                                type="text"
                                name="size-name"
                                id="size-name"
                                className="flex-1 p-2 border  border-stone-300"
                            />
                        </div>
                        <div className="flex gap-2 items-center justify-center w-full">
                            <label
                                htmlFor="size-value"
                                className="font-bold min-w-24 "
                                defaultValue={"#fffff"}
                            >
                                Size Value{" "}
                            </label>
                            <input
                                type="text"
                                name="size-value"
                                id="size-value"
                                className="flex-1 p-2 border border-stone-300"
                            />
                        </div>
                        <Button className="ml-auto ">Add</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddsizeDialog;
