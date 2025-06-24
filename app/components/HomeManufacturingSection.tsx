"use client";

import { useState } from "react";
import HomeProducts from "./HomeProducts";

const HomeManufacturingSection = () => {
    const [images, setImages] = useState<any[]>([
        {
            imageUrl: "/product-image-placeholder.png"
        },
        {
            imageUrl: "/product-image-placeholder.png"
        },
        {
            imageUrl: "/product-image-placeholder.png"
        }
    ]);

    return (
        <section className="flex items-center gap-16 flex-col bg-light py-20 w-full">
            <HomeProducts products={images} />
        </section>
    );
}

export default HomeManufacturingSection;