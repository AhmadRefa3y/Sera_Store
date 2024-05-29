"use client";
import Autoscroll from "embla-carousel-auto-scroll";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { formatter } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import FilterProducts from "./productsFilter";
import Link from "next/link";
type product = Prisma.ProductGetPayload<{
    include: {
        images: true;
    };
}>;
const ProductsCarousel = ({ products }: { products: product[] }) => {
    const [filters, setfilters] = useState<{
        category: "men" | "women" | "kids" | "all";
    } | null>({
        category: "all",
    });

    const categories = [
        { name: "All", value: "all" },
        { name: "Men", value: "men" },
        { name: "Women", value: "women" },
        { name: "Kids", value: "kids" },
    ];
    const formattedProducts = products.map((product) => ({
        category: "men",
        ...product,
    }));

    const filteerdProducts = formattedProducts.filter((product) => {
        if (filters?.category === "all") return product;
        if (product?.category === filters?.category) {
            return product;
        } else return null;
    });

    return (
        <div className="mx-8 ">
            <FilterProducts
                categories={categories}
                filters={filters}
                setfilters={setfilters}
            />
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className=" mx-auto h-[350px] my-5 "
                dir="ltr"
                plugins={[Autoscroll({ stopOnInteraction: false })]}
            >
                <CarouselContent
                    className=" mx-auto flex items-center justify-center "
                    dir="ltr"
                >
                    {filteerdProducts.length > 0 ? (
                        filteerdProducts.map((product, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3 pl-2 py-2 h-full"
                            >
                                <div className="group group/parent rounded-md flex items-center h-full justify-center flex-col ">
                                    <div
                                        key={product.id}
                                        className=" group  w-full h-[260px] overflow-hidden  bg-[#f8f8f8] p-1 relative"
                                    >
                                        <Image
                                            src={product.images[0].url}
                                            fill
                                            alt={""}
                                            className="group-hover:scale-110 object-fill  duration-1000 animate-in mx-auto"
                                        />
                                        <div className="flex items-center justify-center absolute -bottom-3 group-hover/parent:bottom-3 opacity-0  group-hover/parent:opacity-100 w-full gap-3 duration-300">
                                            <Link
                                                href={`/shop/${product.id}`}
                                                className="p-2 bg-white rounded-full flex items-center justify-center hover:bg-slate-600 hover:text-white hover:scale-125 duration-300"
                                            >
                                                <Eye />
                                            </Link>
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
                                    <div className="flex flex-col items-center justify-center gap-2 pt-2 w-full text-sm ">
                                        <p className="  overflow-hidden text-center text-nowrap w-full ">
                                            {product.name}
                                        </p>

                                        <p className="  overflow-hidden w-full text-center">
                                            {formatter.format(
                                                Number(product.price)
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        <CarouselItem
                            key={Math.random()}
                            className="basis-[100%] "
                        >
                            <div className="w-full group group/parent h-[500px] p-2  rounded-md flex items-center justify-center flex-col ">
                                <p>No Products</p>
                            </div>
                        </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselNext dir="ltr" />
                <CarouselPrevious dir="ltr" />
            </Carousel>
        </div>
    );
};

export default ProductsCarousel;
