import { TableUi } from "@/components/ui/MainTable";
import React from "react";
import DB from "@/lib/prismaDb";
import { categoriesColumns, categoryColumn } from "./CategoriesCoulmn";

const page = async () => {
    const categories = await DB.category.findMany({
        include: {
            type: true,
        },
    });

    const formmatedCategories: categoryColumn[] = categories.map((category) => {
        return {
            id: category.id,
            name: category.name as string,
            for: category.type.name,
        };
    });
    // delay(5000);
    // await new Promise((resolve) => setTimeout(resolve, 20000));

    return (
        <div>
            <TableUi
                columns={categoriesColumns}
                data={formmatedCategories}
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
