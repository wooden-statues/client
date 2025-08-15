"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

export default function RequestSuccess() {
    const [products] = useState<Product[]>([
        {
            title: "Име на продукта",
            coverImage: "/product-image-placeholder.png",
            id: "1"
        },
        {
            title: "Име на продукта",
            coverImage: "/product-image-placeholder.png",
            id: "2"
        },
        {
            title: "Име на продукта",
            coverImage: "/product-image-placeholder.png",
            id: "3"
        },
        {
            title: "Име на продукта",
            coverImage: "/product-image-placeholder.png",
            id: "4"
        },
        {
            title: "Име на продукта",
            coverImage: "/product-image-placeholder.png",
            id: "5"
        },
        {
            title: "Име на продукта",
            coverImage: "/product-image-placeholder.png",
            id: "6"
        }
    ]);
    const router = useRouter();

    return (
        <>
            <main className="flex flex-col items-center gap-[5vw] pt-[8.5vw] pb-[5.83vw] relative">
                <h1 className="text-[6.94vw] font-iowan text-[#0C1203] drop-shadow-[0_15px_6px_rgba(0,0,0,0.25)] max-xs:text-[9vw] max-xs:py-[4vw]">Статуетки</h1>

                <Image src="/gallery-background.png" alt="gallery background image" width={1000} height={0} className="w-[50%] absolute top-[-2%] opacity-10 -z-10 left-[2%] max-xs:hidden" />
                <Image src="/gallery-background.png" alt="gallery background image" width={1000} height={0} className="w-[50%] absolute top-[-2%] opacity-10 -z-10 right-[2%] rotate-y-180 max-xs:hidden" />

                <Image src="/request-success-statue.png" alt="gallery background image phone version" width={1000} height={0} className="w-[12%] absolute top-[2vw] opacity-100 -z-10 left-[15%] hidden max-xs:block" />
                <Image src="/request-success-statue.png" alt="gallery background image phone version" width={1000} height={0} className="w-[12%] absolute top-[2vw] opacity-100 -z-10 right-[15%] rotate-y-180 hidden max-xs:block" />

                <section className="grid grid-cols-3 justify-between w-[70%] gap-[4.5vw] max-xs:grid-cols-1 max-xs:w-full max-xs:gap-[9vw]">
                    {products.map((product: Product, index: number) => (
                        <article onClick={() => router.push(`/details/${product.id}`)} className="flex flex-col items-center bg-light p-[1.39vw] rounded-[20px] drop-shadow-[0_5px_7px_rgba(0,0,0,0.25)] cursor-pointer max-xs:bg-transparent max-xs:gap-[3vw]" key={index}>
                            <Image src={product.coverImage} alt={product.title || "image of product or manufacturing way"} width={411} height={0} className="w-[100%] rounded-[20px]" />
                            <p className="font-inter font-medium text-[#0C1203] text-[1.4vw] max-xs:text-[3.2vw]">{product.title}</p>
                        </article>
                    ))}
                </section>
            </main>
        </>
    );
}