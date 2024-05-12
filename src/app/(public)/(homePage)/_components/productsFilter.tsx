const FilterProducts = ({
    categories,
    setfilters,
    filters,
}: {
    categories: { name: string; value: string }[];
    setfilters: any;
    filters: {
        category: "men" | "women" | "kids" | "all";
    } | null;
}) => {
    return (
        <div className="flex gap-2 w-full items-center justify-center py-2">
            {categories.map((category) => (
                <button
                    key={category.value}
                    onClick={() =>
                        setfilters({
                            category: category.value,
                        })
                    }
                    className={`w-fit rounded-full px-4 py-1 text-black border border-black font-bold text-sm ${
                        category.value === filters?.category
                            ? "text-white border-none bg-red-500"
                            : ""
                    }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default FilterProducts;
