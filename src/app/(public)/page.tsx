import ProductsGrid from "@/components/products";
import DB from "@/lib/prismaDb";
import Image from "next/image";
import Link from "next/link";
import ProductsCarousel from "./productsCarousel";

export default async function Home() {
    const products = await DB.product.findMany({
        include: {
            images: true,
        },
    });
    return (
        <div className="flex flex-col gap-2">
            <DiscountSection />
            <BillboardSection />
            <ProductsCarousel products={products} />
            {/* <ProductsGrid products={products} /> */}
        </div>
    );
}

const DiscountSection = () => (
    <div className="h-[200px] w-full bg-[#e4e4e4] flex flex-col items-center justify-center gap-2 text-lg font-bold py-4">
        <div>استعدّوا, ترقّبوا, وفّروا</div>
        <div>خصم 30%</div>
        <div>أونلاين فقط</div>
        <div className="flex items-center justify-center gap-4 text-white text-sm">
            <Link
                href={"/products"}
                className="bg-black px-5 py-2 text-center w-fit rounded-none"
            >
                النساء
            </Link>

            <Link
                href={"/products"}
                className="bg-black px-5 py-2 text-center w-fit rounded-none"
            >
                الرجال
            </Link>

            <Link
                href={"/products"}
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
