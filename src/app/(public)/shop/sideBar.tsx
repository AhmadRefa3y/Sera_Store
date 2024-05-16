import Link from "next/link";

const SideBar = () => {
    return (
        <div className="basis-[200px]  h-full text-xs font-normal">
            <div className="flex flex-col gap-1 ">
                <div className=" text-xs font-bold mb-3">تسوق حسب المنتج</div>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    اظهار الكل
                </Link>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    القمصان
                </Link>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    البنطلونات
                </Link>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    التيشيرتات
                </Link>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    الملابس
                </Link>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    الملابس الرياضية
                </Link>
            </div>
            <div className="flex flex-col gap-1 ">
                <div className=" text-xs font-bold mt-7 mb-3">اهم العروض</div>
                <Link
                    href={"/shop"}
                    className="hover:underline hover:text-red-500"
                >
                    الافضل مبيعاً
                </Link>
            </div>
        </div>
    );
};
