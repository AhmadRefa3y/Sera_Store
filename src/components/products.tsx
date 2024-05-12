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
    return (
        <div className="flex w-full  justify-center h-full  flex-wrap ">
            {[...products, ...products, ...products].map((product) => (
                <div className=" min-w-[250px] group group/parent h-[500px] p-2  rounded-md flex items-center flex-col ">
                    <div
                        key={product.id}
                        className=" group  w-full h-[calc(100%-100px)] overflow-hidden bg-[#f8f8f8] p-1 relative"
                    >
                        <Image
                            src={product.images[0].url}
                            fill
                            alt={""}
                            className="group-hover:scale-110 object-cover duration-1000 animate-in mx-auto"
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
                    <div className="h-fit flex flex-col gap-2 pt-4 w-full">
                        <p className=" text-xs  overflow-hidden w-full">
                            {product.name}
                        </p>

                        <p className=" text-sm  overflow-hidden w-full mt-auto">
                            {formatter.format(Number(product.price))}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsGrid;
