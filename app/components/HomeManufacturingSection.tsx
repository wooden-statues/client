"use client";

import { useState } from "react";
import HomeProducts from "./HomeProducts";

const HomeManufacturingSection = () => {
    const [images, setImages] = useState<any[]>([
        {
            coverImage: "/product-image-placeholder.png"
        },
        {
            coverImage: "/product-image-placeholder.png"
        },
        {
            coverImage: "/product-image-placeholder.png"
        }
    ]);

    return (
        <section className="flex items-center gap-16 flex-col bg-light py-20 w-full">
            <HomeProducts products={images} />
        </section>
    );
}

export default HomeManufacturingSection;