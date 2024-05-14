import ProductsGrid from "@/components/products";
import { Button } from "@/components/ui/button";
import DB from "@/lib/prismaDb";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ShopFilters from "./filters";

const ShopPage = ({ searchParams }: { searchParams: any }) => {
    return (
        <div className="flex gap-2 h-full w-full mt-6 px-4 ">
            <SideBar />
            <Shop searchParams={searchParams} />
        </div>
    );
};

export default ShopPage;

const SideBar = () => {
    return (
        <div className="basis-[200px]  h-full text-xs font-normal">
            <div className="flex flex-col gap-1 ">
                <div className=" text-xs font-bold mb-3">تسوق حسب المنتج</div>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    اظهار الكل
                </Link>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    القمصان
                </Link>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    البنطلونات
                </Link>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    التيشيرتات
                </Link>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    الملابس
                </Link>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    الملابس الرياضية
                </Link>
            </div>
            <div className="flex flex-col gap-1 ">
                <div className=" text-xs font-bold mt-7 mb-3">اهم العروض</div>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    الافضل مبيعاً
                </Link>
            </div>
        </div>
    );
};

const Shop = async ({ searchParams }: { searchParams: any }) => {
    console.log(searchParams);
    const nameFIlter = searchParams.sort;
    const productscount = await DB.product.findMany();
    const products = await DB.product.findMany({
        include: {
            images: true,
        },
        orderBy: {
            name:
                nameFIlter === "name-desc"
                    ? "desc"
                    : nameFIlter === "name-asc"
                    ? "asc"
                    : undefined,
            price:
                nameFIlter === "price-desc"
                    ? "asc"
                    : nameFIlter === "price-desc"
                    ? "desc"
                    : undefined,
            createdAt: nameFIlter === "new" ? "desc" : undefined,
        },
    });

    return (
        <div className="basis-[calc(100%-200px)]  h-full flex flex-col gap-2 relative max-w-screen-xl mx-auto ">
            <ShopCategoryLabel />
            <ShopFilters products={productscount} />
            <ProductsGrid products={products} />
        </div>
    );
};

const ShopCategoryLabel = () => {
    return <div className="  w-full text-4xl mb-3 ">القمصان</div>;
};
