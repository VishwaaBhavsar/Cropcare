import Link from "next/link";


function Navbar() {
    return (
        <>
        <div className="bg-white sticky flex flex-row items-center gap-70 ">
         <Link href='/'><img className=" ml-[7vw] mt-0 h-20 w-40" src="/logo.svg" /></Link>   
        <div className="flex flex-row gap-3.5">
            <h3 className="font-medium text-2xl mt-3.5">About us</h3>
        <button className="">Login</button>
        <button>Sign Up</button>
        </div>
        </div>
        </>
    );
}

export default Navbar;