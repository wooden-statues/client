import HomeProducts from "./HomeProducts";
import SecondaryHomeSection from "./SecondaryHomeSection";
import { fetchRandomStatues } from "@/lib/strapi";

const Manufacturing = async () => {
  const images = await fetchRandomStatues(3);

  return (
    <section className="flex flex-col items-center">
      <SecondaryHomeSection
        coverImage="/izrabotka1.jpg"
        secondaryCoverImage="/izrabotka2.jpg"
        title="За изработката"
        description="Всяка статуетка е ръчна изработка, създадена с внимание към детайла и любов към дървото. Работя основно с орех, който придава топлина, здравина и изящна текстура на всяко изделие."
        description2="Моите статуи са издялани и изшлайфани от цяло парче дърво, обработени с масло и лак, за да се подчертае естествената красота на материала и да се осигури дълготрайност. Всяко произведение е уникално и неповторимо, защото всяко парче дърво носи своя собствена история. Така моето изкуство съчетава традиция и елегантност, за да внесе природна красота във всеки дом или специален повод."
        isReversed={true}
      />

      <article className="flex items-center gap-16 flex-col bg-light pt-20 pb-6 w-full">
        <HomeProducts products={images} />
      </article>
    </section>
  );
};

export default Manufacturing;
