import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-9 px-50 bg-dark-green">
            <picture>
                <img src="/logo.svg" alt="logo" />
            </picture>

            <ul className="flex gap-15 font-lemonada text-xl text-[#F4ECE2] font-[575]">
                <li><Link href="/">Начало</Link></li>
                <li><Link href="/requests">Заявки</Link></li>
                <li><Link href="/gallery">Галерия</Link></li>
                <li><Link href="/contacts">Контакти</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;