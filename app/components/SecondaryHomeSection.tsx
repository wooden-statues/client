import Image from "next/image";

const SecondaryHomeSection = ({ isReversed, imageUrl, title, description }: { isReversed: boolean, imageUrl: string, title: string, description: string }) => {
    return (
        <section className={`flex items-center w-5/6 py-12 gap-[6.67vw] ${isReversed && "flex-row-reverse"}`}>
            <Image src={imageUrl} alt={isReversed ? "manufacturing image" : "artist image"} width={341} height={0} className="w-[100%]" />

            <article className="flex flex-col gap-7 text-[#0C1203]">
                <h3 className="font-iowan font-bold italic text-[4.5vw]">{title}</h3>
                <p className="font-inter text-[2.36vw]">{description}</p>
            </article>
        </section>
    );
}

export default SecondaryHomeSection;