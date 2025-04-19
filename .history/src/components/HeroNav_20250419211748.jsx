"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

const Nav = () => {
    return (
        <div className="z-10 flex flex-row bg-white dark:bg-gray-800 sticky top-0 left-0 right-0 h-20 items-center justify-between p-5">
            <Link href='/'><img src={'/logo.svg'} className="h-16 bg-transparent ml-[6vw]" alt="Logo"/></Link>
            <div>
                <Link href='/about' className="text-xl font-medium mx-3 hover:underline">About Us</Link>
                <Link href='/auth/sign-in' className="font-medium px-4 py-2 mx-1 text-xl text-white bg-[#117955] rounded-3xl border-[#117955] border-[2px] hover:bg-white hover:text-[#117955]">LogIn</Link>
                <Link href='/auth/log-in' className="font-medium px-4 py-2 mx-1 text-xl text-green-900 bg-white border-[#117955] border-[2px] rounded-3xl hover:bg-[#117955] hover:text-white">SignUp</Link>
            </div>
        </div>
    );
}

const HomeNav = () => {
    const location = usePathname();
    const isServicesPage = location.includes("/services");
    return !isServicesPage ? <Nav /> : null;
}

export default HomeNav;