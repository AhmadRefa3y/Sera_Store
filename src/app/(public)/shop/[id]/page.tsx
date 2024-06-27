import DB from "@/lib/prismaDb";
import { formatter } from "@/lib/utils";
import { Image as PrismaImage } from "@prisma/client";
import {
    ArrowBigLeft,
    ArrowBigRight,
    Car,
    Heart,
    Minus,
    Package,
    Plus,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import AddToCart from "./addToCart";
import { CartProduct } from "@/lib/cartStore";

const ProductPage = async ({ params }: { params: { id: string } }) => {
    const ProductDetails = await DB.product.findUnique({
        where: {
            id: params.id,
        },
        include: {
            images: true,
            color: true,
            size: true,
            category: true,
        },
    });
    const product: CartProduct & { size: string } = {
        id: ProductDetails?.id!,
        image: ProductDetails?.images[0].url!,
        name: ProductDetails?.name!,
        price: Number(ProductDetails?.price)!,
        color: ProductDetails?.color.name!,
        category: ProductDetails?.category.name!,
        size: ProductDetails?.size.name!,
        quantity: 1,
    };
    return (
        <div className="flex-1 flex flex-col ">
            <ProductDetail product={product} />
        </div>
    );
};

export default ProductPage;

const ProductDetail = ({
    product,
}: {
    product: CartProduct & { size: string };
}) => {
    return (
        <div className="flex gap-2 font-normal h-full text-sm flex-col sm:flex-row pb-3 flex-1  ">
            <div className="sm:basis-[40%]">
                <div className="sm:w-full sm:h-full mx-auto relative h-[340px] w-[340px]">
                    <Image
                        src={product.image}
                        fill
                        alt={product.name}
                        className=" object-fill "
                    />
                </div>
            </div>
            <div className="sm:basis-[60%] flex flex-col sm:gap-4 gap-2 flex-wrap  ">
                <div className="sm:text-3xl text-lg">{product.name}</div>
                <div className="sm:text-3xl text-lg">
                    {formatter.format(product.price)}{" "}
                </div>
                <div className="text-muted-foreground w-fit ">
                    includes Taxes
                </div>
                <div className="flex gap-2  text-lg">
                    <span>color</span>
                    <span className="text-muted-foreground">
                        : {product.color}
                    </span>
                </div>
                <div className="flex gap-2  text-lg">
                    <span>size</span>
                    <span className="text-muted-foreground">
                        : {product.size}
                    </span>
                </div>
                <AddToCart {...product} />
                <div className="flex gap-2 border border-green-400  px-4 py-2  sm:text-base">
                    delivery in 3 - 5 days
                    <Car />
                </div>
            </div>
        </div>
    );
};
