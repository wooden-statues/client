import HomeProducts from "./HomeProducts";
import SecondaryHomeSection from "./SecondaryHomeSection";
import { fetchRandomStatues } from "@/lib/strapi";

const Manufacturing = async () => {
  const images = await fetchRandomStatues(3);

  return (
    <section className="flex flex-col items-center">
      <SecondaryHomeSection
        coverImage="/artist-image-placeholder.png"
        title="За изработката"
        description="Георги Георгиев е талантлив майстор, който се занимава с ръчна изработка на уникални дървени статуетки."
        isReversed={true}
      />

      <article className="flex items-center gap-16 flex-col bg-light pt-20 pb-6 w-full">
        <HomeProducts products={images} />
      </article>
    </section>
  );
};

export default Manufacturing;
