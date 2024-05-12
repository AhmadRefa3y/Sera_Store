import Image from "next/image";
import Link from "next/link";

const BillboardSection = () => (
    <Link href={"/products"}>
        <div className="w-full h-full overflow-hidden relative ">
            <div className="z-10 relative">
                <Image
                    src={"/billboard.webp"}
                    alt=""
                    width={2252}
                    height={1368}
                    className="w-full h-full "
                />
            </div>
            <div className="absolute inset-0 top-1/2 opacity-25 bg-gradient-to-b from-transparent to-black z-20 from-10%    " />
            <div className="flex flex-col gap-2 items-center justify-center absolute bottom-10 left-1/2 -translate-x-1/2  z-30 ">
                <div className="text-6xl text-white w-full whitespace-nowrap py-3">
                    تصاميم دنيم عصرية
                </div>
                <div className="text-xs text-white">
                    تيشيرتات ، بنطلونات ، قمصان.
                </div>
                <div className="bg-white text-black px-4 py-2 text-sm">
                    تسوق الان
                </div>
            </div>
        </div>
    </Link>
);

export default BillboardSection;
