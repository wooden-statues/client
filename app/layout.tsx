import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export const metadata: Metadata = {
    title: "WoodenStatues",
    icons: {
        icon: "/logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <header>
                    <Navbar />
                    <Hero />
                </header>

                {children}
            </body>
        </html>
    );
}
