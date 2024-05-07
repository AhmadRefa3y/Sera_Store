"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const links = [
        {
            name: "الرئيسة",
            path: "/",
        },
        {
            name: "النساء",
            path: "/women",
        },
        {
            name: "الرجال",
            path: "/",
        },
        {
            name: "الاطفال",
            path: "/",
        },
        {
            name: "ملابس رياضية",
            path: "/",
        },
    ];
    return (
        <div className="flex justify-between h-20 font-bold items-center px-10 border border-b-stone-300 ">
            <div className="text-3xl">لوجو</div>
            <div className="flex  items-center justify-center h-full">
                {links.map((link) => (
                    <Link
                        className=" hover:bg-stone-300 h-full flex items-center justify-center px-2 hover:underline underline-offset-8"
                        key={link.name}
                        href={link.path}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger dir="ltr">
                        <User />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel dir="rtl">حسابي</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link className="mx-5" href={"/admin/products/1"}>
                            لوحة التحكم
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant={"ghost"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    );
};

export default Navbar;
