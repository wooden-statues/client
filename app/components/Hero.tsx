import Image from "next/image";

const Hero = () => {
    return (
        <section className="flex justify-center items-center relative h-[calc(100vw*0.336)]">
            <Image src="/hero.png" alt="hero section image" width={1460} height={0} className="w-full absolute top-0" />

            <article className="text-light relative z-10">
                <h1 className="font-italianno text-[11.11vw]/[11.11vw] text-center">Wooden Statues</h1>
                <p className="font-iowan italic text-[2.78vw] text-center">Изработено със стил!</p>
            </article>
        </section>
    );
}

export default Hero;