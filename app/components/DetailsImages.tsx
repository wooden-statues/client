"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const DetailsImages = ({ images, title, coverImage }: { images: string[], title: string, coverImage: string }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const imageRef = useRef<HTMLImageElement | null>(null);

    // Build the gallery: ensure cover image is first (if present), then other images
    const galleryImages = useMemo(() => {
        const base = Array.isArray(images) ? images : [];
        const isPlaceholder = coverImage === "/product-image-placeholder.png";
        const validCover = coverImage && coverImage.trim() !== "" && !isPlaceholder ? coverImage : "";
        if (!validCover) return base;
        // If cover already present in images, move it to the front; else prepend
        const withoutCover = base.filter((img) => img !== validCover);
        return [validCover, ...withoutCover];
    }, [images, coverImage]);

    // Keep index in bounds if images change
    useEffect(() => {
        if (activeImageIndex >= galleryImages.length) {
            setActiveImageIndex(0);
        }
    }, [galleryImages.length, activeImageIndex]);

    //

    let touchstartX = 0;
    let touchendX = 0;

    function upIndex() {
        setActiveImageIndex(prev => prev < galleryImages.length - 1 ? prev + 1 : 0);
    }

    function downIndex() {
        setActiveImageIndex(prev => prev > 0 ? prev - 1 : galleryImages.length - 1);
    }

    function checkDirection() {
        if (touchendX < touchstartX) {
            upIndex();
        }
        else {
            downIndex();
        }
    }

    useEffect(() => {
        const img = imageRef.current;
        if (!img) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchstartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            touchendX = e.changedTouches[0].screenX;
            checkDirection();
        };

        img.addEventListener('touchstart', handleTouchStart);
        img.addEventListener('touchend', handleTouchEnd);

        return () => {
            img.removeEventListener('touchstart', handleTouchStart);
            img.removeEventListener('touchend', handleTouchEnd);
        };
    }, [imageRef.current]);

    const showArrows = galleryImages.length > 1;

    return (
        <section className="flex flex-col items-center gap-[1.7vw]">
            <article className="flex items-center justify-between w-[90%] max-xs:w-full">
                {showArrows && (
                    <svg onClick={downIndex} className='h-[2.64vw] cursor-pointer select-none max-xs:hidden' viewBox="0 0 13 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.820112 16.8614L9.2991 1.81903C9.45721 1.53853 9.64492 1.31602 9.8515 1.16421C10.0581 1.0124 10.2795 0.934265 10.5031 0.934265C10.9547 0.934265 11.3878 1.25253 11.7071 1.81903C11.8652 2.09954 11.9907 2.43255 12.0762 2.79905C12.1618 3.16555 12.2058 3.55836 12.2058 3.95505C12.2058 4.75621 12.0265 5.52456 11.7071 6.09107L4.4152 18.9974L11.7071 31.9038C11.8661 32.1835 11.9922 32.5162 12.0783 32.8828C12.1644 33.2494 12.2087 33.6427 12.2087 34.0398C12.2087 34.437 12.1644 34.8302 12.0783 35.1968C11.9922 35.5634 11.8661 35.8962 11.7071 36.1758C11.5495 36.4578 11.3619 36.6816 11.1553 36.8344C10.9486 36.9871 10.727 37.0657 10.5031 37.0657C10.2792 37.0657 10.0576 36.9871 9.85095 36.8344C9.6443 36.6816 9.45674 36.4578 9.2991 36.1758L0.820112 21.1335C0.661168 20.8538 0.535008 20.521 0.448915 20.1544C0.362822 19.7878 0.318497 19.3946 0.318497 18.9974C0.318497 18.6003 0.362822 18.2071 0.448915 17.8404C0.535008 17.4738 0.661168 17.1411 0.820112 16.8614Z" fill="black" />
                    </svg>
                )}

                <div className="flex items-center justify-center w-full relative">
                    <div className="relative w-[70%] aspect-[2/3] rounded-[10px] overflow-hidden max-xs:w-full max-xs:aspect-[4/5] max-xs:max-h-[120vw] max-xs:rounded-[0]">
                        <Image
                            src={galleryImages?.[activeImageIndex] || "/product-image-placeholder.png"}
                            alt={title || "Статуетка"}
                            fill
                            sizes="(max-width: 38rem) 100vw, 35vw"
                            className="object-cover"
                            priority
                            ref={imageRef}
                        />
                    </div>

                    <p className='hidden absolute bg-[#656565B2] font-inter rounded-full text-white text-[2vw] font-light py-[0.5vw] px-[2vw] bottom-[3.5vw] right-[2vw] max-xs:block'>{activeImageIndex + 1}/{galleryImages.length}</p>
                </div>

                {showArrows && (
                    <svg onClick={upIndex} className='h-[2.64vw] cursor-pointer select-none max-xs:hidden' viewBox="0 0 13 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5974 16.8614L3.11838 1.81903C2.96027 1.53853 2.77256 1.31602 2.56598 1.16421C2.35939 1.0124 2.13798 0.934265 1.91437 0.934265C1.46278 0.934265 1.02968 1.25253 0.710353 1.81903C0.55224 2.09954 0.426817 2.43255 0.341246 2.79905C0.255676 3.16555 0.211635 3.55836 0.211635 3.95505C0.211635 4.75621 0.391029 5.52456 0.710353 6.09107L8.00228 18.9974L0.710353 31.9038C0.551409 32.1835 0.425251 32.5162 0.339158 32.8828C0.253065 33.2494 0.20874 33.6427 0.20874 34.0398C0.20874 34.437 0.253065 34.8302 0.339158 35.1968C0.425251 35.5634 0.551409 35.8962 0.710353 36.1758C0.868 36.4578 1.05556 36.6816 1.2622 36.8344C1.46885 36.9871 1.6905 37.0657 1.91437 37.0657C2.13824 37.0657 2.35988 36.9871 2.56653 36.8344C2.77318 36.6816 2.96074 36.4578 3.11838 36.1758L11.5974 21.1335C11.7563 20.8538 11.8825 20.521 11.9686 20.1544C12.0547 19.7878 12.099 19.3946 12.099 18.9974C12.099 18.6003 12.0547 18.2071 11.9686 17.8404C11.8825 17.4738 11.7563 17.1411 11.5974 16.8614Z" fill="black" />
                    </svg>
                )}
            </article>

            {galleryImages && galleryImages.length > 1 && (
                <article className="grid grid-flow-col auto-cols-fr gap-[2.5vw] w-[80%] max-xs:hidden overflow-x-auto">
                    {galleryImages.map((image, index) => (
                        <div key={index} className={`relative w-[80%] aspect-[2/3] rounded-[10px] cursor-pointer place-self-center  ${index === activeImageIndex && "border-brown border-2"}`}>
                            <Image
                                src={image}
                                alt={`${title || "Статуетка"} ${index + 1}`}
                                fill
                                sizes="15vw"
                                className="object-cover rounded-[10px]"
                                onClick={() => setActiveImageIndex(index)}
                            />
                        </div>
                    ))}
                </article>
            )}
        </section>
    );
}

export default DetailsImages;
