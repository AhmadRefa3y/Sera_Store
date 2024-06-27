import Image from "next/image";
import Link from "next/link";

const BillboardSection = () => (
    <Link href={"/shop"}>
        <div className="w-full h-full overflow-hidden relative ">
            <div className="z-10 relative h-[400px] sm:h-[700px] lg:h-[900px]">
                <Image
                    src={"/billboard.webp"}
                    alt=""
                    fill
                    className="w-full h-full object-center object-cover "
                />
            </div>
            <div className="absolute inset-0 top-1/2 opacity-25 bg-gradient-to-b from-transparent to-black z-20 from-10%    " />
            <div className="flex flex-col gap-2 items-center justify-center absolute bottom-10 left-1/2 -translate-x-1/2  z-30 ">
                <div className="sm:text-6xl text-5xl text-white w-full whitespace-nowrap py-3">
                    Modern Designs{" "}
                </div>
                <div className="text-xs text-white">
                    T-Shirts ، jackets ، jeans.
                </div>
                <div className="bg-white text-black px-4 py-2 text-sm">
                    Shop Now{" "}
                </div>
            </div>
        </div>
    </Link>
);

export default BillboardSection;
