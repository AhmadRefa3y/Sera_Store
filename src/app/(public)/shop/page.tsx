import ProductsGrid from "@/components/products";
import { Button } from "@/components/ui/button";
import DB from "@/lib/prismaDb";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React from "react";

const ShopPage = () => {
    return (
        <div className="flex gap-2 h-full w-full mt-6 px-4 ">
            <SideBar />
            <Shop />
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

const Shop = async () => {
    const products = await DB.product.findMany({
        include: {
            images: true,
        },
    });
    return (
        <div className="basis-[calc(100%-200px)]  h-full flex flex-col gap-2 relative max-w-screen-xl mx-auto ">
            <ShopCategoryLabel />
            <ShopFilters />
            <ProductsGrid products={products} />
        </div>
    );
};

const ShopCategoryLabel = () => {
    return <div className="  w-full text-4xl mb-3 ">القمصان</div>;
};

const ShopFilters = () => {
    return (
        <div className="flex items-center justify-between sticky top-0 py-2 z-50 bg-[#fafafa] ">
            <div className="flex gap-2">
                <Button
                    className="flex gap-2 text-sm items-center"
                    variant={"ghost"}
                >
                    <span>رتب حسب</span>
                    <ArrowDown className="w-6 h-6" />
                </Button>
                <Button
                    className="flex gap-2 text-sm items-center"
                    variant={"ghost"}
                >
                    <span>رتب حسب</span>
                    <ArrowDown className="w-6 h-6" />
                </Button>
                <Button
                    className="flex gap-2 text-sm items-center"
                    variant={"ghost"}
                >
                    <span>رتب حسب</span>
                    <ArrowDown className="w-6 h-6" />
                </Button>
                <Button
                    className="flex gap-2 text-sm items-center"
                    variant={"ghost"}
                >
                    <span>رتب حسب</span>
                    <ArrowDown className="w-6 h-6" />
                </Button>
                <Button
                    className="flex gap-2 text-sm items-center"
                    variant={"ghost"}
                >
                    <span>رتب حسب</span>
                    <ArrowDown className="w-6 h-6" />
                </Button>
            </div>
            <div className="flex gap-2 text-sm">
                <div>500 منتج</div>
            </div>
        </div>
    );
};
