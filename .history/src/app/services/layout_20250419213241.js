
import HeroFooter from "@/components/HeroFooter";
import Navbar from "@/components/Navbar";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       
      >
        <Navbar/>
        {children}
        <HeroFooter/>
      </body>
    </html>
  );
}
