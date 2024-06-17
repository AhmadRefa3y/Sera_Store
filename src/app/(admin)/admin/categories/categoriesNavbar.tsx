"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const CategoriesNavbar = () => {
    const pathName = usePathname();
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
        <div className="flex justify-center gap-4 font-semibold items-center text-muted-foreground min-h-16 text-lg border-b border-b-stone-300">
            {Links.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    className={`hover:text-black cursor-pointer ${
                        pathName === link.href ? " text-black " : ""
                    }`}
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
};

export default CategoriesNavbar;
