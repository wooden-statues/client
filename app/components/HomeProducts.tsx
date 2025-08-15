import { Product } from "@/types/product";
import Image from "next/image";

const HomeProducts = ({ products }: { products: Array<Product> }) => {
    return (
        <section className="flex justify-between w-11/12 pb-10 max-xs:flex-col max-xs:gap-14">
            {
                products.map((product: Product, index: number) => (
                    <article className="flex flex-col items-center w-full" key={index}>
                        <Image src={product.coverImage} alt={product.title || "image of product or manufacturing way"} width={600} height={600} className="w-[100%] object-cover" />
                        {product.title && <p className="font-inter font-medium text-[1.67vw] max-xs:text-[3vw]">{product.title}</p>}
                    </article>
                ))
            }
        </section>
    );
}

export default HomeProducts;
