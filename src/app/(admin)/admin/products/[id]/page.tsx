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
    const sizes = await DB.size.findMany({
        where: {
            products: {
                some: {},
            },
        },
    });
    const colors = await DB.color.findMany({
        where: {
            products: {
                some: {},
            },
        },
    });
    const categories = await DB.category.findMany({
        where: {
            products: {
                some: {},
            },
        },
    });

    return (
        <ProductForm
            categories={categories}
            sizes={sizes}
            colors={colors}
            initialData={product}
        />
    );
};

export default page;
