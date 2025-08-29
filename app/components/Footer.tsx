"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const Footer = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
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

      setStatus("success");
      form.reset();
    } catch (err: unknown) {
      setStatus("error");
      const msg =
        err instanceof Error ? err.message : "Възникна грешка при изпращането.";
      setErrorMsg(msg);
    }
  }

  const isLoading = status === "loading";

  return (
    <footer className="bg-dark-green px-[18%] py-[9.72vw] flex flex-col gap-10 relative z-10 max-xs:px-[10vw] max-xs:gap-6">
      <h3 className="text-white font-iowan font-bold italic text-[4.44vw] max-xs:text-[6.5vw] max-xs:text-center">
        Връзка с мен
      </h3>

      <section className="flex w-full justify-between max-xs:flex-col max-xs:gap-8">
        <form
          className="flex flex-col gap-14 md:w-[44%] items-start max-xs:w-full max-xs:gap-8 max-xs:items-stretch"
          id="contact"
          onSubmit={onSubmit}
          aria-busy={isLoading}
          aria-describedby="contact-form-status"
        >
          <label htmlFor="name" className="sr-only">Име</label>
          <input
            className="text-white text-[1.2vw] placeholder-[#BBBBBB] border-b-2 border-b-white w-full pb-[5px] focus:border-b-light focus:ring-0 focus:outline-none transition max-xs:text-[2vw]"
            type="text"
            name="name"
            id="name"
            placeholder="Име"
            required
            autoComplete="name"
          />

          <label htmlFor="phone" className="sr-only">Телефонен номер</label>
          <input
            className="text-white text-[1.2vw] placeholder-[#BBBBBB] border-b-2 border-b-white w-full pb-[5px] focus:border-b-light focus:ring-0 focus:outline-none transition max-xs:text-[2vw]"
            type="tel"
            name="phone"
            id="phone"
            placeholder="Телефонен номер"
            required
            inputMode="tel"
            autoComplete="tel"
          />


          <label htmlFor="message" className="sr-only">Съобщение</label>
          <textarea
            className="text-white text-[1.2vw] placeholder-[#BBBBBB] border-b-2 border-b-white w-full pb-[5px] focus:border-b-light focus:ring-0 focus:outline-none transition resize-none max-xs:text-[2vw]"
            rows={3}
            name="message"
            id="message"
            placeholder="Съобщение"
            required
          ></textarea>

          <input
            className="bg-light px-9 py-1.5 cursor-pointer rounded-lg text-[1.25vw] font-inter text-[#0C1203] max-xs:text-[2.5vw] disabled:opacity-60 disabled:cursor-not-allowed transition active:translate-y-[1px]"
            type="submit"
            value={isLoading ? "Изпращане..." : "Изпрати"}
            disabled={isLoading}
          />

          <div id="contact-form-status" aria-live="polite" className="min-h-[1.5rem]">
            {status === "success" && (
              <p className="text-green-200 text-sm pt-2">
                Съобщението е изпратено успешно!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-200 text-sm pt-2">{errorMsg}</p>
            )}
          </div>
        </form>

        <article className="flex flex-col gap-7 text-[#EEE2D7] max-xs:gap-9">
          <div className="flex items-center gap-2 max-xs:flex-col max-xs:gap-4">
            <Image
              src={"/footer-contact-icons/location.svg"}
              alt=""
              width={40}
              height={40}
              sizes="40px"
              className="w-[40px] max-xs:w-[13vw]"
              aria-hidden="true"
            />
            <p className="font-inter font-medium text-[1.53vw] max-xs:text-[3vw]">
              Цар Освободител 13, Разград
            </p>
          </div>
          <div className="flex items-center gap-2 max-xs:flex-col max-xs:gap-4">
            <Image
              src={"/footer-contact-icons/phone.svg"}
              alt=""
              width={40}
              height={40}
              sizes="40px"
              className="w-[40px] max-xs:w-[13vw]"
              aria-hidden="true"
            />
            <p className="font-inter font-medium text-[1.53vw] max-xs:text-[3vw]">
              +359 88 652 1239
            </p>
          </div>
          <div className="flex items-center gap-2 max-xs:flex-col max-xs:gap-4">
            <Image
              src={"/footer-contact-icons/email.svg"}
              alt=""
              width={40}
              height={40}
              sizes="40px"
              className="w-[40px] max-xs:w-[13vw]"
              aria-hidden="true"
            />
            <p className="font-inter font-medium text-[1.53vw] max-xs:text-[3vw]">
              woodenstatues58@gmail.com
            </p>
          </div>
        </article>
      </section>
    </footer>
  );
};

export default Footer;
