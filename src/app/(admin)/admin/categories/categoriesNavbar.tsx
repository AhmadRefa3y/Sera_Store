import Link from "next/link";
import React from "react";

const CategoriesNavbar = () => {
    const Links = [
        {
            name: "sizes",
            href: "/admin/categories/sizes",
        },
        {
            name: "colors",
            href: "/admin/categories/colors",
        },
        {
            name: "Categories",
            href: "/admin/categories/categories",
        },
    ];
    return (
        <div className="flex justify-center gap-4 items-center h-16 text-lg border-b border-b-stone-300">
            {Links.map((link) => (
                <Link
                    href={link.href}
                    className="hover:text-blue-500 cursor-pointer"
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
};

export default CategoriesNavbar;
