import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/PublicNavBar/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Sera Store",
    description: "Generated by create next app",
};

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-screen-xl mx-auto min-h-screen flex flex-col px-2">
            <Toaster />
            <Navbar />
            <main className="flex-1 flex flex-col ">{children}</main>
        </div>
    );
}
