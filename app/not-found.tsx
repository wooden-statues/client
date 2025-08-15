import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="text-center flex flex-col justify-center items-center gap-[1.7vw] py-[6vw] max-xs:py-[13vw]">
            <svg className='w-[10vw] max-xs:w-[18vw]' xmlns="http://www.w3.org/2000/svg" fill="oklch(85.2% 0.199 91.936)" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <h1 className="text-[5vw]/[5vw] font-bold max-xs:text-[7vw]/[7vw]">404 Not Found</h1>
            <p className="text-[1.8vw] max-xs:text-[2.5vw]">This page does not exist</p>
            <Link href="/" className="text-white text-[1.6vw] bg-dark-green rounded-md px-[3vw] py-[0.6vw] max-xs:text-[2.2vw]">
                Go to Home
            </Link>
        </section>
    );
}