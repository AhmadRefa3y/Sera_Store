"use client";
import { Category, Color, Size, type } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const SideBarFilters = ({
    categories,
    colors,
    sizes,
    types,
}: {
    categories: Category[];
    colors: Color[];
    sizes: Size[];
    types: type[];
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const ActiveCategories = params.get("categories")?.split("-") || [];
    const ActiveSizes = params.get("size")?.split("-") || [];
    const ActiveColors = params.get("color")?.split("-") || [];

    const createQueryString = useCallback(
        (name: string, value: string) => {
            if (params.get(name)) {
                const ParamsValues = params.get(name);
                const activeValues = ParamsValues?.split("-") || [];
                if (activeValues?.includes(value)) {
                    const index = activeValues.indexOf(value);
                    activeValues.splice(index, 1);
                    if (activeValues.length === 0) {
                        params.delete(name);
                    } else {
                        params.set(name, activeValues.join("-"));
                    }
                } else {
                    activeValues.push(value);
                    params.set(name, activeValues.join("-"));
                }
            } else {
                params.set(name, value);
            }

            return params.toString();
        },
        [searchParams]
    );
    return (
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
                                    name={category.name}
                                    id={`category-${categoryIdx}`}
                                    onChange={(e) => {
                                        router.push(
                                            pathname +
                                                "?" +
                                                createQueryString(
                                                    "categories",
                                                    category.name
                                                )
                                        );
                                        router.refresh();
                                    }}
                                    checked={ActiveCategories.includes(
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
                            <li key={size.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`size-${sizeIdx}`}
                                    onChange={(e) => {
                                        router.push(
                                            pathname +
                                                "?" +
                                                createQueryString(
                                                    "size",
                                                    size.value
                                                )
                                        );
                                    }}
                                    checked={ActiveSizes.includes(size.value)}
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
                            <li key={color.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`color-${colorIdx}`}
                                    onChange={(e) => {
                                        router.push(
                                            pathname +
                                                "?" +
                                                createQueryString(
                                                    "color",
                                                    color.name
                                                )
                                        );
                                    }}
                                    checked={ActiveColors.includes(color.name)}
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
    );
};

export default SideBarFilters;
