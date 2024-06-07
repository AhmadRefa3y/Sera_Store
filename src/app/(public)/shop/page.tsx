import { Spinner } from "@/components/loadingComp";
import ProductsGrid from "@/components/products";
import DB from "@/lib/prismaDb";
import { Suspense } from "react";
import SideBarFilters from "./sideBarFilters";

const page = async ({ searchParams }: { searchParams: any }) => {
    const categories = await DB.category.findMany({
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
    const sizes = await DB.size.findMany({
        where: {
            products: {
                some: {},
            },
        },
    });

    return (
        <div
            className="w-full flex flex-row gap-2  max-w-screen-xl mx-auto grow  "
            key={Math.random()}
        >
            <SideBarFilters
                categories={categories}
                colors={colors}
                sizes={sizes}
            />
            <Suspense fallback={<Spinner />}>
                <ProductsGrid searchParams={searchParams} />
            </Suspense>
        </div>
    );
};

export default page;
