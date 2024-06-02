import { TableUi } from "@/components/ui/MainTable";
import React from "react";
import { sizesColumns } from "./SizesCoulmn";
import DB from "@/lib/prismaDb";

const page = async () => {
    const sizes = await DB.size.findMany({});
    console.log(sizes);

    return (
        <div>
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
