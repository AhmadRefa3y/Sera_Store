"use client";
import { GetProducts } from "@/data/GetProducts";
import { formatter } from "@/lib/utils";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Prisma, PrismaClient, Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/loadingComp";
import AddToCartButton from "@/components/addToCartButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type ProductType = {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    color: string;
    size: string;
    SuitableFor: string;
};
const ProductsGrid = () => {
    const searchParams = useSearchParams();
    const params = useMemo(
        () => new URLSearchParams(searchParams.toString()),
        [searchParams]
    );
    const { data: products, isLoading: loading } = useQuery({
        queryKey: ["todos", { params }],
        queryFn: () =>
            GetProducts({
                categories: params.get("categories"),
                priceRange: params.get("priceRange"),
                sizes: params.get("size"),
                colors: params.get("color"),
                types: params.get("suitableFor"),
            }),
    });

    // const [products, setProducts] = useState<ProductType[]>([]);
    // const [loading, setloading] = useState(true);
    // useEffect(() => {
    //     setloading(true);
    //     async function FetchProducts() {
    //         const products = await GetProducts({
    //             categories: params.get("categories"),
    //             priceRange: params.get("priceRange"),
    //             size: params.get("size"),
    //             color: params.get("color"),
    //             suitableFor: params.get("suitableFor"),
    //         });
    //         if (products) {
    //             setProducts(products);
    //         }
    //         setloading(false);
    //     }
    //     FetchProducts();
    // }, [params]);

    return (
        <div className="flex w-full  justify-center items-start h-full  flex-wrap gap-2 flex-1">
            {loading ? (
                <Spinner />
            ) : (
                products &&
                products.length > 0 &&
                products?.map((product) => (
                    <div
                        className=" sm:w-[265px] w-[160px]   group group/parent  flex items-start flex-col gap-1  border border-stone-300     hover:border-sky-400  duration-500  "
                        key={product.id}
                    >
                        <div className=" group  w-full sm:h-[260px] h-[170px] overflow-hidden  bg-[#f8f8f8]  relative  ">
                            <Image
                                src={product.image}
                                fill
                                alt={""}
                                className=" object-fill duration-1000 animate-in mx-auto"
                            />
                            <div className="flex items-center justify-center absolute -bottom-3 group-hover/parent:bottom-3 opacity-0  group-hover/parent:opacity-100 w-full gap-3 duration-300">
                                <Link
                                    href={`/shop/${product.id}`}
                                    className="p-2 bg-white rounded-full flex items-center justify-center hover:bg-slate-600 hover:text-white hover:scale-125 duration-300"
                                >
                                    <Eye />
                                </Link>
                                <AddToCartButton
                                    product={{
                                        id: product.id,
                                        image: product.image,
                                        name: product.name,
                                        price: parseInt(
                                            product.price.toString()
                                        ),
                                        category: product.category,
                                        color: product.color,
                                        quantity: 1,
                                    }}
                                />
                                <button className="p-2 bg-white rounded-full flex items-center justify-center hover:bg-slate-600 hover:text-white hover:scale-125 duration-300">
                                    <Heart />
                                </button>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-1 w-full text-gray-700 font-semibold justify-center items-center">
                            <p className=" text-sm  overflow-hidden ">
                                {product.name}
                            </p>

                            <p className=" text-sm  overflow-hidden  mt-auto">
                                {formatter.format(product.price)}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductsGrid;
