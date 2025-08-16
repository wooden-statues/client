import { Product } from "@/types/product";
import Image from "next/image";

const sizes = "(max-width: 38rem) 90vw, (max-width: 56rem) 45vw, 30vw";

const HomeProducts = ({ products }: { products: Array<Product> }) => {
  return (
    <section className="grid grid-cols-3 gap-[2.5vw] w-11/12 pb-10 max-xs:grid-cols-1 max-xs:gap-14">
      {products.map((product: Product, index: number) => (
        <article
          className="group relative flex flex-col items-center w-full animate-fade-up"
          key={product.slug ?? index}
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[20px] shadow-[0_5px_7px_rgba(0,0,0,0.25)] bg-[#EEE2D7]">
            <Image
              src={product.coverImage || "/product-image-placeholder.png"}
              alt={product.title || "Изображение на продукт"}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          </div>
          {product.title && (
            <p className="mt-3 font-inter font-medium text-[1.35vw] text-[#0C1203] max-xs:text-[3vw]">
              {product.title}
            </p>
          )}
        </article>
      ))}
    </section>
  );
};

export default HomeProducts;
