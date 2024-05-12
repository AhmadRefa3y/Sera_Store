import DB from "@/lib/prismaDb";
import { formatter } from "@/lib/utils";
import { Image as PrismaImage } from "@prisma/client";
import { Package } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductPage = async ({ params }: { params: { id: string } }) => {
    const ProductDetails = await DB.product.findUnique({
        where: {
            id: params.id,
        },
        include: {
            images: true,
        },
    });
    const product = {
        id: ProductDetails?.id!,
        images: ProductDetails?.images!,
        name: ProductDetails?.name!,
        price: Number(ProductDetails?.price)!,
    };
    return (
        <div className="flex flex-col max-w-screen-lg mx-auto w-full px-2 mt-10">
            <ProductDetail product={product} />
        </div>
    );
};

export default ProductPage;

const ProductDetail = ({
    product,
}: {
    product: {
        id: string;
        images: PrismaImage[];
        name: string;
        price: number;
    };
}) => {
    return (
        <div className="flex gap-2 h-[500px] font-normal text-sm">
            <div className="basis-[325px]">
                <Image
                    src={product.images[0].url}
                    width={900}
                    height={900}
                    alt={product.name}
                    className=" "
                />
            </div>
            <div className="flex-1 flex flex-col gap-4 ">
                <div>{product.name}</div>
                <div>{formatter.format(product.price)} </div>
                <div className="text-muted-foreground">
                    تتضمن ضريبة القيمة المضافة
                </div>
                <div className="flex gap-2 border border-green-400 w-fit px-4 ">
                    <Package />
                    التوصيل في نفس اليوم متاح
                </div>
                <div></div>
            </div>
        </div>
    );
};
