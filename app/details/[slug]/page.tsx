// client/app/details/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchStatueBySlug, fetchStatues } from "@/lib/strapi";

export async function generateStaticParams() {
  const statues = await fetchStatues();
  return statues.slice(0, 20).map((s) => ({ slug: s.slug! }));
}

export const revalidate = 60;

export default async function DetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await fetchStatueBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <main>
        <section className="grid grid-cols-2 w-4/5 justify-center gap-[5vw] pt-[8.5vw] pb-[5.83vw] relative mx-auto max-xs:grid-cols-1 max-xs:w-full max-xs:pt-0 max-xs:pb-[30vw] max-xs:gap-[7vw]">
          <Image src="/request-success-statue.png" alt="details background image" width={1000} height={0} className="w-[30%] absolute bottom-[-5.83vw] right-[-6vw] opacity-50 rotate-y-180 max-xs:right-1/2 max-xs:translate-x-1/2 max-xs:translate-y-1/2 max-xs:0 max-xs:w-2/3" />

          {/* Изображение + миниатюри */}
          <section className="flex flex-col items-center gap-[1.7vw]">
            <article className="flex items-center justify-between w-[90%] max-xs:w-full">
              <div className="flex items-center justify-center w-full relative">
                <Image
                  src={product.images?.[0] || product.coverImage || "/product-image-placeholder.png"}
                  alt={product.title || "Статуетка"}
                  width={1000}
                  height={0}
                  className="w-[70%] rounded-[10px] object-cover aspect-[2/3] max-xs:w-full max-xs:aspect-[4/5] max-xs:max-h-[120vw] max-xs:rounded-[0]"
                />
              </div>
            </article>

            {product.images && product.images.length > 1 && (
              <article className="grid grid-cols-3 gap-[2.5vw] max-xs:hidden">
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${product.title || "Статуетка"} ${index + 1}`}
                    width={1000}
                    height={0}
                    className="w-[80%] rounded-[10px] object-cover aspect-[2/3] place-self-center"
                  />
                ))}
              </article>
            )}
          </section>

          {/* Текстова част */}
          <section className="flex flex-col items-start gap-[2vw] max-xs:items-center max-xs:gap-[6vw]">
            <h1 className="font-iowan font-bold text-[4.58vw] drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)] max-xs:text-[7vw]/[7vw]">
              {product.title}
            </h1>
            <p
              className="font-inter text-[1.53vw] max-w-[35ch] max-xs:max-w-7/9 max-xs:text-[3vw]/[4vw] max-xs:text-center"
              dangerouslySetInnerHTML={{ __html: product.description || "" }}
            />
            <Link
              href={{ pathname: "/requests", query: { item: product.title } }}
              className="bg-brown text-white rounded-lg py-[0.8vw] px-[4vw] text-[1.3vw] max-xs:text-[2.6vw] max-xs:w-8/9 max-xs:text-center max-xs:py-[2vw] z-10"
            >
              Направи заявка
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}
