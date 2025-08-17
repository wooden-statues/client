"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";

const Navbar = () => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    // Заключи скрола при отворено меню
    const body = document.body;
    if (isOpened) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [isOpened]);

  function hideNavOverlay(e: MouseEvent<HTMLElement>) {
    if ((e.target as HTMLElement).id === "nav-overlay") {
      setIsOpened(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Escape") setIsOpened(false);
  }

  const navLinks = (classes: string) => {
    return (
      <ul className={classes}>
        <li onClick={(e) => { e.stopPropagation(); setIsOpened(false); }}>
          <Link href="/">Начало</Link>
        </li>
        <li onClick={(e) => { e.stopPropagation(); setIsOpened(false); }}>
          <Link href="/requests">Заявки</Link>
        </li>
        <li onClick={(e) => { e.stopPropagation(); setIsOpened(false); }}>
          <Link href="/gallery">Галерия</Link>
        </li>
        <li onClick={(e) => { e.stopPropagation(); setIsOpened(false); }}>
          <a href="#contact">Контакти</a>
        </li>
      </ul>
    );
  };

  return (
    <nav className="flex justify-between items-center py-9 px-[15vw] bg-dark-green relative z-10 max-md:px-[7vw] max-s:py-6">
      <Link href="/" aria-label="Wooden Statues – Начало">
        <Image src="/logo.svg" alt="Wooden Statues" width={116} height={41} className="w-[8.06vw] min-w-[80px] max-xs:min-w-[60px]" />
      </Link>

      {navLinks("flex gap-15 text-[1.39vw] text-[#F4ECE2] font-[575] max-md:text-[2vw] max-xs:hidden")}

      <button
        type="button"
        onClick={() => setIsOpened(true)}
        className="hidden cursor-pointer max-xs:block"
        aria-label="Отвори менюто"
        aria-controls="mobile-menu"
        aria-expanded={isOpened}
      >
        <svg className="w-[33px] h-[8px]" viewBox="0 0 33 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="33" height="2" fill="white" />
          <rect x="15" y="6" width="18" height="2" fill="white" />
        </svg>
      </button>

      <section
        id="nav-overlay"
        className={`fixed bg-white w-full h-screen z-50 top-0 left-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-linear ${isOpened ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={hideNavOverlay}
        onKeyDown={onKeyDown}
        aria-hidden={!isOpened}
        role="dialog"
        aria-modal="true"
        aria-label="Мобилно меню"
      >
        <button
          className="bg-transparent cursor-pointer absolute top-5 right-5 border-none"
          onClick={() => setIsOpened(false)}
          aria-label="Затвори менюто"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="black" fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" />
          </svg>
        </button>

        {navLinks("flex flex-col gap-2 text-[4vw] text-dark-green font-[575] text-center")}
      </section>
    </nav>
  );
};

export default Navbar;
