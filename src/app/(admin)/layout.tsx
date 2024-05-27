import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/PublicNavBar/Navbar";
import { Toaster } from "react-hot-toast";
import AdminNavbar from "@/components/adminNavbar";
import { auth } from "@/auth";
import Link from "next/link";

const inter = Alexandria({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard - Sera Store",
    description: "",
};

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if (session?.user.role !== "admin") {
        return (
            <div className="flex h-screen w-full items-center justify-center flex-col gap-2 ">
                <div className="text-3xl text-red-500">
                    ليس لديك الصلاحيات اللازمة لعرض هذه الصفحة
                </div>
                <Link href="/" className="text-blue-500">
                    الرجوع الي الصفحة الرئيسية
                </Link>
            </div>
        );
    }

    return (
        <div className="flex  h-screen ">
            <AdminNavbar />
            <Toaster />
            <main className="flex-grow w-full  max-w-screen-2xl mx-auto  px-4 overflow-y-auto min-h-screen">
                {children}
            </main>
        </div>
    );
}
