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
import MobileFilters from "./MobileFilters";
const Filters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useMemo(
        () => new URLSearchParams(searchParams.toString()),
        [searchParams]
    );

    const [OpenFilters, setOpenFilters] = useState({
        categories: false,
        types: false,
        sizes: false,
        colors: false,
    });
    const [openFiltersMobile, setopenFiltersMobile] = useState({
        categories: false,
        color: false,
        size: false,
        suitableFor: false,
    });

    const [Vairants, setVairants] = useState<{
        categories: Category[];
        colors: Color[];
        sizes: Size[];
    }>({
        categories: [],
        colors: [],
        sizes: [],
    });

    useEffect(() => {
        async function FetchVairnts() {
            const GetVariants = await getFilters();
            setVairants(GetVariants);
        }
        FetchVairnts();
    }, []);

    const [activeFilters, setActiveFilters] = useState<{
        categories: string[];
        types: string[];
        sizes: string[];
        colors: string[];
    }>({
        categories: params.get("categories")?.split("--") || [],
        types: params.get("suitableFor")?.split("--") || [],
        sizes: params.get("size")?.split("--") || [],
        colors: params.get("color")?.split("--") || [],
    });

    useEffect(() => {
        setActiveFilters({
            categories: params.get("categories")?.split("--") || [],
            types: params.get("types")?.split("--") || [],
            sizes: params.get("sizes")?.split("--") || [],
            colors: params.get("colors")?.split("--") || [],
        });
    }, [params]);

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

    const handleFilterChange = (
        FilterName: "categories" | "colors" | "sizes" | "types",
        value: string
    ) => {
        let state = activeFilters[FilterName];
        const newState = state.includes(value)
            ? state.filter((item) => item !== value)
            : [...state, value];
        setActiveFilters((prev) => {
            return {
                ...prev,
                [FilterName]: newState,
            };
        });
        const newQueryString = createQueryString(FilterName, value);
        router.push(`${pathname}?${newQueryString}`, {
            scroll: false,
        });
    };

    const MobileFiltersItems: {
        filterName: "categories" | "colors" | "sizes" | "types";
        filters: string[];
        activeFilters: string[];
    }[] = [
        {
            filterName: "categories",
            filters: Vairants.categories.map((category) => category.name),
            activeFilters: activeFilters.categories,
        },
        {
            filterName: "types",
            filters: Object.values(SuitableFor),
            activeFilters: activeFilters.types,
        },
        {
            filterName: "sizes",
            filters: Vairants.sizes.map((size) => size.value),
            activeFilters: activeFilters.sizes,
        },
        {
            filterName: "colors",
            filters: Vairants.colors.map((color) => color.name),
            activeFilters: activeFilters.colors,
        },
    ];
    return (
        <div>
            <div className="sm:flex flex-col gap-4 hidden ">
                <div className="flex flex-wrap  w-full items-center  justify-start gap-4 ">
                    <Popover
                        open={OpenFilters.types}
                        onOpenChange={() => {
                            setOpenFilters((prev) => ({
                                ...prev,
                                types: !prev.types,
                            }));
                        }}
                    >
                        <PopoverTrigger
                            className={`flex gap-2 capitalize ${
                                OpenFilters.types && "text-red-500"
                            }`}
                        >
                            for
                            <ArrowDown
                                className={`${
                                    OpenFilters.types && "rotate-180"
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
                                        handleFilterChange("types", item);
                                    }}
                                >
                                    <div className=" h-6 w-6  bg-transparent border border-black rounded-full mx-3 flex items-center justify-center ">
                                        {activeFilters.types.includes(item) && (
                                            <span className="h-4 w-4 rounded-full bg-black  inline-flex z-50" />
                                        )}
                                    </div>
                                    {item}
                                </Button>
                            ))}
                        </PopoverContent>
                    </Popover>
                    <Popover
                        open={OpenFilters.categories}
                        onOpenChange={() => {
                            setOpenFilters((prev) => ({
                                ...prev,
                                categories: !prev.categories,
                            }));
                        }}
                    >
                        <PopoverTrigger
                            className={`flex gap-2 capitalize ${
                                OpenFilters.categories && "text-red-500"
                            }`}
                        >
                            categories
                            <ArrowDown
                                className={`${
                                    OpenFilters.categories && "rotate-180"
                                } duration-300`}
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-[170px] flex flex-col gap-2 rounded-none p-0 m-0 "
                            align="start"
                        >
                            {Vairants.categories.map(
                                (category, categoryIdx) => (
                                    <Button
                                        key={`category-${categoryIdx}`}
                                        variant={"outline"}
                                        className="w-full border-none rounded-none capitalize flex items-center justify-start p-0 py-1 hover:bg-[#f4eddd]"
                                        onClick={() => {
                                            handleFilterChange(
                                                "categories",
                                                category.name
                                            );
                                        }}
                                    >
                                        <div className=" h-6 w-6  bg-transparent border border-black rounded-full mx-3 flex items-center justify-center ">
                                            {activeFilters.categories.includes(
                                                category.name
                                            ) && (
                                                <span className="h-4 w-4 rounded-full bg-black  inline-flex z-50" />
                                            )}
                                        </div>
                                        {category.name}
                                    </Button>
                                )
                            )}
                        </PopoverContent>
                    </Popover>
                    <Popover
                        open={OpenFilters.sizes}
                        onOpenChange={() => {
                            setOpenFilters((prev) => ({
                                ...prev,
                                sizes: !prev.sizes,
                            }));
                        }}
                    >
                        <PopoverTrigger
                            className={`flex gap-2 capitalize ${
                                OpenFilters.sizes && "text-red-500"
                            }`}
                        >
                            sizes
                            <ArrowDown
                                className={`${
                                    OpenFilters.sizes && "rotate-180"
                                } duration-300`}
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-[170px] flex flex-col gap-2 rounded-none p-0 m-0 "
                            align="start"
                        >
                            {Vairants.sizes.map((size, sizeIdx) => (
                                <Button
                                    key={`size-${sizeIdx}`}
                                    variant={"outline"}
                                    className="w-full border-none rounded-none capitalize flex items-center justify-start p-0 py-1 hover:bg-[#f4eddd]"
                                    onClick={() => {
                                        handleFilterChange("sizes", size.value);
                                    }}
                                >
                                    <div className=" h-6 w-6  bg-transparent border border-black rounded-full mx-3 flex items-center justify-center ">
                                        {activeFilters.sizes.includes(
                                            size.value
                                        ) && (
                                            <span className="h-4 w-4 rounded-full bg-black  inline-flex z-50" />
                                        )}
                                    </div>
                                    {size.name}
                                </Button>
                            ))}
                        </PopoverContent>
                    </Popover>
                    <Popover
                        open={OpenFilters.colors}
                        onOpenChange={() => {
                            setOpenFilters((prev) => ({
                                ...prev,
                                colors: !prev.colors,
                            }));
                        }}
                    >
                        <PopoverTrigger
                            className={`flex gap-2 capitalize ${
                                OpenFilters.colors && "text-red-500"
                            }`}
                        >
                            colors
                            <ArrowDown
                                className={`${
                                    OpenFilters.colors && "rotate-180"
                                } duration-300`}
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-[170px] flex flex-col gap-2 rounded-none p-0 m-0 "
                            align="start"
                        >
                            {Vairants.colors.map((color, colorIdx) => (
                                <Button
                                    key={`color-${colorIdx}`}
                                    variant={"outline"}
                                    className="w-full border-none rounded-none capitalize flex items-center justify-start p-0 py-1 hover:bg-[#f4eddd]"
                                    onClick={() => {
                                        handleFilterChange(
                                            "colors",
                                            color.name
                                        );
                                    }}
                                >
                                    <div className=" h-6 w-6  bg-transparent border border-black rounded-full mx-3 flex items-center justify-center ">
                                        {activeFilters.colors.includes(
                                            color.name
                                        ) && (
                                            <span className="h-4 w-4 rounded-full bg-black  inline-flex z-50" />
                                        )}
                                    </div>
                                    {color.name}
                                </Button>
                            ))}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <MobileFilters
                Filters={MobileFiltersItems}
                handleFilterChange={handleFilterChange}
            />
            {Object.values(activeFilters).some(
                (filterArray) => filterArray.length > 0
            ) ? (
                <div className="flex gap-2  sm:min-h-8 min-h-4 text-xs py-2">
                    <span className="text-lg"> filters</span>
                    <div className="flex flex-wrap gap-2">
                        {activeFilters.types.map((type) => (
                            <button
                                key={type}
                                className="bg-black hover:bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center capitalize"
                                onClick={() => {
                                    handleFilterChange("types", type);
                                }}
                            >
                                {type}
                            </button>
                        ))}
                        {activeFilters.categories.map((category) => (
                            <button
                                key={category}
                                className="bg-black hover:bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center capitalize"
                                onClick={() => {
                                    handleFilterChange("categories", category);
                                }}
                            >
                                {category}
                            </button>
                        ))}
                        {activeFilters.sizes.map((size) => (
                            <button
                                key={size}
                                className="bg-black hover:bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center capitalize"
                                onClick={() => {
                                    handleFilterChange("sizes", size);
                                }}
                            >
                                {size}
                            </button>
                        ))}
                        {activeFilters.colors.map((color) => (
                            <button
                                key={color}
                                className="bg-black hover:bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center capitalize"
                                onClick={() => {
                                    handleFilterChange("colors", color);
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
                                setActiveFilters({
                                    categories: [],
                                    colors: [],
                                    sizes: [],
                                    types: [],
                                });
                            }}
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex gap-2 h-11 w-full mx-auto items-center justify-center sm:justify-start">
                    No filters selected
                </div>
            )}
        </div>
    );
};

export default Filters;
