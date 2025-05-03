"use client";

import { useMenu } from "@/context/MenuContext";
import { JSX, useState } from "react";
import { FaImages } from "react-icons/fa";
import { MdDashboard, MdExpandLess, MdExpandMore } from "react-icons/md";

type MenuItem = {
  title: string;
  icon: JSX.Element;
  children?: MenuItem[];
};

type SidebarAdminProps = {
  openDrawer?: boolean;
};

const sideMenus: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    title: "Gallery",
    icon: <FaImages />,
  },
];

export default function SidebarAdmin({
  openDrawer = false,
}: SidebarAdminProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { setSelectedMenu } = useMenu();

  function handleSelectMenu(menu: MenuItem) {
    if (menu.children) {
      toggleMenu(menu.title);
    } else {
      setSelectedMenu(menu.title);
    }
  }

  function toggleMenu(title: string) {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }

  return (
    <div
      className={`fixed top-0 left-0 w-56 h-screen z-[30] bg-[#85582c] transform transition-transform duration-500 ease-in-out ${
        openDrawer ? "transform translate-x-0" : "transform -translate-x-full"
      }`}
      style={{ willChange: "transform" }}
    >
      <div className="px-6 pt-4">
        <span className="text-2xl text-white font-bold">Logo</span>
      </div>
      <div className="py-10">
        {sideMenus.map((menu, index) => (
          <div key={index}>
            <button
              className="flex items-center justify-between w-full px-4 py-2 hover:bg-stone-900"
              onClick={() => handleSelectMenu(menu)}
            >
              <span className="flex items-center gap-2 text-sm text-white">
                {menu.icon}
                {menu.title}
              </span>
              {menu.children &&
                (openMenus[menu.title] ? <MdExpandLess /> : <MdExpandMore />)}
            </button>
            <div
              className={`overflow-hidden transition-all ${
                openMenus[menu.title] ? "max-h-40" : "max-h-0"
              }`}
              style={{
                transitionDuration: openMenus[menu.title] ? "1500ms" : "500ms",
              }}
            >
              <ul className="ml-4 pl-4 text-xs border-l border-stone-500">
                {menu.children?.map((childMenu, childIndex) => (
                  <li className="py-2 hover:bg-stone-900" key={childIndex}>
                    <button
                      className="w-full text-left"
                      onClick={() => setSelectedMenu(childMenu.title)}
                    >
                      {childMenu.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
