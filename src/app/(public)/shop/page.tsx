import Link from "next/link";
import React from "react";

const ShopPage = () => {
    return (
        <div className="flex gap-2 h-full w-full mt-3 ">
            <ShopSideBar />
            <ShopProducts />
        </div>
    );
};

export default ShopPage;

const ShopSideBar = () => {
    return (
        <div className="basis-[200px]  h-full text-xs font-normal pr-3">
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

const ShopProducts = () => {
    return (
        <div className="basis-[calc(100%-150px)]  h-full flex flex-col gap-2">
            <ShopCategoryLabel />
        </div>
    );
};

const ShopCategoryLabel = () => {
    return <div className="h-[100px]  w-full text-2xl">القمصان</div>;
};
