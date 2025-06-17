"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Logout from "./Logout";
import { useAuthStore } from "@/store/authStore";

type HeaderAdminProps = {
  openDrawer?: boolean;
  sideMenuButton?: () => void;
};

export default function HeaderAdmin({
  sideMenuButton = () => {},
}: HeaderAdminProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setCurrentTime(formatted);
  }, []);

  function handleOpenProfileMenu() {
    setOpenProfileMenu((prev) => !prev);
  }

  return (
    <div
      className="fixed top-0 z-[40] w-full py-2 px-2 h-[8vh] bg-white border-b border-stone-200 transition-all duration-300 ease-in-out"
      style={{ willChange: "transform" }}
    >
      <div className="flex w-full h-full gap-2">
        <div className="flex items-center gap-2">
          <button onClick={sideMenuButton}>
            <MdMenu />
          </button>
        </div>
        <div className="flex items-center justify-between flex-1 gap-4">
          <span className="text-md">
            {`Selamat datang`}{" "}
            {user && <span className="font-bold">{user.name}</span>}{" "}
            {`di halaman admin Sotta Souvenir`}
          </span>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-sm">{currentTime} WIB</span>
            <Button variant="gray" size="icon">
              <Image
                src={user?.avatar ?? "/assets/avatar-1.svg"}
                alt={`Avatar ${user?.name ?? ""}`}
                width={25}
                height={25}
                onClick={handleOpenProfileMenu}
              />
            </Button>
            {openProfileMenu && (
              <div
                ref={menuRef}
                className="right-0 top-8 w-[10vw] h-[20vh] shadow-md rounded-md bg-white absolute z-[10]"
              >
                <ul className="py-2">
                  <li className="flex pl-4 pr-16 py-1 text-sm text-stone-800 hover:bg-stone-200 w-full cursor-pointer">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        router.push("/profile");
                      }}
                    >
                      <BsPersonCircle /> Profile
                    </Button>
                  </li>
                  <li className="flex pl-4 pr-16 py-1 text-sm text-stone-800 hover:bg-stone-200 w-full cursor-pointer">
                    <Logout />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
