import React from "react";
import AddCategory from "./addCategory";
import AddColorDialog from "./AddColor";
import AddsizeDialog from "./AddSize";

const page = async () => {
    return (
        <div className="flex gap-2">
            <AddCategory />
            <AddColorDialog />
            <AddsizeDialog />
        </div>
    );
};

export default page;
