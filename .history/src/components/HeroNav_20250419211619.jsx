import Link from "next/link";
import { usePathname } from "next/navigation";
const HeroNav = () => {
    return (
        <div className=" z-10 flex flex-row bg-white dark:bg-gray-800 sticky top-0 left-0 right-0 h-20 items-center justify-between p-5">
            <Link href='/'><img src={'/logo.svg'} className="h-16 bg-transparent ml-[6vw]"/></Link>
            <div>
                <Link href='/about' className="text-xl font-medium mx-3">About Us</Link>
                <Link href='/auth/sign-in' className="px-4 py-2 mx-2 text-xl text-white bg-[#117955] rounded-3xl hover:bg-white hover:text-[#117955] hover:border-1 border-[#117955]">LogIn</Link>
                <Link href='/auth/log-in' className="px-4 py-2 mx-1 text-xl  bg-white border-1 border-[#117955] text-[#117955] hover:text-white hover:bg-[#117955] rounded-3xl">SignUp</Link>
            </div>
        </div>
    );
}
const HomeNav=()=>{
    const location=usePathname();
    const isServicesPage=location.includes
}

export default HeroNav;