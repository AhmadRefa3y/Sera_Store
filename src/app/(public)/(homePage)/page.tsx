import DB from "@/lib/prismaDb";
import BillboardSection from "./_components/Billboard";
import DiscountSection from "./_components/discount";
import ProductsCarousel from "./_components/productsCarousel";
import Footer from "./_components/footer";
import ImageCarousel from "./_components/imageCarousel";

export default async function Home() {
    const products = await DB.product.findMany({
        include: {
            images: true,
            category: true,
        },
    });
    return (
        <div className="flex-1 flex flex-col justify-between gap-2 ">
            <div className="flex flex-col gap-2 w-full   overflow-hidden ">
                <ImageCarousel />
                <DiscountSection />
                <BillboardSection />
                <ProductsCarousel products={products} />
            </div>
            <Footer />
        </div>
    );
}
