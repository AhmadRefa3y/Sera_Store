"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Product } from "@prisma/client";
import { ArrowDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const ShopFilters = ({ products }: { products: Product[] }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    let priceFIlters = [
        {
            name: "0-500",
            form: 0,
            to: 500,
            productsNumber: 0,
        },
        {
            name: "500-1000",
            form: 500,
            to: 1000,
            productsNumber: 0,
        },
        {
            name: "1000-2000",
            form: 1000,
            to: 2000,
            productsNumber: 0,
        },
        {
            name: "2000-3500",
            form: 2000,
            to: 3500,
            productsNumber: 0,
        },
        {
            name: "3500-7000",
            form: 3500,
            to: 7000,
            productsNumber: 0,
        },
    ];

    products.map((product) => {
        priceFIlters.filter((filter) => {
            if (
                filter.form <= Number(product.price) &&
                filter.to >= Number(product.price)
            ) {
                filter.productsNumber += 1;
            }
        });
    });
    console.log(priceFIlters);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    const orderBy: { name: string; value: string }[] = [
        {
            name: "ما نوصي به",
            value: "recommended",
        },
        {
            name: "الاسم من أ إلى ي",
            value: "name-asc",
        },
        {
            name: "الاسم من ي إلى أ",
            value: "name-desc",
        },
        {
            name: "السعر من الأدنى إلى الأعلى",
            value: "price-desc",
        },
        {
            name: "السعر من الأعلى إلى الأدنى",
            value: "price-asc",
        },
        {
            name: "جديدنا",
            value: "new",
        },
    ];
    return (
        <div className="flex items-center justify-between sticky top-0 py-2 z-50 bg-[#fafafa] ">
            <div className="flex gap-2">
                <Select
                    onValueChange={(value) => {
                        router.push(
                            pathname + "?" + createQueryString("sort", value)
                        );
                    }}
                    dir="rtl"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="اخر فئة" />
                    </SelectTrigger>
                    <SelectContent>
                        {orderBy.map((order, index) => (
                            <SelectItem key={index} value={order.value}>
                                {order.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    open
                    onValueChange={(value) => {
                        router.push(
                            pathname +
                                "?" +
                                createQueryString("priceRange", value)
                        );
                    }}
                    dir="rtl"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="اخر فئة" />
                    </SelectTrigger>
                    <SelectContent>
                        {priceFIlters.map((filter, index) => (
                            <SelectItem
                                key={index}
                                value={filter.name}
                                className="w-full"
                            >
                                <div className="flex justify-between w-full ">
                                    <span className="mr-2 min-w-28">
                                        {filter.name}
                                    </span>
                                    <span>{`(${filter.productsNumber})`}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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

export default ShopFilters;
