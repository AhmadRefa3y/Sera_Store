import { TableUi } from "@/components/ui/MainTable";
import React from "react";
import { sizesColumns } from "./SizesCoulmn";
import DB from "@/lib/prismaDb";
import AddColorDialog from "../../add/AddColor";
import AddsizeDialog from "../../add/AddSize";
import Heading from "@/components/ui/heading";

const page = async () => {
    const sizes = await DB.size.findMany({});

    return (
        <div>
            <div className="flex justify-between">
                <Heading title="sizes" description="Manage your sizes" />
                <AddsizeDialog />
            </div>
            <TableUi
                columns={sizesColumns}
                data={sizes}
                notfound="No sizes found"
                filterAccessorKey="name"
                filterEnabled={true}
                filterlabel="search by size name"
                filterplaceholder="Name"
                visabilty={true}
            />
        </div>
    );
};

export default page;
