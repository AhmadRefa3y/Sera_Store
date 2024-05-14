import { TableUi } from "@/components/ui/MainTable";
import DB from "@/lib/prismaDb";
import React from "react";
import { ProductsColumn, ProductsColumns } from "./ProductsColumns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Heading from "@/components/ui/heading";

const page = async () => {
    const products = await DB.product.findMany({
        include: {
            images: true,
            category: true,
            color: true,
            orderItems: true,
            size: true,
            type: true,
            _count: true,
        },
    });

    const formmatedProducts: ProductsColumn[] = products.map((product) => {
        return {
            id: product.id,
            category: product.category.name,
            type: product.type.name,
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
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-b-stone-300">
                <Heading description="عرض الاصناف المسجلة" title="الاصناف" />
                <Link
                    className="  flex gap-2  w-fit bg-[#151616] text-white p-2 rounded-md hover:opacity-90"
                    href={"/admin/products/new"}
                >
                    اضافة منتج
                    <PlusCircle />
                </Link>
            </div>
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
