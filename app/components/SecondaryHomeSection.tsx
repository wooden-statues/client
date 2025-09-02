import Image from "next/image";

const SecondaryHomeSection = ({
  isReversed,
  coverImage,
  secondaryCoverImage,
  title,
  description,
  description2,
}: {
  isReversed: boolean;
  coverImage: string;
  secondaryCoverImage?: string;
  title: string;
  description: string;
  description2?: string;
}) => {
  const hasSecondary = Boolean(secondaryCoverImage);

  if (hasSecondary) {
    return (
      <section className="w-5/6 py-12 flex flex-col gap-16">
        {/* Row 1: text left, image right */}
        <div className="flex items-center gap-[6.67vw] max-xs:flex-col">
          <article className="flex-1 flex flex-col gap-7 text-[#0C1203] text-left max-xs:text-center animate-fade-up">
            <h3 className="font-iowan font-bold italic text-[4.5vw] max-xs:text-[7vw]">{title}</h3>
            <p className="font-inter text-[2.36vw] leading-relaxed max-xs:text-[4vw]">{description}</p>
          </article>
          <div className="relative flex-1 aspect-[4/3] rounded-2xl overflow-hidden animate-fade-up">
            <Image
              src={coverImage}
              alt="manufacturing image 1"
              fill
              sizes="(max-width: 38rem) 90vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Row 2: image left, text right */}
        <div className="flex items-center gap-[6.67vw] max-xs:flex-col">
          <div className="relative flex-1 aspect-[4/3] rounded-2xl overflow-hidden animate-fade-up">
            <Image
              src={secondaryCoverImage as string}
              alt="manufacturing image 2"
              fill
              sizes="(max-width: 38rem) 90vw, 50vw"
              className="object-cover"
            />
          </div>
          <article className="flex-1 flex flex-col gap-7 text-[#0C1203] text-left max-xs:text-center animate-fade-up">
            {description2 ? (
              <p className="font-inter text-[2.36vw] leading-relaxed max-xs:text-[4vw]">{description2}</p>
            ) : (
              <p className="font-inter text-[2.36vw] leading-relaxed max-xs:text-[4vw]">{description}</p>
            )}
          </article>
        </div>
      </section>
    );
  }

  // Single-image layout (e.g., Artist): vertical photo, top-aligned crop
  return (
    <section className={`flex items-center w-5/6 py-12 gap-[6.67vw] ${isReversed ? "flex-row-reverse" : ""} max-xs:flex-col`}>
      <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden animate-fade-up">
        <Image
          src={coverImage}
          alt={isReversed ? "manufacturing image" : "artist image"}
          fill
          sizes="(max-width: 38rem) 90vw, 50vw"
          className="object-cover object-top"
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
