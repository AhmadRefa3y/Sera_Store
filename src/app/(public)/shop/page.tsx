import getFilters from "@/data/GetFilters";
import ProductsGrid from "./productsClient";
import SideBarFilters from "./sideBarFiltersTop";
import MobileFilters from "./MobileFilters";

const page = async () => {
    return (
        <div className="w-full flex flex-col gap-2  max-w-screen-xl mx-auto grow mb-3  ">
            <SideBarFilters />
            {/* <MobileFilters /> */}
            <ProductsGrid />
        </div>
    );
};

export default page;
