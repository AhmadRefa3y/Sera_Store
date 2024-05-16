import { X } from "lucide-react";

const SelectedFilters = ({ searchParams }: { searchParams: any }) => {
    const priceFIlters = searchParams.priceRange;
    const sizeFilter = searchParams.size;
    const priceFIltersSpilted = priceFIlters?.split("-");

    return (
        <div className="flex gap-2">
            <div>الاختيارات المحددة</div>
            {priceFIlters && (
                <div className="flex gap-2 items-center justify-center ">
                    {`${priceFIltersSpilted[0]}   ج.م-  ${priceFIltersSpilted[1]}   ج.م`}
                    <span>
                        <X className="w-6 h-6  text-muted-foreground" />
                    </span>
                </div>
            )}
            {sizeFilter && (
                <div className="flex gap-2 items-center justify-center  ">
                    <span className="px-4 text-lg"> {sizeFilter}</span>{" "}
                    <span>
                        <X className="w-6 h-6  text-muted-foreground" />
                    </span>
                </div>
            )}
        </div>
    );
};

export default SelectedFilters;
