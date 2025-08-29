"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState, Suspense } from "react";

function RequestsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [initialStatue, setInitialStatue] = useState("");
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      statue_name: String(formData.get("statue_name") || ""),
      phone: String(formData.get("phone") || ""),
      order_details: String(formData.get("order_details") || ""),
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json: unknown = await res.json();
      const ok =
        typeof (json as { ok?: boolean }).ok === "boolean"
          ? (json as { ok?: boolean }).ok
          : false;
      const errText =
        typeof (json as { error?: string }).error === "string"
          ? (json as { error?: string }).error
          : "Неуспешно изпращане.";

      if (!res.ok || !ok) {
        throw new Error(errText);
      }

      router.push("/request-success");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Възникна грешка при изпращането. Опитайте отново.";
      setErrorMsg(msg);
      setSending(false);
    }
  }

  useEffect(() => {
    const qpItem = searchParams.get("item");
    if (qpItem) {
      setInitialStatue(qpItem);
      return;
    }
    const item = typeof window !== "undefined" ? localStorage.getItem("item") : null;
    if (item) {
      setInitialStatue(item);
      localStorage.removeItem("item");
    }
  }, [searchParams]);

  return (
    <>
      <main className="grid grid-cols-2 bg-light relative h-[calc(50vw*0.9)] max-xs:h-[calc(50vw*2.1)] max-xs:grid-cols-1">
        <Image
          src={"/request.png"}
          alt="make a request section image"
          width={716}
          height={716}
          className="w-1/2 translate-y-[-8%] absolute z-1 max-xs:hidden"
        />
        <Image
          src={"/gallery-background.png"}
          alt="make a request section image no-background"
          width={716}
          height={716}
          className="w-1/2 absolute z-1 hidden bottom-0 left-1/2 -translate-x-1/2 opacity-30 max-xs:block"
        />

        <section className="flex flex-col gap-[3.06vw] px-[8.33vw] py-[5vw] col-start-2 max-s:py-[3vw] max-s:gap-[2vw] max-xs:col-start-1 max-xs:py-[10vw] max-xs:px-[4vw] max-xs:gap-[4vw]">
          <h1 className="font-iowan font-semibold text-[3.75vw] text-brown drop-shadow-[0_18px_8px_rgba(0,0,0,0.25)] max-xs:text-[8vw] max-xs:text-center max-xs:z-10">
            Направи заявка
          </h1>
          <form onSubmit={onSubmit} className="flex flex-col items-start gap-[3.06vw] max-xs:gap-[5vw]" aria-busy={sending} aria-describedby="request-status">
            <label htmlFor="statue_name" className="sr-only">Име на статуетка</label>
            <input
              className="w-full bg-[#B2886B] text-white font-inter text-[1.2vw] drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)] rounded-lg placeholder:text-[#F4ECE299] py-[1vw] pl-[1.2vw] focus:ring-0 focus:outline-amber-900 max-xs:text-[3vw] max-xs:py-[2.5vw] max-xs:pl-[4vw]"
              type="text"
              name="statue_name"
              id="statue_name"
              placeholder="Име на статуетка"
              required
              defaultValue={initialStatue}
              autoComplete="off"
            />

            <label htmlFor="phone" className="sr-only">Телефонен номер</label>
            <input
              className="w-full bg-[#B2886B] text-white font-inter text-[1.2vw] drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)] rounded-lg placeholder:text-[#F4ECE299] py-[1vw] pl-[1.2vw] focus:ring-0 focus:outline-amber-900 max-xs:text-[3vw] max-xs:py-[2.5vw] max-xs:pl-[4vw]"
              type="tel"
              name="phone"
              id="phone"
              placeholder="Телефонен номер"
              required
              inputMode="tel"
              autoComplete="tel"
            />


            <label htmlFor="order_details" className="sr-only">Детайли към поръчка</label>
            <textarea
              className="w-full bg-[#B2886B] text-white font-inter text-[1.2vw] drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)] rounded-lg placeholder:text-[#F4ECE299] py-[1vw] pl-[1.2vw] focus:ring-0 focus:outline-amber-900 resize-none max-xs:text-[3vw] max-xs:py-[2.5vw] max-xs:pl-[4vw]"
              rows={3}
              name="order_details"
              id="order_details"
              placeholder="Детайли към поръчка"
              required
            ></textarea>

            <input
              className="bg-brown text-white text-[1.25vw] rounded-lg py-[1vw] px-9 cursor-pointer max-xs:text-[3.2vw] max-xs:self-stretch max-xs:py-[2vw] z-20 disabled:opacity-60 disabled:cursor-not-allowed transition active:translate-y-[1px]"
              type="submit"
              value={sending ? "Изпращане..." : "Изпрати"}
              disabled={sending}
            />

            <div id="request-status" aria-live="polite" className="min-h-[1.5rem]">
              {errorMsg && <p className="text-red-800 text-sm pt-1">{errorMsg}</p>}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default function Requests() {
  return (
    <Suspense fallback={null}>
      <RequestsContent />
    </Suspense>
  );
}
