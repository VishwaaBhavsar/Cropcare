import { Link } from "lucide-react";

function Navbar() {
    return (
        <>
        <div className="bg-white sticky flex flex-row items-center gap-70 ">
         <Link to='/'></Link>   
        <div className="flex flex-row">
            <h3 className="font-medium text-2xl mt-3.5">About us</h3>
        </div>
        </div>
        </>
    );
}

export default Navbar;