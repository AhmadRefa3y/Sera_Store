"use client";

import LoadingPage from "@/components/loadingComp";
import ProductsGrid from "@/components/products";
import { GetProducts } from "@/data/products";
import { Category, Color, Prisma, Product, Size, type } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { count } from "console";
import { useEffect, useState } from "react";

const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number];

interface productsProps {
    categories: Category[];
    sizes: Size[];
    colors: Color[];
    types: type[];
}

type product = Prisma.ProductGetPayload<{
    include: {
        images: true;
        size: true;
        color: true;
        category: true;
        orderItems: true;
    };
}>;

const Products = ({ categories, colors, sizes, types }: productsProps) => {
    const [products, setProducts] = useState<product[] | undefined>([]);

    const [loading, setLoading] = useState(true);
    const [Filters, setFilters] = useState<{
        categoryies: string[];
        color: string[];
        price: number[];
        size: string[];
        sort: string;
    }>({
        categoryies: [],
        color: [],
        price: [],
        size: [],
        sort: "none",
    });

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const data = await GetProducts(Filters);
            setProducts(data?.FilterdProducts);
            setLoading(false);
        };
        fetchData();
    }, [Filters]);

    const applyFilters = ({
        category,
        value,
    }: {
        category: keyof Omit<typeof Filters, "price" | "sort">;
        value: string;
    }) => {
        const isFilterAplied = Filters[category].includes(value);

        if (isFilterAplied) {
            setFilters((prev) => ({
                ...prev,
                [category]: prev[category].filter((c) => c !== value),
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                [category]: [...prev[category], value],
            }));
        }
    };
    console.log("rendered");

    return (
        <div className="w-full flex flex-row gap-2  max-w-screen-xl mx-auto ">
            <div className="w-[20%] flex">
                <div className="  flex flex-col gap-2 w-full items-start px-4">
                    <div className="flex flex-col gap-2 my-5">
                        <div>عرض حسب النوع</div>
                        <div className="flex flex-col gap-1 text-sm">
                            {categories.map((category, categoryIdx) => (
                                <li
                                    key={category.name}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        id={`category-${categoryIdx}`}
                                        onChange={() => {
                                            applyFilters({
                                                category: "categoryies",
                                                value: category.name,
                                            });
                                        }}
                                        checked={Filters.categoryies.includes(
                                            category.name
                                        )}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor={`category-${categoryIdx}`}
                                        className="mr-3 text-sm text-gray-600 "
                                    >
                                        {category.name}
                                    </label>
                                </li>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm my-5">
                        <div>عرض حسب الحجم</div>
                        <div className="flex flex-col gap-1 text-sm">
                            {sizes.map((size, sizeIdx) => (
                                <li
                                    key={size.value}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        id={`size-${sizeIdx}`}
                                        onChange={() => {
                                            applyFilters({
                                                category: "size",
                                                value: size.value,
                                            });
                                        }}
                                        checked={Filters.size.includes(
                                            size.value
                                        )}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor={`size-${sizeIdx}`}
                                        className="mr-3 text-sm text-gray-600 w-20 "
                                    >
                                        {size.name}
                                    </label>
                                </li>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                        <div>عرض حسب اللون</div>
                        <div className="flex flex-col gap-1 text-sm">
                            {colors.map((color, colorIdx) => (
                                <li
                                    key={color.value}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        id={`color-${colorIdx}`}
                                        onChange={() => {
                                            applyFilters({
                                                category: "color",
                                                value: color.value,
                                            });
                                        }}
                                        checked={Filters.color.includes(
                                            color.value
                                        )}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor={`color-${colorIdx}`}
                                        className="mr-3 text-sm text-gray-600 w-14"
                                    >
                                        {color.name}
                                    </label>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>{" "}
            </div>
            <div className="grow flex flex-col gap-2">
                <div className="  w-full text-2xl ">النتائج</div>{" "}
                {loading ? (
                    <LoadingPage />
                ) : (
                    <ProductsGrid products={products} />
                )}
            </div>
        </div>
    );
};

export default Products;
