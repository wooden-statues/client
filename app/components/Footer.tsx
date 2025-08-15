import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-dark-green px-[18%] py-[9.72vw] flex flex-col gap-10 relative z-10 max-xs:px-[10vw] max-xs:gap-6">
            <h3 className="text-white font-iowan font-bold italic text-[4.44vw] max-xs:text-[6.5vw] max-xs:text-center">Връзка с мен</h3>

            <section className="flex w-full justify-between max-xs:flex-col max-xs:gap-8">
                <form className="flex flex-col gap-14 w-4/9 items-start max-xs:w-full max-xs:gap-8 max-xs:items-stretch" id="contact">
                    <input className="text-white text-[1.2vw] placeholder-[#BBBBBB] border-b-2 border-b-white w-full pb-[5px] focus:border-b-light focus:ring-0 focus:outline-none transition max-xs:text-[2vw]" type="text" name="name" id="name" placeholder="Име" required />
                    <input className="text-white text-[1.2vw] placeholder-[#BBBBBB] border-b-2 border-b-white w-full pb-[5px] focus:border-b-light focus:ring-0 focus:outline-none transition max-xs:text-[2vw]" type="text" name="phone" id="phone" placeholder="Телефонен номер" required />
                    <input className="text-white text-[1.2vw] placeholder-[#BBBBBB] border-b-2 border-b-white w-full pb-[5px] focus:border-b-light focus:ring-0 focus:outline-none transition max-xs:text-[2vw]" type="email" name="email" id="email" placeholder="Имейл" required />

                    <input className="bg-light px-9 py-1.5 cursor-pointer rounded-lg text-[1.25vw] font-inter text-[#0C1203] max-xs:text-[2.5vw]" type="submit" value="Изпрати" />
                </form>

                <article className="flex flex-col gap-7 text-[#EEE2D7] max-xs:gap-9">
                    <div className="flex items-center gap-2 max-xs:flex-col max-xs:gap-4">
                        <Image src={"/footer-contact-icons/location.svg"} alt="location icon" width={0} height={0} className="w-[40px] max-xs:w-[13vw]" />
                        <p className="font-inter font-medium text-[1.53vw] max-xs:text-[3vw]">Цар Освободител 13, Разград</p>
                    </div>
                    <div className="flex items-center gap-2 max-xs:flex-col max-xs:gap-4">
                        <Image src={"/footer-contact-icons/phone.svg"} alt="phone icon" width={0} height={0} className="w-[40px] max-xs:w-[13vw]" />
                        <p className="font-inter font-medium text-[1.53vw] max-xs:text-[3vw]">+359 88 652 1239</p>
                    </div>
                    <div className="flex items-center gap-2 max-xs:flex-col max-xs:gap-4">
                        <Image src={"/footer-contact-icons/email.svg"} alt="email icon" width={0} height={0} className="w-[40px] max-xs:w-[13vw]" />
                        <p className="font-inter font-medium text-[1.53vw] max-xs:text-[3vw]">woodenstatues58@gmail.com</p>
                    </div>
                </article>
            </section>
        </footer>
    );
}

export default Footer;