// import Link from "next/link";

// const Navbar = () => {

//     return (
//                 <div className=" z-10 flex flex-row bg-white dark:bg-gray-800 sticky top-0 left-0 right-0 h-20 items-center justify-between p-5">
//                     <Link href='/'><img src={'/logo.svg'} className="h-16 bg-transparent ml-[6vw]"/></Link>
//                     <div>
//                         <Link href='/services' className="text-[#117955] hover:text-[#20B297] text-xl font-medium mx-3">Overview</Link>
//                         <Link href='/services/chat' className="text-[#117955] hover:text-[#20B297] text-xl font-medium mx-3">Chatbot</Link>
//                         <Link href='/services/cure' className="text-[#117955] hover:text-[#20B297] text-xl font-medium mx-3">Plant-Cure</Link>
//                         <Link href='/services/weather' className="text-[#117955] hover:text-[#20B297] text-xl font-medium mx-3">Weather</Link>
//                      </div>
//                 </div>
//             );
//         }
// export default Navbar;

'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
    const location = usePathname();
    const isHome = location!='/services';
    return (
        <div className=" z-10 flex flex-row bg-white dark:bg-gray-800 sticky top-0 left-0 right-0 h-20 items-center justify-between p-5">
            <Link href='/'><img src={'/logo.svg'} className="h-16 bg-transparent ml-[6vw]" /></Link>
            <div>

                <Link href='/services' className="text-[#117955] hover:text-[#20B297] text-xl font-medium mx-3">Overview</Link>
            {isHome &&
            <>
                <Link href='/services/chat' className="text-[#117955] hover:text-[#20B297] text-xl font-medium mx-3">Chatbot</Link>
                <Link href='/services/cure' className="text-[#117955] hover:text-[#20B297] text-xl font-medium mx-3">Plant-Cure</Link>
                <Link href='/services/weather' className="text-[#117955] hover:text-[#20B297] text-xl font-medium mx-3">Weather</Link>
                <Link href='/services/weather' className="text-[#117955] hover:text-[#20B297] text-xl font-medium mx-3">Crop- Calender</Link>
            </>
            }
            </div>
        </div>
    );
}
export default Navbar;