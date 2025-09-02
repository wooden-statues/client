// client/app/gallery/page.tsx
import Image from "next/image";
import Link from "next/link";
import { fetchStatues } from "@/lib/strapi";

export const revalidate = 60;

export default async function GalleryPage() {
  const statues = await fetchStatues();

  return (
    <>
      <main className="flex flex-col items-center gap-[5vw] pt-[8.5vw] pb-[5.83vw] relative">
        <h1 className="text-[6.94vw] font-iowan text-[#0C1203] drop-shadow-[0_15px_6px_rgba(0,0,0,0.25)] max-xs:text-[9vw] max-xs:py-[4vw]">
          Статуетки
        </h1>

        <Image
          src="/gallery-background.png"
          alt="gallery background image"
          width={1000}
          height={1000}
          className="w-[50%] absolute top-[-2%] opacity-10 -z-10 left-[2%] max-xs:hidden"
        />
        <Image
          src="/gallery-background.png"
          alt="gallery background image mirrored"
          width={1000}
          height={1000}
          className="w-[50%] absolute top-[-2%] opacity-10 -z-10 right-[2%] scale-x-[-1] max-xs:hidden"
        />
        <Image
          src="/request-success-statue.png"
          alt="gallery background image phone version"
          width={1000}
          height={1000}
          className="w-[12%] absolute top-[2vw] opacity-100 -z-10 left-[15%] hidden max-xs:block"
        />
        <Image
          src="/request-success-statue.png"
          alt="gallery background image phone version mirrored"
          width={1000}
          height={1000}
          className="w-[12%] absolute top-[2vw] opacity-100 -z-10 right-[15%] scale-x-[-1] hidden max-xs:block"
        />

        <section className="grid grid-cols-3 justify-between w-[70%] gap-[4.5vw] max-xs:grid-cols-1 max-xs:w-full max-xs:gap-[9vw]">
          {statues.map((p) => (
            <Link
              key={p.slug}
              href={`/details/${p.slug}`}
              className="flex flex-col items-center bg-light p-[1.39vw] rounded-[20px] drop-shadow-[0_5px_7px_rgba(0,0,0,0.25)] cursor-pointer max-xs:bg-transparent max-xs:gap-[3vw] group animate-fade-up"
            >
              <div className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden">
                <Image
                  src={p.coverImage || "/product-image-placeholder.png"}
                  alt={p.title ?? "Статуетка"}
                  fill
                  sizes="(max-width: 38rem) 90vw, (max-width: 56rem) 45vw, 22vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </div>
              <p
                className="font-inter font-semibold text-[#0C1203] text-[clamp(1rem,4.8vw,1.25rem)] leading-snug tracking-tight text-center line-clamp-2 max-xs:px-1"
                aria-label={p.title}
                title={p.title}
              >
                {p.title}
              </p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
