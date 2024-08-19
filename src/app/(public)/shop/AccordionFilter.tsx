import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface CollapsibleFilterProps {
    filterName: "categories" | "colors" | "sizes" | "types";

    activeFilters: string[];

    handleFilterChange: (
        // eslint-disable-next-line no-unused-vars
        FilterName: "categories" | "colors" | "sizes" | "types",
        // eslint-disable-next-line no-unused-vars
        value: string
    ) => void;
    filters: string[];
}

const CollapsibleFilter = ({
    filterName,
    activeFilters,
    handleFilterChange,
    filters,
}: CollapsibleFilterProps) => {
    return (
        <AccordionItem value={filterName}>
            <AccordionTrigger>
                <button
                    className={`flex sm:justify-normal justify-between w-full  capitalize p-2 `}
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
                </button>
            </AccordionTrigger>
            <AccordionContent>
                {filters.map((item) => (
                    <Button
                        key={item}
                        variant={"outline"}
                        className="w-full border-none rounded-none capitalize flex items-center justify-start p-0 py-1 hover:bg-[#f4eddd]"
                        onClick={() => {
                            handleFilterChange(filterName, item);
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
            </AccordionContent>
        </AccordionItem>
    );
};

export default CollapsibleFilter;
