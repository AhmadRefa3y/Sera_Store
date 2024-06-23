"use client";
import { Category, Color, Size, SuitableFor } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown } from "lucide-react";
import getFilters from "@/data/GetFilters";
const SideBarFilters = ({
    categories,
    colors,
    sizes,
}: {
    categories: Category[];
    colors: Color[];
    sizes: Size[];
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useMemo(
        () => new URLSearchParams(searchParams.toString()),
        [searchParams]
    );

    const [popoversOpen, setpopoversOpen] = useState({
        categories: false,
        types: false,
        sizes: false,
        colors: false,
    });

    console.log(params);

    const [activeCategories, setActiveCategories] = useState<string[]>(
        params.get("categories")?.split("--") || []
    );
    const [activetypes, setActivetypes] = useState<string[]>(
        params.get("suitableFor")?.split("--") || []
    );
    const [activeSizes, setActiveSizes] = useState<string[]>(
        params.get("size")?.split("--") || []
    );
    const [activeColors, setActiveColors] = useState<string[]>(
        params.get("color")?.split("--") || []
    );

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const updatedParams = new URLSearchParams(params.toString());
            if (updatedParams.get(name)) {
                const values = updatedParams.get(name)?.split("--") || [];
                if (values.includes(value)) {
                    const index = values.indexOf(value);
                    values.splice(index, 1);
                    if (values.length === 0) {
                        updatedParams.delete(name);
                    } else {
                        updatedParams.set(name, values.join("--"));
                    }
                } else {
                    values.push(value);
                    updatedParams.set(name, values.join("--"));
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
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap  w-full items-center  justify-start gap-4">
                <Popover
                    open={popoversOpen.types}
                    onOpenChange={() => {
                        setpopoversOpen((prev) => ({
                            ...prev,
                            types: !prev.types,
                        }));
                    }}
                >
                    <PopoverTrigger
                        className={`flex gap-2 capitalize ${
                            popoversOpen.types && "text-red-500"
                        }`}
                    >
                        for
                        <ArrowDown
                            className={`${
                                popoversOpen.types && "rotate-180"
                            } duration-300`}
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-[170px] flex flex-col gap-2 rounded-none p-0  m-0"
                        align="start"
                    >
                        {Object.values(SuitableFor).map((item, typeIdx) => (
                            <Button
                                key={item}
                                variant={"outline"}
                                className="w-full border-none rounded-none capitalize flex items-center justify-start p-0 py-1 hover:bg-[#f4eddd]"
                                onClick={() => {
                                    handleCheckboxChange(
                                        "suitableFor",
                                        item,
                                        setActivetypes,
                                        activetypes
                                    );
                                }}
                            >
                                <div className=" h-6 w-6  bg-transparent border border-black rounded-full mx-3 flex items-center justify-center ">
                                    {activetypes.includes(item) && (
                                        <span className="h-4 w-4 rounded-full bg-black  inline-flex z-50" />
                                    )}
                                </div>
                                {item}
                            </Button>
                        ))}
                    </PopoverContent>
                </Popover>
                <Popover
                    open={popoversOpen.categories}
                    onOpenChange={() => {
                        setpopoversOpen((prev) => ({
                            ...prev,
                            categories: !prev.categories,
                        }));
                    }}
                >
                    <PopoverTrigger
                        className={`flex gap-2 capitalize ${
                            popoversOpen.categories && "text-red-500"
                        }`}
                    >
                        categories
                        <ArrowDown
                            className={`${
                                popoversOpen.categories && "rotate-180"
                            } duration-300`}
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-[170px] flex flex-col gap-2 rounded-none p-0 m-0 "
                        align="start"
                    >
                        {categories.map((category, categoryIdx) => (
                            <Button
                                key={`category-${categoryIdx}`}
                                variant={"outline"}
                                className="w-full border-none rounded-none capitalize flex items-center justify-start p-0 py-1 hover:bg-[#f4eddd]"
                                onClick={() => {
                                    handleCheckboxChange(
                                        "categories",
                                        category.name,
                                        setActiveCategories,
                                        activeCategories
                                    );
                                }}
                            >
                                <div className=" h-6 w-6  bg-transparent border border-black rounded-full mx-3 flex items-center justify-center ">
                                    {activeCategories.includes(
                                        category.name
                                    ) && (
                                        <span className="h-4 w-4 rounded-full bg-black  inline-flex z-50" />
                                    )}
                                </div>
                                {category.name}
                            </Button>
                        ))}
                    </PopoverContent>
                </Popover>
                <Popover
                    open={popoversOpen.sizes}
                    onOpenChange={() => {
                        setpopoversOpen((prev) => ({
                            ...prev,
                            sizes: !prev.sizes,
                        }));
                    }}
                >
                    <PopoverTrigger
                        className={`flex gap-2 capitalize ${
                            popoversOpen.sizes && "text-red-500"
                        }`}
                    >
                        sizes
                        <ArrowDown
                            className={`${
                                popoversOpen.sizes && "rotate-180"
                            } duration-300`}
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-[170px] flex flex-col gap-2 rounded-none p-0 m-0 "
                        align="start"
                    >
                        {sizes.map((size, sizeIdx) => (
                            <Button
                                key={`size-${sizeIdx}`}
                                variant={"outline"}
                                className="w-full border-none rounded-none capitalize flex items-center justify-start p-0 py-1 hover:bg-[#f4eddd]"
                                onClick={() => {
                                    handleCheckboxChange(
                                        "size",
                                        size.value,
                                        setActiveSizes,
                                        activeSizes
                                    );
                                }}
                            >
                                <div className=" h-6 w-6  bg-transparent border border-black rounded-full mx-3 flex items-center justify-center ">
                                    {activeSizes.includes(size.value) && (
                                        <span className="h-4 w-4 rounded-full bg-black  inline-flex z-50" />
                                    )}
                                </div>
                                {size.name}
                            </Button>
                        ))}
                    </PopoverContent>
                </Popover>
                <Popover
                    open={popoversOpen.colors}
                    onOpenChange={() => {
                        setpopoversOpen((prev) => ({
                            ...prev,
                            colors: !prev.colors,
                        }));
                    }}
                >
                    <PopoverTrigger
                        className={`flex gap-2 capitalize ${
                            popoversOpen.colors && "text-red-500"
                        }`}
                    >
                        colors
                        <ArrowDown
                            className={`${
                                popoversOpen.colors && "rotate-180"
                            } duration-300`}
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-[170px] flex flex-col gap-2 rounded-none p-0 m-0 "
                        align="start"
                    >
                        {colors.map((color, colorIdx) => (
                            <Button
                                key={`color-${colorIdx}`}
                                variant={"outline"}
                                className="w-full border-none rounded-none capitalize flex items-center justify-start p-0 py-1 hover:bg-[#f4eddd]"
                                onClick={() => {
                                    handleCheckboxChange(
                                        "color",
                                        color.name,
                                        setActiveColors,
                                        activeColors
                                    );
                                }}
                            >
                                <div className=" h-6 w-6  bg-transparent border border-black rounded-full mx-3 flex items-center justify-center ">
                                    {activeColors.includes(color.name) && (
                                        <span className="h-4 w-4 rounded-full bg-black  inline-flex z-50" />
                                    )}
                                </div>
                                {color.name}
                            </Button>
                        ))}
                    </PopoverContent>
                </Popover>
            </div>
            {activeCategories.length > 0 ||
            activeSizes.length > 0 ||
            activetypes.length > 0 ||
            activeColors.length > 0 ? (
                <div className="flex gap-2  min-h-8">
                    <span>selected filters</span>
                    <div className="flex flex-wrap gap-2">
                        {activetypes.map((type) => (
                            <button
                                key={type}
                                className="bg-black hover:bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center capitalize"
                                onClick={() => {
                                    handleCheckboxChange(
                                        "suitableFor",
                                        type,
                                        setActivetypes,
                                        activetypes
                                    );
                                }}
                            >
                                {type}
                            </button>
                        ))}
                        {activeCategories.map((category) => (
                            <button
                                key={category}
                                className="bg-black hover:bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center capitalize"
                                onClick={() => {
                                    handleCheckboxChange(
                                        "categories",
                                        category,
                                        setActiveCategories,
                                        activeCategories
                                    );
                                }}
                            >
                                {category}
                            </button>
                        ))}
                        {activeSizes.map((size) => (
                            <button
                                key={size}
                                className="bg-black hover:bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center capitalize"
                                onClick={() => {
                                    handleCheckboxChange(
                                        "size",
                                        size,
                                        setActiveSizes,
                                        activeSizes
                                    );
                                }}
                            >
                                {size}
                            </button>
                        ))}
                        {activeColors.map((color) => (
                            <button
                                key={color}
                                className="bg-black hover:bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center capitalize"
                                onClick={() => {
                                    handleCheckboxChange(
                                        "color",
                                        color,
                                        setActiveColors,
                                        activeColors
                                    );
                                }}
                            >
                                {color}
                            </button>
                        ))}
                        <button
                            className="bg-red-500 hover:bg-red-500 text-white rounded-full px-2 py-1"
                            onClick={() => {
                                router.push(`${pathname}`, {
                                    scroll: false,
                                });
                                setActivetypes([]);
                                setActiveCategories([]);
                                setActiveColors([]);
                                setActiveSizes([]);
                            }}
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex gap-2  min-h-8"> No filters selected </div>
            )}
        </div>
    );
};

export default SideBarFilters;
