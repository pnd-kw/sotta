"use client";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { MdLogout, MdMenu } from "react-icons/md";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type HeaderAdminProps = {
  openDrawer?: boolean;
  sideMenuButton?: () => void;
};

export default function HeaderAdmin({
  // openDrawer = false,
  sideMenuButton = () => {},
}: HeaderAdminProps) {
  // const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleOpenProfileMenu() {
    setOpenProfileMenu((prev) => !prev);
  }

  return (
    <div
      className="fixed top-0 z-[40] w-full py-2 px-2 h-[8vh] bg-white border-b border-stone-200 transition-all duration-300 ease-in-out"
      style={{ willChange: "transform" }}
    >
      <div className="flex w-full h-full gap-2">
        {/* <div className="flex items-center gap-2 justify-center w-[16vw]">
          <span className="text-stone-900 text-xl font-bold leading-none">
            Sotta Admin
          </span>
          <span className="text-stone-300 text-sm leading-none mt-2">
            v.1.0.1
          </span>
        </div> */}
        <div className="flex items-center gap-2">
          <button onClick={sideMenuButton}>
            <MdMenu />
          </button>
        </div>
        <div className="flex items-center justify-between flex-1 gap-4">
          {/* <div className="relative w-full max-w-xl">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search menu..."
              className="w-full pl-4 py-1 text-stone-900 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-400 text-sm placeholder-stone-500"
            />
          </div> */}
          <span className="text-md font-bold">
            Selamat datang admin Sotta Souvenir
          </span>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-sm">{format(new Date(), "EEEE, dd MMMM yyyy HH:mm", { locale: id })} WIB</span>
            <Button variant="gray" size="icon">
              <Image
                src="/assets/avatar-1.svg"
                alt="Avatar 1"
                width={25}
                height={25}
                onClick={handleOpenProfileMenu}
              />
            </Button>
            {openProfileMenu && (
              <div
                ref={menuRef}
                className="right-0 top-8 w-10vw h-20vh shadow-md rounded-md bg-white absolute z-[10]"
              >
                <ul className="py-2">
                  <li className="flex pl-4 pr-16 py-1 text-sm text-stone-800 hover:bg-stone-200 w-full cursor-pointer">
                    <Button variant="ghost" onClick={() => {}}>
                      <BsPersonCircle /> Profile
                    </Button>
                  </li>
                  <li className="flex pl-4 pr-16 py-1 text-sm text-stone-800 hover:bg-stone-200 w-full cursor-pointer">
                    <Button variant="ghost" onClick={() => {}}>
                      <MdLogout /> Logout
                    </Button>
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
