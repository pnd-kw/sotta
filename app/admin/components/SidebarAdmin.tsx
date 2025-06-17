"use client";

import { useMenu } from "@/context/MenuContext";
import { useAuthStore } from "@/store/authStore";
import { JSX, useState } from "react";
import { FaImages, FaStar } from "react-icons/fa";
import {
  MdDashboard,
  MdExpandLess,
  MdExpandMore,
  MdPerson,
} from "react-icons/md";

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
  {
    title: "Customer experiences",
    icon: <FaStar />,
  },
  {
    title: "User management",
    icon: <MdPerson />,
  },
];

export default function SidebarAdmin({
  openDrawer = false,
}: SidebarAdminProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { selectedMenu, setSelectedMenu } = useMenu();
  const loggedInRoles = useAuthStore((state) => state.user?.role_name);

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
      <div className="px-6 pt-20">
        <span className="text-2xl text-white font-bold font-mono">Sotta</span>
      </div>
      <div className="py-10">
        {sideMenus.map((menu, index) => (
          <div key={index}>
            {menu.title === "User management" &&
            loggedInRoles !== "superadmin" ? null : (
              <button
                className={`flex items-center justify-between w-full px-4 py-2 hover:bg-[#996515] ${
                  selectedMenu === menu.title ? "bg-[#996515]" : ""
                }`}
                onClick={() => handleSelectMenu(menu)}
              >
                <span className="flex items-center gap-2 text-sm text-white">
                  {menu.icon}
                  {menu.title}
                </span>
                {menu.children &&
                  (openMenus[menu.title] ? <MdExpandLess /> : <MdExpandMore />)}
              </button>
            )}

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
