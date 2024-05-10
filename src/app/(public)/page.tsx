import DB from "@/lib/prismaDb";
import BillboardSection from "./_components/Billboard";
import DiscountSection from "./_components/discount";
import ProductsCarousel from "./_components/productsCarousel";
import Footer from "./_components/footer";

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
            <Footer />
            {/* <ProductsGrid products={products} /> */}
        </div>
    );
}
