"use client";
import { CreateColor } from "@/actions/colors";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { HexColorPicker } from "react-colorful";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";
const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
});
type ColorFormValues = z.infer<typeof formSchema>;
const AddColorDialog = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#2cd800");

    const SaveType = async (formData: FormData) => {
        const colorName = formData.get("color-name");
        const colorValue = formData.get("color-value");
        const res = await CreateColor(
            colorName as string,
            colorValue as string
        );
    };
    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            value: "#2cd800",
        },
    });

    /// Add Or Update Color
    const OnSubmit = async (data: ColorFormValues) => {
        setLoading(true);
        const res = await CreateColor(data.name, data.value);
        if (res.status === "ok") {
            toast.success("Color created successfully");
            form.reset();
            setLoading(false);
            setOpen(false);
        } else {
            toast.error("something went wrong");
            setLoading(false);
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-black text-white rounded-md hover:bg-black/80 mt-1 h-fit p-3">
                Add Color
            </DialogTrigger>
            <DialogContent className="rounded-lg">
                <DialogHeader className="flex items-center">
                    <DialogTitle>Add Color</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(OnSubmit)}
                        className="space-y-8 w-full"
                    >
                        <div className="flex flex-col gap-2 ">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Color name"
                                                {...field}
                                            ></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex gap-2">
                                            Color Value
                                        </FormLabel>
                                        <FormControl>
                                            <div className="flex justify-start flex-col gap-2">
                                                <Input
                                                    disabled={loading}
                                                    type="text"
                                                    placeholder="Color Value"
                                                    {...field}
                                                    onChange={(e) => {
                                                        setColor(
                                                            e.target.value
                                                        );
                                                        form.setValue(
                                                            "value",
                                                            e.target.value
                                                        ); // Update the "value" field in the form
                                                    }}
                                                ></Input>
                                                <div className="flex gap-3">
                                                    <HexColorPicker
                                                        color={color}
                                                        onChange={(
                                                            newColor
                                                        ) => {
                                                            setColor(newColor);
                                                            form.setValue(
                                                                "value",
                                                                newColor
                                                            ); // Update the "value" field in the form
                                                        }}
                                                    />
                                                    <div
                                                        className="h-9 w-9 rounded-full mr-2"
                                                        style={{
                                                            backgroundColor:
                                                                color,
                                                        }}
                                                    />{" "}
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* /// Save Settings */}
                        <Button
                            disabled={loading}
                            type="submit"
                            className="ml-auto"
                        >
                            save
                        </Button>
                    </form>
                </Form>
                {/* <form
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
                </form> */}
            </DialogContent>
        </Dialog>
    );
};

export default AddColorDialog;
