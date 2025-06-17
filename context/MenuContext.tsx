"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type MenuContextType = {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  anchor: string;
  setAnchor: (anchor: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("Dashboard");
  const [anchor, setAnchor] = useState("");

  return (
    <MenuContext.Provider
      value={{ selectedMenu, setSelectedMenu, anchor, setAnchor }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};
