import DB from "@/lib/prismaDb";
import { formatter } from "@/lib/utils";
import { Image as PrismaImage } from "@prisma/client";
import { ArrowBigLeft, Car, Heart, Minus, Package, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductPage = async ({ params }: { params: { id: string } }) => {
    const ProductDetails = await DB.product.findUnique({
        where: {
            id: params.id,
        },
        include: {
            images: true,
            color: true,
            size: true,
        },
    });
    const product = {
        id: ProductDetails?.id!,
        images: ProductDetails?.images!,
        name: ProductDetails?.name!,
        price: Number(ProductDetails?.price)!,
        color: ProductDetails?.color.name!,
        size: ProductDetails?.size.name!,
    };
    return (
        <div className="flex flex-col max-w-screen-xl  w-full px-2 sm:mt-10  mx-auto">
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
        color: string;
        size: string;
    };
}) => {
    return (
        <div className="flex gap-2 font-normal text-sm flex-col sm:flex-row pb-3">
            <div className="sm:basis-[40%]">
                <div className="w-full mx-auto">
                    <Image
                        src={product.images[0].url}
                        width={560}
                        height={700}
                        alt={product.name}
                        className=" "
                    />
                </div>
            </div>
            <div className="sm:basis-[60%] flex flex-col sm:gap-4 gap-2 flex-wrap  ">
                <div className="sm:text-3xl text-lg">{product.name}</div>
                <div className="sm:text-3xl text-lg">
                    {formatter.format(product.price)}{" "}
                </div>
                <div className="text-muted-foreground w-fit ">
                    يتضمن ضريبة القيمة المضافة
                </div>
                <div className="flex gap-2  text-lg">
                    <span>اللون</span>
                    <span className="text-muted-foreground">
                        : {product.color}
                    </span>
                </div>
                <div className="flex gap-2  text-lg">
                    <span>المقاس</span>
                    <span className="text-muted-foreground">
                        : {product.size}
                    </span>
                </div>
                <div className="flex sm:gap-2 gap-1 flex-col sm:flex-row ">
                    <div className="flex justify-evenly border border-stone-300   sm:mx-0 px-1 sm:text-lg p-1">
                        <button>
                            <Plus />
                        </button>
                        <span className="sm:mx-4 mx-1">1</span>
                        <button>
                            <Minus />
                        </button>
                    </div>
                    <button className="flex items-center justify-center flex-1 min-w-fit border border-cyan-950 p-1 hover:bg-cyan-950 hover:text-white duration-300">
                        اضـــــــــــــــــــف الي السلة
                        <ArrowBigLeft />
                    </button>
                    <div className="flex items-center justify-center  border border-cyan-950 p-1 hover:bg-cyan-950 hover:text-white duration-300 relative">
                        <Heart />
                        <div className="absolute  hidden">
                            اضافة الي المفضلة
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 border border-green-400  px-4 py-2  sm:text-base">
                    <Car />
                    التوصيل خلال 3 إلى 5 أيام عمل
                </div>
            </div>
        </div>
    );
};
