import HomeProducts from "./HomeProducts";
import SecondaryHomeSection from "./SecondaryHomeSection";
import { fetchRandomStatues } from "@/lib/strapi";

const Artist = async () => {
  const products = await fetchRandomStatues(3);

  return (
    <section className="flex flex-col items-center">
      <SecondaryHomeSection
        coverImage="/ivan.jpg"
        title="За артиста"
        description="Аз съм Иван Георгиев Петков и изработвам уникални дървени статуетки с височина от 20 до 80 сантиметра, подходящи както за стилно интериорно допълнение, така и за изискан подарък."
        isReversed={false}
      />

      <article className="flex items-center gap-16 flex-col bg-light pt-20 pb-6 w-full">
        <HomeProducts products={products} />
      </article>
    </section>
  );
};

export default Artist;
