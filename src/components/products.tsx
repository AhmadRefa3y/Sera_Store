import { GetProducts } from "@/data/GetProducts";
import { formatter } from "@/lib/utils";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./addToCartButton";

const ProductsGrid = async ({ searchParams }: { searchParams: any }) => {
    const products = await GetProducts(searchParams);

    return (
        <div className="flex w-full  justify-center items-start h-fit  flex-wrap gap-2 ">
            {products?.map((product) => (
                <div
                    className=" w-[265px]  group group/parent  flex items-start flex-col gap-1  "
                    key={product.id}
                >
                    <div className=" group  w-full h-[260px] overflow-hidden rounded-md bg-[#f8f8f8]  relative ">
                        <Image
                            src={product.images[0].url}
                            fill
                            alt={""}
                            className="group-hover:scale-110 object-fill duration-1000 animate-in mx-auto"
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
                                    image: product.images[0].url,
                                    name: product.name,
                                    price: product.price.toNumber(),
                                    category: product.category.name,
                                    color: product.color.name,
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
                            {formatter.format(Number(product.price))}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsGrid;
