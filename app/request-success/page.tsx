import Image from "next/image";

export default function RequestSuccess() {
    return (
        <>
            <main className="flex flex-col items-center gap-[16vw] pt-[8.5vw] pb-[5.83vw] bg-light relative max-xs:pb-[10vw]">
                <Image src={"/request-success-statue.png"} alt="statue" width={400} height={0} className="w-[18%] absolute top-[9%] left-[3%] z-1 max-xs:bottom-1/25 max-xs:top-auto" />
                <Image src={"/request-success-statue.png"} alt="statue" width={400} height={0} className="w-[18%] absolute top-[9%] right-[3%] rotate-y-180 z-1 max-xs:bottom-1/25 max-xs:top-auto" />
                <div className="absolute inset-0 bg-white clip-triangle z-0 select-none" />

                <section className="flex flex-col items-center gap-[2vw]">
                    <h1 className="font-iowan text-brown font-bold text-[5.56vw] italic drop-shadow-[0_18px_8px_rgba(0,0,0,0.25)] max-xs:text-[7vw]">Успешно подаване!</h1>
                    <h2 className="font-iowan text-brown font-bold text-[3.19vw] italic drop-shadow-[0_18px_8px_rgba(0,0,0,0.25)] max-xs:text-[4.5vw]">БЛАГОДАРЯ!</h2>
                </section>

                <p className="font-iowan text-brown font-bold text-[3.19vw] max-w-2/5 text-center max-xs:max-w-1/3 max-xs:text-[4vw]">Очаквайте потвърждение на поръчката до 2 работни дни!</p>
            </main>
        </>
    );
}