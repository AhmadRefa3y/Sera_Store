"use client";
import { HeartIcon, Search } from "lucide-react";
import Link from "next/link";
import { FlyoutLink } from "./FlyoutLink";
import { PricingContent } from "./NavItemsContent";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";

const Navbar = () => {
    const session = useSession();

    const links = [
        {
            name: "Women",
            path: "/shop?suitableFor=women",
            FlyoutContent: <PricingContent />,
        },
        {
            name: "Men",
            path: "/shop?suitableFor=men",
            FlyoutContent: <PricingContent />,
        },
        {
            name: "Baby",
            path: "/shop?suitableFor=baby",
            FlyoutContent: <PricingContent />,
        },
        {
            name: "Kids",
            path: "/shop?suitableFor=kids",
        },
        {
            name: "Sports Wear",
            path: "/shop?categories=sports",
        },
    ];
    return (
        <div className="flex sm:justify-between justify-center h-32 items-center sm:px-10  py-2 ">
            <div className="basis-[25%] hidden sm:inline-flex">
                <div className="flex items-center justify-between border-b pb-1 border-black w-fit">
                    <input
                        placeholder="What are you looking for ?"
                        className="border-none bg-transparent outline-none focus-visible:ring-0 placeholder:text-sm placeholder:text-black"
                    />
                    <Search />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 sm:basis-[50%] basis-full ">
                <Link className="text-3xl py-3" href={"/"}>
                    Sera Store
                </Link>
                <div className=" z-50 w-full justify-center text-black gap-4  px-3  hidden lg:flex">
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
            <div className=" gap-4 items-center justify-end basis-[25%] hidden sm:flex">
                {session.data?.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="w-8 h-8 rounded-full relative">
                                <Image
                                    alt=""
                                    src={session.data?.user?.image || ""}
                                    fill
                                    className="rounded-full"
                                />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                {session.data?.user.name}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {session.data.user.role === "admin" && (
                                <DropdownMenuItem>
                                    <Link href={"/admin"}>Dashboard</Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                                <Button
                                    onClick={() => {
                                        signOut();
                                    }}
                                    variant={"ghost"}
                                    className=" w-full  justify-start py-0 h-full px-0"
                                >
                                    LogOut
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        onClick={() => signIn()}
                        className=""
                        variant={"ghost"}
                    >
                        Sign In{" "}
                    </Button>
                )}

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
