"use client";
import { Category, Color, Size, type } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState, useEffect } from "react";

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

    const [activeCategories, setActiveCategories] = useState<string[]>(
        params.get("categories")?.split("-") || []
    );
    const [activetypes, setActivetypes] = useState<string[]>(
        params.get("types")?.split("-") || []
    );
    const [activeSizes, setActiveSizes] = useState<string[]>(
        params.get("size")?.split("-") || []
    );
    const [activeColors, setActiveColors] = useState<string[]>(
        params.get("color")?.split("-") || []
    );

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const updatedParams = new URLSearchParams(params.toString());
            if (updatedParams.get(name)) {
                const values = updatedParams.get(name)?.split("-") || [];
                if (values.includes(value)) {
                    const index = values.indexOf(value);
                    values.splice(index, 1);
                    if (values.length === 0) {
                        updatedParams.delete(name);
                    } else {
                        updatedParams.set(name, values.join("-"));
                    }
                } else {
                    values.push(value);
                    updatedParams.set(name, values.join("-"));
                }
            } else {
                updatedParams.set(name, value);
            }
            return updatedParams.toString();
        },
        [params]
    );

    const handleCheckboxChange = (
        name: string,
        value: string,
        setState: React.Dispatch<React.SetStateAction<string[]>>,
        state: string[]
    ) => {
        const newState = state.includes(value)
            ? state.filter((item) => item !== value)
            : [...state, value];
        setState(newState);
        const newQueryString = createQueryString(name, value);
        router.push(`${pathname}?${newQueryString}`, {
            scroll: false,
        });
    };

    return (
        <div className="w-[20%] flex">
            <div className="flex flex-col gap-2 w-full items-start px-4">
                <div className="flex flex-col gap-2 my-5">
                    <div>عرض حسب الفئة</div>
                    <div className="flex flex-col gap-1 text-sm">
                        {types.map((type, typeIdx) => (
                            <li
                                key={type.name}
                                className="flex items-center cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    name={type.name}
                                    id={`type-${typeIdx}`}
                                    onChange={() =>
                                        handleCheckboxChange(
                                            "types",
                                            type.name,
                                            setActivetypes,
                                            activetypes
                                        )
                                    }
                                    checked={activetypes.includes(type.name)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor={`type-${typeIdx}`}
                                    className={`mr-3 text-sm text-gray-600 w-14 cursor-pointer ${
                                        activetypes.includes(type.name)
                                            ? "text-red-600"
                                            : ""
                                    }`}
                                >
                                    {type.name}
                                </label>
                            </li>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 my-5">
                    <div>عرض حسب النوع</div>
                    <div className="flex flex-col gap-1 text-sm">
                        {categories.map((category, categoryIdx) => (
                            <li
                                key={category.name}
                                className="flex items-center cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    name={category.name}
                                    id={`category-${categoryIdx}`}
                                    onChange={() =>
                                        handleCheckboxChange(
                                            "categories",
                                            category.name,
                                            setActiveCategories,
                                            activeCategories
                                        )
                                    }
                                    checked={activeCategories.includes(
                                        category.name
                                    )}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor={`category-${categoryIdx}`}
                                    className={`mr-3 text-sm text-gray-600 w-14 cursor-pointer ${
                                        activeCategories.includes(category.name)
                                            ? "text-red-600"
                                            : ""
                                    }`}
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
                                className="flex items-center cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    id={`size-${sizeIdx}`}
                                    onChange={() =>
                                        handleCheckboxChange(
                                            "size",
                                            size.value,
                                            setActiveSizes,
                                            activeSizes
                                        )
                                    }
                                    checked={activeSizes.includes(size.value)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor={`size-${sizeIdx}`}
                                    className={`mr-3 text-sm text-gray-600 w-14 cursor-pointer ${
                                        activeSizes.includes(size.value)
                                            ? "text-red-600"
                                            : ""
                                    }`}
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
                                className="flex items-center cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    id={`color-${colorIdx}`}
                                    onChange={() =>
                                        handleCheckboxChange(
                                            "color",
                                            color.name,
                                            setActiveColors,
                                            activeColors
                                        )
                                    }
                                    checked={activeColors.includes(color.name)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor={`color-${colorIdx}`}
                                    className={`mr-3 text-sm text-gray-600 w-14 cursor-pointer ${
                                        activeColors.includes(color.name)
                                            ? "text-red-600"
                                            : ""
                                    }`}
                                >
                                    {color.name}
                                </label>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBarFilters;
