import { TableUi } from "@/components/ui/MainTable";
import DB from "@/lib/prismaDb";
import React from "react";
import { ProductsColumn, ProductsColumns } from "./ProductsColumns";

const page = async () => {
    const products = await DB.product.findMany({
        include: {
            images: true,
            category: true,
            color: true,
            orderItems: true,
            size: true,
            _count: true,
        },
    });

    const formmatedProducts: ProductsColumn[] = products.map((product) => {
        return {
            id: product.id,
            category: product.category.name,
            color: product.color.name,
            images: product.images.map((image) => image.url),
            name: product.name,
            price: Number(product.price),
            size: product.size.value,
            isFeatured: product.isFeatured,
            isArchived: product.isArchived,
        };
    });
    return (
        <div>
            <TableUi
                columns={ProductsColumns}
                data={formmatedProducts}
                notfound="لا يوجد بيانات"
                filterAccessorKey="name"
                filterEnabled={true}
                filterlabel="بحث بالاسم"
                filterplaceholder="الاسم"
                visabilty={true}
            />
        </div>
    );
};

export default page;
