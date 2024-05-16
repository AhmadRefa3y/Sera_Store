import React from "react";
import Products from "./products";
import DB from "@/lib/prismaDb";

const page = async () => {
    const categories = await DB.category.findMany();
    const colors = await DB.color.findMany();
    const sizes = await DB.size.findMany();
    const types = await DB.type.findMany();
    return (
        <Products
            categories={categories}
            colors={colors}
            sizes={sizes}
            types={types}
        />
    );
};

export default page;
