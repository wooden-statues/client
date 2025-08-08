import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-9 px-50 bg-dark-green">
            <Image src="/logo.svg" alt="logo" width={0} height={0} className="w-auto h-auto" />

            {/* <ul className="flex gap-15 font-lemonada text-xl text-[#F4ECE2] font-[575]"> */}
            <ul className="flex gap-15 text-xl text-[#F4ECE2] font-[575]">
                <li><Link href="/">Начало</Link></li>
                <li><Link href="/requests">Заявки</Link></li>
                <li><Link href="/gallery">Галерия</Link></li>
                <li><Link href="/contacts">Контакти</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;