import React from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import Button from "../shared/Button";
import { useStateProvider } from "@/context/StateContext";

const Sidebar = () => {
  const [{ userInfo }, dispatch] = useStateProvider();
  const router = useRouter();
  const handleLogout = () => {
    destroyCookie(null, "access-token");
    router.push("/");
  };
  return (
    <section className={`h-screen w-80 p-2`}>
      <div className="border h-full bg-white rounded-md">
        <div className="grid place-items-center h-[150px]">
          <img
            src="/Color_logo_with_background.webp"
            alt="logo"
            className="w-36"
          />
        </div>

        <Button onClick={handleLogout} className={"w-full"}>Logout</Button>
      </div>
    </section>
  );
};

export default Sidebar;
