import ProductsGrid from "./Products";
import Filters from "./Filters";
import ProductSkelton from "./ProductSkelton";
import { Suspense } from "react";

const page = async ({ searchParams }: { searchParams: any }) => {
    return (
        <div className="w-full flex flex-col gap-2  max-w-screen-xl mx-auto grow mb-3  ">
            <Filters />
            <Suspense fallback={<Fallback />} key={Math.random()}>
                <ProductsGrid searchParams={searchParams} />
            </Suspense>
        </div>
    );
};

export default page;

const Fallback = () => {
    return (
        <div className="flex w-full  justify-center items-start h-full  flex-wrap gap-2 flex-1">
            {new Array(10).fill(null).map((_, i) => (
                <ProductSkelton key={i} />
            ))}
            ;
        </div>
    );
};
