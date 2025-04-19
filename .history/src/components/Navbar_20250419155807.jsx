import Link from "next/link";


function Navbar() {
    return (
        <>
        <div className="bg-white sticky flex flex-row items-center gap-70 ">
         <Link href='/'><img className=" ml-[7vw] mt-0 h-20 w-40" src="/logo.svg" /></Link>   
        <div className="flex flex-row">
            <h3 className="font-medium text-2xl mt-3.5">About us</h3>
        </div>
        <button></button>
        </div>
        </>
    );
}

export default Navbar;