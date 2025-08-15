import Image from "next/image";

const SecondaryHomeSection = ({
  isReversed,
  coverImage,
  title,
  description,
}: { isReversed: boolean; coverImage: string; title: string; description: string }) => {
  return (
    <section className={`flex items-center w-5/6 py-12 gap-[6.67vw] ${isReversed ? "flex-row-reverse" : ""} max-xs:flex-col`}>
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden animate-fade-up">
        <Image
          src={coverImage}
          alt={isReversed ? "manufacturing image" : "artist image"}
          fill
          sizes="(max-width: 38rem) 90vw, 50vw"
          className="object-cover"
        />
      </div>

      <article className="flex flex-col gap-7 text-[#0C1203] max-xs:order-1 text-center animate-fade-up">
        <h3 className="font-iowan font-bold italic text-[4.5vw] max-xs:text-[7vw]">{title}</h3>
        <p className="font-inter text-[2.36vw] leading-relaxed max-xs:text-[4vw]">{description}</p>
      </article>
    </section>
  );
};

export default SecondaryHomeSection;
