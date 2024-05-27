import {
    BadgeDollarSign,
    LayoutDashboard,
    LineChart,
    Shirt,
    ShoppingBag,
    User,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
    const links = [
        {
            name: "الرئيسة",
            icon: <LayoutDashboard />,
            path: "/admin",
        },
        {
            name: "المنتجات",
            icon: <Shirt />,
            path: "/admin/products",
        },
        {
            name: "المبيعات",
            icon: <BadgeDollarSign />,
            path: "/admin/sales",
        },
        {
            name: "الطلبات",
            icon: <ShoppingBag />,
            path: "/admin/orders",
        },
        {
            name: "المستخدمين",
            icon: <User />,
            path: "/admin/users",
        },
        {
            name: "التقارير",
            icon: <LineChart />,
            path: "/admin/reports",
        },
        {
            name: "المتجر",
            icon: <LineChart />,
            path: "/",
        },
    ];
    return (
        <div className="w-[200px]  inset-y-0 right-0 flex flex-col items-start px-2 bg-[#151616] text-white h-full">
            <div className="text-2xl mb-10 py-2 font-bold w-full text-center">
                لوحة التحكم
            </div>
            <div className="flex flex-col gap-4 w-full">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        className="hover:bg-slate-300 hover:text-black p-2 rounded-md w-full font-bold text-sm flex gap-4   "
                        href={link.path}
                    >
                        {link.icon}
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminNavbar;
