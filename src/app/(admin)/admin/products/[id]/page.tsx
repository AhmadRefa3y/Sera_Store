import DB from "@/lib/prismaDb";
import ProductForm from "./ProductForm";

const page = async ({ params }: { params: { id: string } }) => {
    console.log(params);
    const product = await DB.product.findUnique({
        where: {
            id: params.id,
        },
        include: {
            images: true,
        },
    });
    console.log(product);

    return (
        <div className="">
            <ProductForm
                categories={[]}
                sizes={[]}
                colors={[]}
                initialData={product}
            />
        </div>
    );
};

export default page;
