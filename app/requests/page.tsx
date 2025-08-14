"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Requests() {
    const router = useRouter();

    function onSubmit(e: any) {
        e.preventDefault();
        router.push("/request-success");
    }

    return (
        <>
            <main className="grid grid-cols-2 bg-light relative h-[calc(50vw*0.9)] max-xs:h-[calc(50vw*2.1)] max-xs:grid-cols-1">
                <Image src={"/request.png"} alt="make a request section image" width={716} height={0} className="w-1/2 translate-y-[-8%] absolute z-1 max-xs:hidden" />
                <Image src={"/gallery-background.png"} alt="make a request section image no-background" width={716} height={0} className="w-1/2 absolute z-1 hidden bottom-0 left-1/2 -translate-x-1/2 opacity-30 max-xs:block" />

                <section className="flex flex-col gap-[3.06vw] px-[8.33vw] py-[5vw] col-start-2 max-s:py-[3vw] max-s:gap-[2vw] max-xs:col-start-1 max-xs:py-[10vw] max-xs:px-[4vw] max-xs:gap-[4vw]">
                    <h1 className="font-iowan font-semibold text-[3.75vw] text-brown drop-shadow-[0_18px_8px_rgba(0,0,0,0.25)] max-xs:text-[8vw] max-xs:text-center max-xs:z-10">Направи заявка</h1>
                    <form onSubmit={onSubmit} className="flex flex-col items-start gap-[3.06vw] max-xs:gap-[5vw]">
                        <input className="w-full bg-[#B2886B] text-white font-inter text-[1.2vw] drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)] rounded-lg placeholder:text-[#F4ECE299] py-[1vw] pl-[1.2vw] focus:ring-0 focus:outline-amber-900 max-xs:text-[3vw] max-xs:py-[2.5vw] max-xs:pl-[4vw]" type="text" name="statue_name" placeholder="Име на статуетка" required />
                        <input className="w-full bg-[#B2886B] text-white font-inter text-[1.2vw] drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)] rounded-lg placeholder:text-[#F4ECE299] py-[1vw] pl-[1.2vw] focus:ring-0 focus:outline-amber-900 max-xs:text-[3vw] max-xs:py-[2.5vw] max-xs:pl-[4vw]" type="text" name="phone" placeholder="Телефонен номер" required />
                        <textarea className="w-full bg-[#B2886B] text-white font-inter text-[1.2vw] drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)] rounded-lg placeholder:text-[#F4ECE299] py-[1vw] pl-[1.2vw] focus:ring-0 focus:outline-amber-900 resize-none max-xs:text-[3vw] max-xs:py-[2.5vw] max-xs:pl-[4vw]" rows={3} name="order_details" placeholder="Детайли към поръчка" required></textarea>
                        <input className="bg-brown text-white text-[1.25vw] rounded-lg py-[1vw] px-9 cursor-pointer max-xs:text-[3.2vw] max-xs:self-stretch max-xs:py-[2vw] z-20" type="submit" value="Изпрати" />
                    </form>
                </section>
            </main>
        </>
    );
}