import React from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = () => {
    destroyCookie(null, "access-token");
    router.push("/");
    window.location.reload()
  };
  return (
    <section className={`h-screen w-80 p-2`}>
      <div className="border h-full bg-white rounded-md px-2 py-6">
        <div className="grid place-items-center h-[150px]">
          <img src="/Color_logo_with_background.webp" alt="logo" className="w-36" />
        </div>

        <p className="p-3 bg-primary-700 rounded-md text-white text-lg">Product List</p>
        <div
          onClick={handleLogout}
          className="flex justify-between border p-3 text-gray-600 mt-5 border-primary-700 rounded-md cursor-pointer hover:bg-primary-700 hover:text-white duration-300"
        >
          <p>Logout</p>
          <LogOut />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
