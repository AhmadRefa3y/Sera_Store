import SessionProviderWrapper from "@/components/providers/session";
import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";

const Inter = Dosis({ weight: "700", subsets: ["latin"] });
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
            <body className={`${Inter.className} bg-[#fafafa] capitalize  `}>
                <SessionProviderWrapper>{children}</SessionProviderWrapper>
            </body>
        </html>
    );
}
