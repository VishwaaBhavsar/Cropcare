// import Link from "next/link";


// function Navbar() {
//     return (
//         <>
//         <div className="bg-white sticky flex flex-row items-center justify-between ">
//          <Link href='/'><img className=" ml-[7vw] mt-0 h-20 w-40" src="/logo.svg" /></Link>   
//         <div className="flex flex-row gap-3 mr-20 ">
//             <h3 className="font-medium text-2xl ">About us</h3>
//         <button className="bg-[#117955] px-6 py-2 text-xl rounded-full text-white mt-1">Login</button>
//         <button className="bg-[#117955] px-6 py-2 text-xl rounded-full text-white mt-1">Sign Up</button>
//         </div>
//         </div>
//         </>
//     );
// }

// export default Navbar;
import Link from "next/link";
const HomeNav = () => {
    return (
        <div className="flex flex-row bg-white dark:bg-gray-800 sticky top-0 left-0 right-0 h-20 items-center justify-between p-5">
            <Link href='/'><img src={'/logo.svg'} className="h-16 bg-transparent ml-[6vw]"/></Link>
            <div>
                <Link href='/about' className="text-xl font-medium">About Us</Link>
                <Link href='/auth/sign-in' className="px-4 py-2 mx-1 text-xl text-white bg-[#117955] rounded-3xl">LogIn</Link>
                <Link href='/auth/log-in' className="px-4 py-2 mx-1 text-xl text-white bg-white text-greeb rounded-3xl">SignUp</Link>
            </div>
        </div>
    );
}

export default HomeNav;