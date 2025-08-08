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
            <main className="grid grid-cols-2 bg-light relative h-[calc(50vw*0.9)]">
                <Image src={"/request.png"} alt="make a request section image" width={716} height={0} className="w-1/2 translate-y-[-8%] absolute z-1" />

                <section className="flex flex-col gap-[3.06vw] px-[8.33vw] py-[5vw] col-start-2">
                    <h1 className="font-iowan font-bold text-[3.75vw] text-brown drop-shadow-[0_18px_8px_rgba(0,0,0,0.25)]">Направи заявка</h1>
                    <form onSubmit={onSubmit} className="flex flex-col items-start gap-[3.06vw]">
                        <input className="w-full bg-[#B2886B] text-white font-inter  drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)] rounded-lg placeholder:text-[#F4ECE299] py-3 pl-4 focus:ring-0 focus:outline-amber-900" type="text" name="statue_name" placeholder="Име на статуетка" required />
                        <input className="w-full bg-[#B2886B] text-white font-inter  drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)] rounded-lg placeholder:text-[#F4ECE299] py-3 pl-4 focus:ring-0 focus:outline-amber-900" type="text" name="phone" placeholder="Телефонен номер" required />
                        <textarea className="w-full bg-[#B2886B] text-white font-inter  drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)] rounded-lg placeholder:text-[#F4ECE299] py-3 pl-4 focus:ring-0 focus:outline-amber-900 resize-none" name="order_details" placeholder="Детайли към поръчка" required></textarea>
                        <input className="bg-brown text-white text-[1.25vw] rounded-lg py-3.5 px-9 cursor-pointer" type="submit" value="Изпрати" />
                    </form>
                </section>
            </main>
        </>
    );
}