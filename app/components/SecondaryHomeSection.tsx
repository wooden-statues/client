import Image from "next/image";

const SecondaryHomeSection = ({ isReversed, coverImage, title, description }: { isReversed: boolean, coverImage: string, title: string, description: string }) => {
    return (
        <section className={`flex items-center w-5/6 py-12 gap-[6.67vw] ${isReversed ? "flex-row-reverse" : ""} max-xs:flex-col`}>
            <Image src={coverImage} alt={isReversed ? "manufacturing image" : "artist image"} width={800} height={600} className="w-[100%] rounded-2xl max-xs:order-2 object-cover" />

            <article className="flex flex-col gap-7 text-[#0C1203] max-xs:order-1 text-center">
                <h3 className="font-iowan font-bold italic text-[4.5vw] max-xs:text-[7vw]">{title}</h3>
                <p className="font-inter text-[2.36vw] max-xs:text-[4vw]">{description}</p>
            </article>
        </section>
    );
}

export default SecondaryHomeSection;
