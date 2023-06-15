import React from "react";
import { destroyCookie } from "nookies";
import { useRouter} from "next/router";

const Sidebar = () => {

  const router = useRouter()
  const handleLogout = () => {

    destroyCookie(null, "access-token");
    router.push("/")

  };
  return (
    <section className="h-screen w-80 p-2">
      <div className="border h-full bg-white rounded-md">
  
        <div className="grid place-items-center h-[150px]">
           <img src="/Color_logo_with_background.webp"  alt="logo" className="w-36"/> 
        </div>

        <p onClick={handleLogout}>Logout</p>
        
      </div>
    </section>
  );
};

export default Sidebar;
