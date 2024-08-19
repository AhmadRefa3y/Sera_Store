import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import AdminNavbar from "@/components/adminNavbar";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

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
    console.log(session?.user);

    if (!session) {
        redirect("/api/auth/signin");
    }
    if (session?.user.role !== "admin") {
        return (
            <div className="flex h-screen w-full items-center justify-center flex-col gap-2 ">
                <div className="text-3xl text-red-500">
                    You don&apost have permission to view this page
                </div>
                <Link href="/" className="text-blue-500">
                    back to homepage
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen max-h-screen overflow-hidden  ">
            <AdminNavbar />
            <Toaster />
            <main className="flex-grow  w-full mx-auto  px-4  max-h-screen overflow-y-scroll">
                {children}
            </main>
        </div>
    );
}
