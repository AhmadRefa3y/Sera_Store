import { formatter } from "@/lib/utils";
import { Prisma, Product } from "@prisma/client";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

type product = Prisma.ProductGetPayload<{
    include: {
        images: true;
    };
}>;
const ProductsGrid = ({ products }: { products: product[] }) => {
    // const products = [
    //     {
    //         id: 1,
    //         name: "تيشيرت سادة تلبيس متناسب مع الجسم - أسود",
    //         price: 100,
    //         image: "/1.webp",
    //     },
    //     {
    //         id: 2,
    //         name: "قميص جوخ كاروه بجيب واحد-أبيض رمادي",
    //         price: 200,
    //         image: "/2.webp",
    //     },
    //     {
    //         id: 3,
    //         name: "قميص جوخ سادة بجيب - فضي",
    //         price: 300,
    //         image: "/3.webp",
    //     },
    //     {
    //         id: 4,
    //         name: "product 4",
    //         price: 400,
    //         image: "/4.webp",
    //     },
    // ];
    return (
        <div className="flex items-center justify-center h-full gap-2 flex-wrap ">
            {products.map((product) => (
                <div className="w-[350px] group group/parent h-[400px] p-2  rounded-md flex items-center flex-col overflow-hidden">
                    <div
                        key={product.id}
                        className=" group  w-[300px] h-[300px] overflow-hidden bg-[#f8f8f8] p-4 relative"
                    >
                        <Image
                            src={product.images[0].url}
                            width={300}
                            height={300}
                            alt={""}
                            className="group-hover:scale-110 duration-1000 animate-in mx-auto"
                        />
                        <div className="flex items-center justify-center absolute -bottom-3 group-hover/parent:bottom-3 opacity-0  group-hover/parent:opacity-100 w-full gap-3 duration-300">
                            <span className="p-2 bg-white rounded-full flex items-center justify-center hover:bg-slate-600 hover:text-white hover:scale-125 duration-300">
                                <Eye />
                            </span>
                            <span className="p-2 bg-white rounded-full flex items-center justify-center hover:bg-slate-600 hover:text-white hover:scale-125 duration-300">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 "
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                            </span>
                            <span className="p-2 bg-white rounded-full flex items-center justify-center hover:bg-slate-600 hover:text-white hover:scale-125 duration-300">
                                <Heart />
                            </span>
                        </div>
                    </div>
                    <p className="text-center text-sm text-nowrap overflow-hidden w-full">
                        {product.name}
                    </p>

                    <p className="text-center text-sm text-nowrap overflow-hidden w-full">
                        {formatter.format(Number(product.price))}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ProductsGrid;
