"use client";

import { useState } from "react";
import { MdMenu } from "react-icons/md";

type HeaderAdminProps = {
  openDrawer?: boolean;
  sideMenuButton?: () => void;
};

export default function HeaderAdmin({
  openDrawer = false,
  sideMenuButton = () => {},
}: HeaderAdminProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  return (
    <div
      className={`fixed top-0 w-full py-2 px-2 h-[8vh] bg-white border-b border-stone-200 transition-all duration-300 ease-in-out ${
        openDrawer ? "transform translate-x-56" : "transform translate-x-0"
      } `}
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
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search menu..."
              className="w-full pl-4 py-1 text-stone-900 border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-400 text-sm placeholder-stone-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
