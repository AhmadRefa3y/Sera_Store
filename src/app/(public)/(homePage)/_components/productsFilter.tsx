import { SuitableFor } from "@prisma/client";

const FilterProducts = ({
    setfilters,
    filters,
}: {
    setfilters: any;
    filters: {
        category: "men" | "women" | "kids" | "all";
    } | null;
}) => {
    const SuitableForEnums = Object.keys(SuitableFor);

    return (
        <div className="flex gap-2 w-full items-center justify-center py-2">
            {SuitableForEnums.map((category) => (
                <button
                    key={category}
                    onClick={() =>
                        setfilters({
                            category: category,
                        })
                    }
                    className={`w-fit rounded-full px-4 py-1 text-black border border-black font-bold text-sm capitalize ${
                        category === filters?.category
                            ? "text-white border-none bg-red-500 "
                            : ""
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default FilterProducts;
