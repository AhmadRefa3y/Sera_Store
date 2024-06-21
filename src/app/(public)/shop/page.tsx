"use client";
import ProductsGrid from "./productsClient";
import SideBarFilters from "./sideBarFiltersTop";

const page = () => {
    return (
        <div className="w-full flex flex-col gap-2  max-w-screen-xl mx-auto grow mb-3  ">
            <SideBarFilters />
            <ProductsGrid />
        </div>
    );
};

export default page;
