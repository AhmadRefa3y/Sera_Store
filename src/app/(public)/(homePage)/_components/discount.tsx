import Link from "next/link";

const DiscountSection = () => (
    <div className="h-[200px] w-full bg-[#e4e4e4] flex flex-col items-center justify-center gap-2 text-lg font-bold py-4">
        <div>استعدّوا, ترقّبوا, وفّروا</div>
        <div>خصم 30%</div>
        <div>أونلاين فقط</div>
        <div className="flex items-center justify-center gap-4 text-white text-sm">
            <Link
                href={"/shop?types=نساء"}
                className="bg-black px-5 py-2 text-center w-fit rounded-none"
            >
                النساء
            </Link>

            <Link
                href={"/shop?types=رجالي"}
                className="bg-black px-5 py-2 text-center w-fit rounded-none"
            >
                الرجال
            </Link>

            <Link
                href={"/shop?types=اطفال"}
                className="bg-black px-5 py-2 text-center w-fit rounded-none"
            >
                الاطفال
            </Link>
        </div>
        <div className="text-black text-xs font-light">
            يسري العرض على قطع مختارة لغاية تاريخ 14-05-2024.
        </div>
    </div>
);

export default DiscountSection;
