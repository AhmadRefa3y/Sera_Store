import ProductsGrid from "./Products";
import Filters from "./Filters";

const page = async () => {
    return (
        <div className="w-full flex flex-col gap-2  max-w-screen-xl mx-auto grow mb-3  ">
            <Filters />
            <ProductsGrid />
        </div>
    );
};

export default page;
