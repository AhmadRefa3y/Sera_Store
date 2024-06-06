import { TableUi } from "@/components/ui/MainTable";
import React from "react";
import DB from "@/lib/prismaDb";
import { colorsColumns } from "./ColorsCoulmn";
import AddColorDialog from "../../add/AddColor";
import Heading from "@/components/ui/heading";

const page = async () => {
    const colors = await DB.color.findMany({});

    return (
        <div>
            <div className="flex justify-between">
                <Heading title="Colors" description="Manage your colors" />
                <AddColorDialog />
            </div>
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
