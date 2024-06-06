import { TableUi } from "@/components/ui/MainTable";
import React from "react";
import DB from "@/lib/prismaDb";
import { categoriesColumns, categoryColumn } from "./CategoriesCoulmn";
import Heading from "@/components/ui/heading";
import AddCategory from "../../add/addCategory";

const page = async () => {
    const categories = await DB.category.findMany({});

    // await new Promise((resolve) => setTimeout(resolve, 20000));

    return (
        <div>
            <div className="flex justify-between">
                <Heading
                    title="Categories"
                    description="Manage your Categories"
                />
                <AddCategory />
            </div>
            <TableUi
                columns={categoriesColumns}
                data={categories}
                notfound="No category found"
                filterAccessorKey="name"
                filterEnabled={true}
                filterlabel="search by category name"
                filterplaceholder="Name"
                visabilty={true}
            />
        </div>
    );
};

export default page;
