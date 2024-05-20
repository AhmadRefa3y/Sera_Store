import ProductsGrid from "@/components/products";
import { GetProducts } from "@/data/GetProducts";
import { Category, Color, Prisma, Size, type } from "@prisma/client";
import SideBarFilters from "./sideBarFilters";
import { Suspense } from "react";
import LoadingPage from "@/components/loadingComp";

const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number];

interface productsProps {
    categories: Category[];
    sizes: Size[];
    colors: Color[];
    types: type[];
    searchParams: any;
}

type product = Prisma.ProductGetPayload<{
    include: {
        images: true;
        size: true;
        color: true;
        category: true;
        orderItems: true;
    };
}>;

const Products = async ({ searchParams, ...props }: productsProps) => {
    return (
        <div
            className="w-full flex flex-row gap-2  max-w-screen-xl mx-auto grow  "
            key={Math.random()}
        >
            <SideBarFilters {...props} />
            <Suspense fallback={<LoadingPage />}>
                <ProductsGrid searchParams={searchParams} />
            </Suspense>
        </div>
    );
};

export default Products;
