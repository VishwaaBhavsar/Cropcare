import Link from "next/link";
const Navbar = () => {
    return (
                <div className=" z-10 flex flex-row bg-white dark:bg-gray-800 sticky top-0 left-0 right-0 h-20 items-center justify-between p-5">
                    <Link href='/'><img src={'/logo.svg'} className="h-16 bg-transparent ml-[6vw]"/></Link>
                    <div>
                        {/* <Link href='/about' className="text-xl font-medium mx-3">About Us</Link> */}
                        <Link href='/service/chat' className="hover:text-[#117955] text-xl font-medium mx-3">Chatbot</Link>
                        <Link href='/service/cure' className="hover:text-[#117955] texttext-xl font-medium mx-3">Plant-Cure</Link>
                        <Link href='/service/weather' className="hover:text-[#117955] text-[] text-xl font-medium mx-3">Weather</Link>

                        
                    </div>
                </div>
            );
        }
export default Navbar;