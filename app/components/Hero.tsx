import Image from "next/image";

const Hero = () => {
    return (
        <section className="flex justify-center items-center relative h-[calc(100vw*0.34)]">
            <Image src="/hero.png" alt="hero section image" width={1460} height={0} className="w-full absolute top-0" />

            <article className="text-light relative z-10">
                <h1 className="font-italianno text-[10rem]/[10rem] text-center">Wooden Statues</h1>
                <p className="font-iowan italic text-[2.5em] text-center">Изработено със стил!</p>
            </article>
        </section>
    );
}

export default Hero;