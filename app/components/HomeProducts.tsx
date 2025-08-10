import { Product } from "@/types/product";
import Image from "next/image";

const HomeProducts = ({ products }: { products: Array<Product> }) => {
    return (
        <section className="flex justify-between w-11/12">
            {
                products.map((product: Product, index: number) => (
                    <article className="flex flex-col items-center g-2 w-full" key={index}>
                        <Image src={product.coverImage} alt={product.title || "image of product or manufacturing way"} width={411} height={0} className="w-[100%]" />
                        {product.title && <p className="font-inter font-medium text-[1.67vw] pb-10">{product.title}</p>}
                    </article>
                ))
            }
        </section>
    );
}

export default HomeProducts;