import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/PublicNavBar/Navbar";
import { Toaster } from "react-hot-toast";
import AdminNavbar from "@/components/adminNavbar";

const inter = Alexandria({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-full ">
            <AdminNavbar />
            <Toaster />
            <main className="flex-grow w-full  max-w-screen-2xl mx-auto  px-4 overflow-y-auto min-h-screen">
                {children}
            </main>
        </div>
    );
}
