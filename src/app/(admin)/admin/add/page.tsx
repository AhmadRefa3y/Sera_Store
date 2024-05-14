import React from "react";
import AddTypeDialog from "./AddTypeDialog";
import AddCategory from "./addCategory";
import DB from "@/lib/prismaDb";
import AddColorDialog from "./AddColor";
import AddsizeDialog from "./AddSize";

const page = async () => {
    const types = await DB.type.findMany();
    return (
        <div className="flex gap-2">
            <AddTypeDialog />
            <AddCategory types={types} />
            <AddColorDialog />
            <AddsizeDialog />
        </div>
    );
};

export default page;
