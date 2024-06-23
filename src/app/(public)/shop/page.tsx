import getFilters from "@/data/GetFilters";
import ProductsGrid from "./productsClient";
import SideBarFilters from "./sideBarFiltersTop";

const page = async () => {
    const GetVariants = await getFilters();
    return (
        <div className="w-full flex flex-col gap-2  max-w-screen-xl mx-auto grow mb-3  ">
            <SideBarFilters {...GetVariants} />
            <ProductsGrid />
        </div>
    );
};

export default page;
