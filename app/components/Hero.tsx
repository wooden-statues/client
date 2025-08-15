import Image from "next/image";

const Hero = () => {
    return (
        <section className="flex justify-center items-center relative h-[calc(100vw*0.336)] w-full overflow-hidden max-xs:h-fit max-xs:py-[15vw]">
            <Image src="/hero.png" alt="hero section image" width={1460} height={0} priority className="w-full absolute bottom-0 max-xs:min-w-[200vw] object-cover" />

            <article className="text-light relative z-10">
                <h1 className="font-italianno text-[11.11vw]/[11.11vw] text-center max-xs:text-[18vw]/[15vw] max-xs:max-w-[5ch]">Wooden Statues</h1>
                <p className="font-iowan italic text-[2.78vw] text-center max-xs:hidden">Изработено със стил!</p>
            </article>
        </section>
    );
}

export default Hero;