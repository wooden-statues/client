"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import HomeProducts from "./HomeProducts";

const Liked = () => {
    const [products] = useState<Product[]>([
        {
            title: "Име на продукта",
            coverImage: "/product-image-placeholder.png"
        },
        {
            title: "Име на продукта",
            coverImage: "/product-image-placeholder.png"
        },
        {
            title: "Име на продукта",
            coverImage: "/product-image-placeholder.png"
        }
    ]);

    return (
        <section className="flex items-center gap-[4.44vw] flex-col bg-light pt-20 w-full">
            <h1 className="italic font-iowan font-semibold text-[4.86vw] text-brown drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]">Най - харесвани:</h1>

            <HomeProducts products={products} />
        </section>
    );
}

export default Liked;