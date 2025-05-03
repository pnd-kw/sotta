"use client";

import { MenuProvider } from "@/context/MenuContext";
import { useState } from "react";
import HeaderAdmin from "./components/HeaderAdmin";
import SidebarAdmin from "./components/SidebarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  function handleOpenSidebar() {
    setIsOpenSidebar((prev) => !prev);
  }

  return (
    <MenuProvider>
      <div className="flex h-screen overflow-hidden">
        <HeaderAdmin sideMenuButton={handleOpenSidebar} openDrawer={isOpenSidebar} />
        <div className="flex pt-[8vh] h-full w-full">
          <SidebarAdmin openDrawer={isOpenSidebar} />
          <main
            className={`flex-1 overflow-y-auto bg-white transition-all duration-300 ${
              isOpenSidebar ? "ml-56" : "ml-0"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </MenuProvider>
  );
}
