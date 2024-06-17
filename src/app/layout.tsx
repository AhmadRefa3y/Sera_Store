import SessionProviderWrapper from "@/components/providers/session";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const Inter = Poppins({ weight: "400", subsets: ["latin"] });
export const metadata: Metadata = {
    title: "Sera Store",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${Inter.className}  min-h-screen flex flex-col bg-[#fafafa] capitalize font-bold h-full`}
            >
                <SessionProviderWrapper>{children}</SessionProviderWrapper>
            </body>
        </html>
    );
}
