import DB from "@/lib/prismaDb";
import ProductForm from "./ProductForm";

const page = async ({ params }: { params: { id: string } }) => {
    const product = await DB.product.findUnique({
        where: {
            id: params.id,
        },
        include: {
            images: true,
        },
    });
    const sizes = await DB.size.findMany();
    const colors = await DB.color.findMany();
    const categories = await DB.category.findMany();
    const types = await DB.type.findMany();

    return (
        <div className="">
            <ProductForm
                categories={categories}
                sizes={sizes}
                colors={colors}
                initialData={product}
                types={types}
            />
        </div>
    );
};

export default page;
