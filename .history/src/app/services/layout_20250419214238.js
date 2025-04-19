
import HeroFooter from "@/components/HeroFooter";
import Navbar from "@/components/Navbar";



export default function ServiceLayout({ children }) {
  return (
   
      <>
        <Navbar/>
        {children}
        
      </>
 
  );
}
