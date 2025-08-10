"use client";

import HomeProducts from '@/components/HomeProducts';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Details() {
    const [product] = useState({
        title: "Име на продукта",
        description: "Тази изящна дървена статуетка изобразява абстрактна фигура в елегантен устрем нагоре, сякаш уловила миг на вдъхновение. Плавните ѝ линии и топлият тон на дървото внушават движение, лекота и духовна възвишеност. Малка, но силна поетика, вплетена в дърво.",
        coverImage: "/product-image-placeholder.png",
        images: ["/product-image-placeholder.png", "/product-image-placeholder.png", "data:image/webp;base64,UklGRh4FAABXRUJQVlA4IBIFAACwGACdASqUAHcAPoEioFAlISUlFQCgEAlnA9gN6l5wadwOsVgyupngLlbMFtNU0DpAC7JI00chWkT6yTlfN4b/Du6m+6whg0+xEJ4ogqNY3x+lO/qOZQcLaCr+PWLZWCrwm/UMxEl3vUMuFjtelsFfJhMaUQJX+D1l/LDdX3NVF54ZBkDpy8hpvlfUmTp3WptQahZ4QNvmyj78HA5Z2o5F15Na7yN/n7Yxh0mmM5oQAwXwxpkkYuaZpLKDxTjwmS7hfWJprvWTgDCcjVOdUAD+6BlngJb+1P3s+eqD/+N/q18mW8z1h0kY98TwJSkvv0CsTP0fb+0NGFPFodiSWx+BK70DET4GFNubTvOkPoJQeqmrJY5FmW6lyXKvmlcleVAre63+QNx7YF98kIJoFNzpsH/AwJYs7mXtFz9niYCVoEU/zFhuNwDn2+FuGqcz5fVCqRl2kT0sAKJK05aw2RjlYJlBQQHaxbiOkZHgq/FaOVfTPc3azWnWaSZT/PBDE3PrJOTm16uTzv+YdCcOt38FvxQwjRo5Pib802Q/jr6yZOiYHn8WmOmh74U21aaKvxzlv5tejuxY0EEKXWWzSRNBvDVEYP/lOGox6DJJQtTM1OCxmcTFwL3T3bpipwReu+OFIzdR3Ohd7pvpnT36cW9CPMEjMgU/+BA1MrlHrkCfHeEZ/wOhPBHd0InwQWlDYltW4A0CDcxRCQ+gG6F46u0YcF7mxVYzhf7/iN0R2xYxXT3uN/lk0FKrV/IJyg7apEUKBLzom0NT0Ik5bnFpOrlYjSZQ2nGCHB1u08vxZkk/D9DxNPFDX6GcG9aQDXLyAk434g+zax/6BFh6ina/PElzC40j/D5OhZFnPJ7V4TOcehfPfwM43P5uNsVoZ32Qsqb7j/sREmpEXNNoDElzfbPbMFesYZtY7IwfqSRbGoX3fxUkd85ghlJQVe8SkcLNOljGU5GktSDMVIs3GbaA5nQ1od76IxbBU+yivUivr2TEZxJvVh3VgwPVGwS7aKhnDfYDQ8IB7Pnf0mpQcPTpvZ/25WGzU7dwKq+JKdhwh06ICK3JhKjmxchBLRNR1IP3veX0oROSIzmh6WOE0hANMPBxRmUUZaTKf+lQ8E1InT2c96NwaZGu3pX/wBIl4LxSvShbYAm6+Mgsg4BKu/VPiukqLIglYMx+Tiz9rWxk94ld34NgpimT0+Wi8EVU+FJZXKQCFObYmTFBXXXkuYKHpJbst+0KAB8+ytVPjJPIgfdBzodDICwm84CZOJzMxGFIlZwLJEt3BUCSWCwxALZr6fl1KmERYwCGBhMqU8EC9fjWIY4vn3X9i2h1dG3nro1eqxod+ARoaz6cETWo5SYNQzpYF+1P6cSjjU1K96M7nUCU72oYengo6TyZ8n/+r6WgRRbRi7SoRiPyN1ebaQ5/Fk41MSYqztSTSnWrZS6D+GwjZ5japt53T6j5jm0Ypx6tajJVXxjyyu4WbV0IP5XQljGiQqIF2uFeJB7WgADYb1yBrAdsgF/XLxnOAr94x7LSfuUiEHBkEOqG8q1MEp7dTmeEpgrC8iHO1qzuwD1X9bU75/rbv2DM6VAOZYHgPj9Er1oyPLVQUcw0uSW2VHqRgt2LZWOrg5evrpopGJpGkIl0ma5du7RaqKJjwCahS+UVASeBiFHCALGgAbi3ipysSGOgVQhgb+D+usaYHtuN2MFZVs0vejfFFekJ7dnzG9yoxgAAAA=="],
        id: "1"
    });
    const [relatedProducts] = useState<Product[]>([
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
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const id = useParams<{ id: string }>().id;

    function upIndex() {
        if (activeImageIndex < product.images.length - 1) {
            setActiveImageIndex(prev => prev += 1);
        }
        else {
            setActiveImageIndex(0);
        }
    }

    function downIndex() {
        if (activeImageIndex > 0) {
            setActiveImageIndex(prev => prev -= 1);
        }
        else {
            setActiveImageIndex(product.images.length - 1);
        }
    }

    return (
        <>
            <main>
                <section className="grid grid-cols-2 w-4/5 justify-center gap-[5vw] pt-[8.5vw] pb-[5.83vw] relative mx-auto">
                    <Image src="/request-success-statue.png" alt="details background image" width={1000} height={0} className="w-[30%] absolute bottom-[-5.83vw] right-[-100px] opacity-50 rotate-y-180" />

                    <section className='flex flex-col items-center gap-[1.7vw]'>
                        <article className='flex items-center justify-between w-9/10'>
                            <svg onClick={downIndex} className='h-[2.64vw] cursor-pointer' viewBox="0 0 13 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.820112 16.8614L9.2991 1.81903C9.45721 1.53853 9.64492 1.31602 9.8515 1.16421C10.0581 1.0124 10.2795 0.934265 10.5031 0.934265C10.9547 0.934265 11.3878 1.25253 11.7071 1.81903C11.8652 2.09954 11.9907 2.43255 12.0762 2.79905C12.1618 3.16555 12.2058 3.55836 12.2058 3.95505C12.2058 4.75621 12.0265 5.52456 11.7071 6.09107L4.4152 18.9974L11.7071 31.9038C11.8661 32.1835 11.9922 32.5162 12.0783 32.8828C12.1644 33.2494 12.2087 33.6427 12.2087 34.0398C12.2087 34.437 12.1644 34.8302 12.0783 35.1968C11.9922 35.5634 11.8661 35.8962 11.7071 36.1758C11.5495 36.4578 11.3619 36.6816 11.1553 36.8344C10.9486 36.9871 10.727 37.0657 10.5031 37.0657C10.2792 37.0657 10.0576 36.9871 9.85095 36.8344C9.6443 36.6816 9.45674 36.4578 9.2991 36.1758L0.820112 21.1335C0.661168 20.8538 0.535008 20.521 0.448915 20.1544C0.362822 19.7878 0.318497 19.3946 0.318497 18.9974C0.318497 18.6003 0.362822 18.2071 0.448915 17.8404C0.535008 17.4738 0.661168 17.1411 0.820112 16.8614Z" fill="black" />
                            </svg>

                            <Image src={product.images[activeImageIndex]} alt={product.title} width={1000} height={0} className="w-[70%] rounded-[10px] object-cover aspect-[2/3]" />

                            <svg onClick={upIndex} className='h-[2.64vw] cursor-pointer' viewBox="0 0 13 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5974 16.8614L3.11838 1.81903C2.96027 1.53853 2.77256 1.31602 2.56598 1.16421C2.35939 1.0124 2.13798 0.934265 1.91437 0.934265C1.46278 0.934265 1.02968 1.25253 0.710353 1.81903C0.55224 2.09954 0.426817 2.43255 0.341246 2.79905C0.255676 3.16555 0.211635 3.55836 0.211635 3.95505C0.211635 4.75621 0.391029 5.52456 0.710353 6.09107L8.00228 18.9974L0.710353 31.9038C0.551409 32.1835 0.425251 32.5162 0.339158 32.8828C0.253065 33.2494 0.20874 33.6427 0.20874 34.0398C0.20874 34.437 0.253065 34.8302 0.339158 35.1968C0.425251 35.5634 0.551409 35.8962 0.710353 36.1758C0.868 36.4578 1.05556 36.6816 1.2622 36.8344C1.46885 36.9871 1.6905 37.0657 1.91437 37.0657C2.13824 37.0657 2.35988 36.9871 2.56653 36.8344C2.77318 36.6816 2.96074 36.4578 3.11838 36.1758L11.5974 21.1335C11.7563 20.8538 11.8825 20.521 11.9686 20.1544C12.0547 19.7878 12.099 19.3946 12.099 18.9974C12.099 18.6003 12.0547 18.2071 11.9686 17.8404C11.8825 17.4738 11.7563 17.1411 11.5974 16.8614Z" fill="black" />
                            </svg>
                        </article>

                        <article className='grid grid-cols-3 gap-[2.5vw]'>
                            {
                                product.images.map((image, index) => (
                                    <Image onClick={() => setActiveImageIndex(index)} key={index} src={image} alt={product.title} width={1000} height={0} className={`w-[80%] rounded-[10px] object-cover aspect-[2/3] cursor-pointer place-self-center ${index === activeImageIndex && "border-brown border-2"}`} />
                                ))
                            }
                        </article>
                    </section>

                    <section className='flex flex-col items-start gap-[2vw]'>
                        <h1 className='font-iowan font-bold text-[4.58vw] drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]'>{product.title}</h1>
                        <p className='font-inter text-[1.53vw] max-w-[35ch]'>{product.description}</p>
                        <Link href="" className='bg-brown text-white rounded-lg py-1.75 px-8.5'>Направи заявка</Link>
                    </section>
                </section>

                <section className="flex items-center gap-[4.44vw] flex-col bg-light pt-20 w-full relative z-10">
                    <h1 className="italic font-iowan font-semibold text-[4.86vw] text-brown drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]">Подобни статуетки:</h1>

                    <HomeProducts products={relatedProducts} />
                </section>
            </main>
        </>
    )
}