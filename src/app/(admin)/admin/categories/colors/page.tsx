import { TableUi } from "@/components/ui/MainTable";
import React from "react";
import DB from "@/lib/prismaDb";
import { colorsColumns } from "./ColorsCoulmn";

const page = async () => {
    const colors = await DB.color.findMany({});

    return (
        <div>
            <TableUi
                columns={colorsColumns}
                data={colors}
                notfound="No color found"
                filterAccessorKey="name"
                filterEnabled={true}
                filterlabel="search by color name"
                filterplaceholder="Name"
                visabilty={true}
            />
        </div>
    );
};

export default page;
