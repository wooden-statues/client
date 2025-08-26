// client/app/details/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchRandomStatues, fetchStatueBySlug, fetchStatues } from "@/lib/strapi";
import HomeProducts from "@/components/HomeProducts";
import DetailsImages from "@/components/DetailsImages";

export async function generateStaticParams() {
  const statues = await fetchStatues();
  return statues.slice(0, 20).map((s) => ({ slug: s.slug! }));
}

export const revalidate = 60;

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchStatueBySlug(slug);
  const relatedProducts = await fetchRandomStatues(3);

  if (!product) notFound();

  return (
    <>
      <main>
        <section className="grid grid-cols-2 w-4/5 justify-center gap-[5vw] pt-[8.5vw] pb-[5.83vw] relative mx-auto max-xs:grid-cols-1 max-xs:w-full max-xs:pt-0 max-xs:pb-[30vw] max-xs:gap-[7vw]">
          <Image
            src="/request-success-statue.png"
            alt="details background image"
            width={1000}
            height={1000}
            className="w-[30%] absolute bottom-[-5.83vw] right-[-6vw] opacity-50 scale-x-[-1] max-xs:right-1/2 max-xs:translate-x-1/2 max-xs:translate-y-1/2 max-xs:w-2/3"
          />

          {/* Изображение + миниатюри */}
          <DetailsImages images={product.images || []} title={product.title || ""} coverImage={product.coverImage} />

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
              className="bg-brown text-white rounded-lg py-[0.8vw] px-[4vw] text-[1.3vw] max-xs:text-[2.6vw] max-xs:w-8/9 max-xs:text-center max-xs:py-[2vw] z-10 transition active:translate-y-[1px]"
            >
              Направи заявка
            </Link>
          </section>
        </section>

        <section className="flex items-center gap-[4.44vw] flex-col bg-light pt-20 w-full relative z-10 max-xs:hidden">
          <h1 className="italic font-iowan font-semibold text-[4.86vw] text-brown drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]">Подобни статуетки:</h1>

          <HomeProducts products={relatedProducts} />
        </section>
      </main>
    </>
  );
}
