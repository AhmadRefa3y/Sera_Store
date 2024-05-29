import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <div className="w-full mt-auto">
            <div className="bg-[#e4e4e4] w-full h-[400px] flex justify-between p-7 ">
                <div className="flex flex-1 gap-40">
                    <div
                        className="col-span-2 font-normal gap-2  text-xs  flex items-start flex-col justify-start py-4
               px-4 "
                    >
                        <div className=" my-4 font-bold">CORPORATE INFO</div>
                        <Link href={"/"} className="hover:underline">
                            About Us{" "}
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Delivery Information{" "}
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Terms and Conditions of Sale{" "}
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Website Terms & Conditions{" "}
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Privacy Policy{" "}
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Returns & Refunds{" "}
                        </Link>
                    </div>

                    <div
                        className="col-span-2 font-normal gap-2  text-xs  flex flex-col items-start justify-start py-4
               px-4 "
                    >
                        <div className=" my-4 font-bold ">SHOP BY</div>
                        <Link href={"/"} className="hover:underline">
                            Men
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Women
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Kids
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Baby
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Sports Wear
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Sale{" "}
                        </Link>
                    </div>
                    <div
                        className="col-span-2 font-normal gap-2  text-xs  flex flex-col items-start justify-start py-4
               px-4 "
                    >
                        <div className=" my-4 font-bold ">CUSTOMER SERVICE</div>
                        <Link href={"/"} className="hover:underline">
                            FAQs
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Contact Us{" "}
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Connect Via WhatsApp
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            Sitemap
                        </Link>
                    </div>
                </div>
                <div
                    className="col-span-2 font-normal gap-2  text-xs  flex flex-col items-start justify-start  py-4
               px-4 "
                >
                    <div className=" my-4 font-bold">NEWSLETTER</div>
                    <div className="leading-5	max-w-[250px] ">
                        be the first to know about our newest arrivals, special
                        offers and store events near you.
                    </div>
                    <div className="flex my-2">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="focus-visible:outline-none px-2 bg-transparent border-b border-b-black placeholder:text-black"
                        />
                        <button className="bg-black px-5 py-2 text-center w-fit rounded-none text-white ">
                            SIGN UP
                        </button>
                    </div>
                    <div className="flex gap-9 font-bold text-sm">
                        <Link href={"/"} className="hover:underline">
                            العربية
                        </Link>
                        <Link href={"/"} className="hover:underline">
                            English
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
