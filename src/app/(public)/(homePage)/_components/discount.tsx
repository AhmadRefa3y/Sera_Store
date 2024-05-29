import Link from "next/link";

const DiscountSection = () => (
    <div className="h-[200px] w-full bg-[#e4e4e4] flex flex-col items-center justify-center gap-2 text-lg font-bold py-4">
        <div>Prepare, Anticipate, Save</div>
        <div>30% Discount </div>
        <div> Online Only</div>
        <div className="flex items-center justify-center gap-4 text-white text-sm">
            <Link
                href={"/shop?types=women"}
                className="bg-black px-5 py-2 text-center w-fit rounded-none"
            >
                Women
            </Link>

            <Link
                href={"/shop?types=men"}
                className="bg-black px-5 py-2 text-center w-fit rounded-none"
            >
                Men
            </Link>

            <Link
                href={"/shop?types=kids"}
                className="bg-black px-5 py-2 text-center w-fit rounded-none"
            >
                Kids
            </Link>
        </div>
        <div className="text-black text-xs font-light">
            Offer Will Be Available Until 14-05-2024
        </div>
    </div>
);

export default DiscountSection;
