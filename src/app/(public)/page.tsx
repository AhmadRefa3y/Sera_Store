import ProductsGrid from "@/components/products";
import DB from "@/lib/prismaDb";

export default async function Home() {
    const products = await DB.product.findMany({
        include: {
            images: true,
        },
    });
    console.log(products);
    return (
        <div>
            <div className="text-xl font-bold my-2 text-center">
                اجدد التيشيرتات
            </div>
            <ProductsGrid products={products} />
        </div>
    );
}
