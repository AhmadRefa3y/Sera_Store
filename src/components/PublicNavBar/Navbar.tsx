"use client";
import { HeartIcon, Search } from "lucide-react";
import Link from "next/link";
import { FlyoutLink } from "./FlyoutLink";
import { PricingContent } from "./navItemsContent";

const Navbar = () => {
    const links = [
        {
            name: "النساء",
            path: "/women",
            FlyoutContent: <PricingContent />,
        },
        {
            name: "الرجال",
            path: "/",
            FlyoutContent: <PricingContent />,
        },
        {
            name: "الرضع",
            path: "/",
            FlyoutContent: <PricingContent />,
        },
        {
            name: "الاطفال",
            path: "/",
        },
        {
            name: "ملابس رياضية",
            path: "/",
        },
        {
            name: "الخصومات",
            path: "/",
        },
    ];
    return (
        <div className="flex justify-between h-32 items-center px-10  py-2 ">
            <div className="basis-[25%]">
                <div className="flex items-center justify-between border-b pb-1 border-black w-fit">
                    <input
                        placeholder="عن ماذا تبحث ؟"
                        className="border-none outline-none focus-visible:ring-0 placeholder:text-sm placeholder:text-black"
                    />
                    <Search />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 basis-[50%]">
                <div className="flex items-center justify-center font-normal text-xs gap-2">
                    <Link href={"/signup"}>تسجيل مستخدم جديد</Link>
                    <Link href={"/signup"}>تسجيل الدخول</Link>
                    <Link href={"/signup"}>البحث عن محلاتنا</Link>
                    <Link href={"/signup"}>English</Link>
                </div>
                <div className="text-3xl py-3">لوجو</div>
                <div className="flex z-50 w-full justify-center text-black gap-4  px-3 ">
                    {links.map((link) => (
                        <FlyoutLink
                            href={link.path}
                            FlyoutContent={link.FlyoutContent}
                            key={link.name}
                        >
                            {link.name}
                        </FlyoutLink>
                    ))}
                </div>
            </div>
            <div className="flex gap-4 items-center justify-end basis-[25%]">
                <Link
                    href={"/wishlist"}
                    className="text-sm hover:opacity-70 duration-200"
                >
                    <HeartIcon size={30} />
                </Link>
                <Link
                    href={"/cart"}
                    className="text-sm hover:opacity-70 duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className=" w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
