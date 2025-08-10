"use client";

import { useState } from "react";
import HomeProducts from "./HomeProducts";
import SecondaryHomeSection from "./SecondaryHomeSection";
import { Product } from "@/types/product";

const Artist = () => {
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
        <section className="flex flex-col items-center">
            <SecondaryHomeSection
                coverImage="/artist-image-placeholder.png"
                title="За артиста"
                description="Георги Георгиев е талантлив майстор, който се занимава с ръчна изработка на уникални дървени статуетки."
                isReversed={false}
            />

            <article className="flex items-center gap-16 flex-col bg-light pt-20 pb-6 w-full">
                <HomeProducts products={products} />
            </article>
        </section>

    );
}

export default Artist;