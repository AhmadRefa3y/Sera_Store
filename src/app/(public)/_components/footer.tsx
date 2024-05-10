import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <div>
            <div className="bg-[#e4e4e4] w-full h-[400px] grid grid-cols-6 p-7 ">
                <div
                    className="col-span-2 font-normal gap-2  text-xs  flex flex-col justify-start py-4
               px-4 "
                >
                    <div className=" my-4 font-bold">حول متجرنا</div>
                    <Link href={"/"} className="hover:underline">
                        معلومات عنا
                    </Link>
                    <Link href={"/"} className="hover:underline">
                        معلومات التوصيل
                    </Link>
                    <Link href={"/"} className="hover:underline">
                        شروط واحكام الشراء
                    </Link>
                    <Link href={"/"} className="hover:underline">
                        شروط واحكام الموقع
                    </Link>
                    <Link href={"/"} className="hover:underline">
                        سياسة الخصوصية
                    </Link>
                    <Link href={"/"} className="hover:underline">
                        الارجاع والاستبدال
                    </Link>
                </div>
                <div
                    className="col-span-2 font-normal gap-2  text-xs max-w-[250px] flex flex-col justify-start  py-4
               px-4 "
                >
                    <div className=" my-4 font-bold">تواصل معنا </div>
                    <div className="leading-5	 ">
                        كن أول المطلعين على التشكيلات الجديدة و العروض الحصرية
                        والفعاليات في المحلات القريبة منك
                    </div>
                    <div className="flex my-2">
                        <input
                            type="email"
                            placeholder="ادخل بريدك الالكتروني"
                            className="focus-visible:outline-none px-2 bg-transparent border-b border-b-black placeholder:text-black"
                        />
                        <button className="bg-black px-5 py-2 text-center w-fit rounded-none text-white ">
                            اشترك
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
                <div
                    className="col-span-2 font-normal gap-2  text-xs  flex flex-col justify-start py-4
               px-4 "
                >
                    <div className=" my-4 font-bold ">تسوق حسب القسم </div>
                    <Link href={"/"} className="hover:underline">
                        الرجال
                    </Link>
                    <Link href={"/"} className="hover:underline">
                        النساء
                    </Link>
                    <Link href={"/"} className="hover:underline">
                        الاطفال
                    </Link>
                    <Link href={"/"} className="hover:underline">
                        الرضع
                    </Link>
                    <Link href={"/"} className="hover:underline">
                        الملابس الرياضية
                    </Link>
                    <Link href={"/"} className="hover:underline">
                        الخصومات{" "}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
