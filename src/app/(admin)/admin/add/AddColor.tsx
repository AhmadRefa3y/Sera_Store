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
            <DialogTrigger>
                <Button>Add Color</Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg">
                <DialogHeader className="flex items-center">
                    <DialogTitle>Add Color</DialogTitle>
                </DialogHeader>
                <form
                    className=" flex items-center justify-center  gap-2"
                    action={SaveType}
                >
                    <div className="flex flex-col  gap-2 w-full items-center justify-center">
                        <div className="flex gap-2 items-center justify-center w-full">
                            <label
                                htmlFor="color-name"
                                className="font-bold min-w-24 "
                            >
                                Color Name{" "}
                            </label>
                            <input
                                type="text"
                                name="color-name"
                                id="color-name"
                                className="p-2 border flex-1  border-stone-300 "
                            />
                        </div>
                        <div className="flex gap-2 items-center justify-center w-full">
                            <label
                                htmlFor="color-value"
                                className="font-bold min-w-24"
                                defaultValue={"#fffff"}
                            >
                                Color Value
                            </label>
                            <input
                                type="text"
                                name="color-value"
                                id="color-value"
                                className="p-2 border flex-1 border-stone-300"
                            />
                        </div>

                        <Button className="ml-auto ">Add</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddColorDialog;
