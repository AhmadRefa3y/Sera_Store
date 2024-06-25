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
import { ArrowDown, Settings2, SlidersHorizontal } from "lucide-react";
import getFilters from "@/data/GetFilters";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CollapsibleFilter from "./collapsibleFilter";

interface MobileFiltersProps {
    Filters: {
        filterName: "categories" | "color" | "size" | "suitableFor";
        filters: string[];
        activeFilters: string[];
        isFilterOpen: boolean;
        setActiveFilter: React.Dispatch<React.SetStateAction<string[]>>;
    }[];
    openFilters: {
        categories: boolean;
        color: boolean;
        size: boolean;
        suitableFor: boolean;
    };
    handleCheckboxChange: (
        name: string,
        value: string,
        setState: React.Dispatch<React.SetStateAction<string[]>>,
        state: string[]
    ) => void;
    setFilterOpen: React.Dispatch<
        React.SetStateAction<{
            categories: boolean;
            color: boolean;
            size: boolean;
            suitableFor: boolean;
        }>
    >;
}

const MobileFilters = ({
    Filters,
    handleCheckboxChange,
    openFilters,
    setFilterOpen,
}: MobileFiltersProps) => {
    return (
        <div className="sm:hidden ">
            <Sheet
                onOpenChange={() => {
                    setFilterOpen((prev) => ({
                        ...prev,
                        categories: false,
                        color: false,
                        size: false,
                        suitableFor: false,
                    }));
                }}
            >
                <SheetTrigger className="w-full flex items-center justify-center capitalize gap-2">
                    Filter & sort <SlidersHorizontal />{" "}
                </SheetTrigger>
                <SheetContent className="p-0 pt-7 m-0 overflow-y-auto">
                    {Filters.map((filter) => (
                        <CollapsibleFilter
                            key={filter.filterName}
                            filterName={filter.filterName}
                            filters={filter.filters}
                            activeFilters={filter.activeFilters}
                            isFilterOpen={filter.isFilterOpen}
                            setActiveFilter={filter.setActiveFilter}
                            handleCheckboxChange={handleCheckboxChange}
                            openFilters={openFilters}
                            setFilterOpen={setFilterOpen}
                        />
                    ))}
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileFilters;
