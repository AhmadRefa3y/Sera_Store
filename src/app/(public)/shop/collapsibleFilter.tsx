import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { ArrowDown } from "lucide-react";

interface CollapsibleFilterProps {
    filterName: "categories" | "color" | "size" | "suitableFor";

    activeFilters: string[];
    setActiveFilter: React.Dispatch<React.SetStateAction<string[]>>;
    openFilters: {
        categories: boolean;
        color: boolean;
        size: boolean;
        suitableFor: boolean;
    };
    setFilterOpen: React.Dispatch<
        React.SetStateAction<{
            categories: boolean;
            color: boolean;
            size: boolean;
            suitableFor: boolean;
        }>
    >;
    isFilterOpen: boolean;
    handleCheckboxChange: (
        type: string,
        value: string,
        setActive: React.Dispatch<React.SetStateAction<string[]>>,
        active: string[]
    ) => void;
    filters: string[];
}

const CollapsibleFilter = ({
    isFilterOpen,
    filterName,
    activeFilters,
    openFilters,
    setFilterOpen,
    setActiveFilter,
    handleCheckboxChange,
    filters,
}: CollapsibleFilterProps) => {
    return (
        <Collapsible>
            <CollapsibleTrigger asChild>
                <button
                    className={`flex sm:justify-normal justify-between w-full gap-2 capitalize p-4 ${
                        openFilters[filterName] && "text-red-500"
                    }`}
                    onClick={() => {
                        setFilterOpen((prev) => ({
                            ...prev,
                            [filterName]: !isFilterOpen,
                        }));
                    }}
                >
                    <span className="text-xl flex-1 mr-auto  text-left">
                        {filterName}
                    </span>
                    <span className="flex  text-black text-xs items-center justify-center h-[28px]">
                        {activeFilters.slice(0, 2).map((item, id) => (
                            <span key={`${item}-${id}`}>
                                {item}{" "}
                                {id === 0 && activeFilters.length > 1 && ","}
                            </span>
                        ))}
                        {activeFilters.length > 2 && (
                            <span className="m-1">
                                ( {activeFilters.length > 2 && "+"}
                                {activeFilters.length > 2 &&
                                    +activeFilters.length - 2}
                                )
                            </span>
                        )}
                    </span>
                    <ArrowDown
                        className={`${
                            openFilters[filterName] && "rotate-180"
                        } duration-300`}
                    />
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                {filters.map((item) => (
                    <Button
                        key={item}
                        variant={"outline"}
                        className="w-full border-none rounded-none capitalize flex items-center justify-start p-0 py-1 hover:bg-[#f4eddd]"
                        onClick={() => {
                            handleCheckboxChange(
                                filterName,
                                item,
                                setActiveFilter,
                                activeFilters
                            );
                        }}
                    >
                        <div className=" h-6 w-6  bg-transparent border border-black rounded-full mx-3 flex items-center justify-center ">
                            {activeFilters.includes(item) && (
                                <span className="h-4 w-4 rounded-full bg-black  inline-flex z-50" />
                            )}
                        </div>
                        {item}
                    </Button>
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default CollapsibleFilter;
