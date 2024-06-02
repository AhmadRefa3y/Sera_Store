import React from "react";
import CategoriesNavbar from "./categoriesNavbar";

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex flex-col h-full">
            <CategoriesNavbar />
            {children}
        </div>
    );
};

export default layout;
