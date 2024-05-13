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
        <div className="flex flex-col max-w-screen-2xl  w-full px-2 mt-10">
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
        <div className="flex gap-2 h-[560px] font-normal text-sm">
            <div className="basis-[600px]">
                <div className="w-[560px] h-[560px] mr-auto">
                    <Image
                        src={product.images[0].url}
                        width={1200}
                        height={1200}
                        alt={product.name}
                        className=" "
                    />
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 ">
                <div className="text-3xl">{product.name}</div>
                <div className="text-3xl">
                    {formatter.format(product.price)}{" "}
                </div>
                <div className="flex gap-2 text-lg">
                    <span>اللون</span>
                    <span className="text-muted-foreground">
                        : {product.color}
                    </span>
                </div>
                <div className="flex gap-2 text-lg">
                    <span>المقاس</span>
                    <span className="text-muted-foreground">
                        : {product.size}
                    </span>
                </div>
                <div className="text-muted-foreground w-[40%] ">
                    تتضمن ضريبة القيمة المضافة
                </div>
                <div className="flex gap-2 border border-green-400  px-4 py-2 w-[40%] text-base">
                    <Package />
                    التوصيل في نفس اليوم متاح
                </div>
                <div className="flex gap-2 w-full">
                    <div className="flex justify-evenly border border-stone-300 w-fit px-4 text-lg p-2">
                        <button>
                            <Plus />
                        </button>
                        <span className="mx-4">1</span>
                        <button>
                            <Minus />
                        </button>
                    </div>
                    <button className="flex items-center justify-center basis-[80%] border border-cyan-950 px-5 hover:bg-cyan-950 hover:text-white duration-300">
                        اضـــــــــــــــــــف الي السلة
                        <ArrowBigLeft />
                    </button>
                    <div className="flex items-center justify-center  border border-cyan-950 px-2 hover:bg-cyan-950 hover:text-white duration-300 relative">
                        <Heart />
                        <div className="absolute  hidden">
                            اضافة الي المفضلة
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 border border-green-400  px-4 py-2 w-[40%] text-base">
                    <Car />
                    التوصيل خلال من 3 إلى 5 أيام عمل
                </div>
            </div>
        </div>
    );
};
