"use client";
import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CollapsibleFilter from "./AccordionFilter";
import { Accordion } from "@/components/ui/accordion";

interface MobileFiltersProps {
    Filters: {
        filterName: "categories" | "colors" | "sizes" | "types";
        filters: string[];
        activeFilters: string[];
    }[];
    handleFilterChange: (
        FilterName: "categories" | "colors" | "sizes" | "types",
        value: string
    ) => void;
}

const MobileFilters = ({ Filters, handleFilterChange }: MobileFiltersProps) => {
    return (
        <div className="sm:hidden ">
            <Sheet>
                <SheetTrigger className="w-full flex items-center justify-center capitalize gap-2">
                    Filter & sort <SlidersHorizontal />{" "}
                </SheetTrigger>
                <SheetContent className="p-0 pt-7 m-0 overflow-y-auto">
                    <Accordion type="multiple">
                        {Filters.map((filter) => (
                            <CollapsibleFilter
                                key={filter.filterName}
                                filterName={filter.filterName}
                                filters={filter.filters}
                                activeFilters={filter.activeFilters}
                                handleFilterChange={handleFilterChange}
                            />
                        ))}
                    </Accordion>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileFilters;
