import DB from "@/lib/prismaDb";
import React from "react";

const page = () => {
    const products = DB.product.findMany({});
    return <div>page</div>;
};

export default page;
