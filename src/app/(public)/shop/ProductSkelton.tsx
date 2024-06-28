import React from "react";

const ProductSkelton = ({ key }: { key: number }) => {
    return (
        <div
            className=" sm:w-[265px] w-[160px]   group group/parent  flex items-start flex-col gap-1  border border-transparent    duration-500  animate-pulse bg-white "
            key={key}
        >
            <div className="   w-full sm:h-[260px] h-[170px]   bg-gray-200  rounded-md"></div>
            <div className=" flex flex-col  gap-1 w-full 0 font-semibold justify-center items-center">
                <p className=" text-sm  overflow-hidden h-3 bg-gray-200  rounded-sm w-[70px]"></p>
                <p className=" text-sm  overflow-hidden  mt-auto h-3 bg-gray-200 w-[50px] rounded-sm "></p>
            </div>
        </div>
    );
};

export default ProductSkelton;
