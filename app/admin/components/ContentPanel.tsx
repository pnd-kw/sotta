"use client";

import { useMenu } from "@/context/MenuContext";
import Gallery from "../pages/Gallery";
import Dashboard from "../pages/Dashboard";
import CustomerExp from "../pages/CustomerReview";
import Users from "../pages/Users";

export default function ContentPanel() {
  const { selectedMenu } = useMenu();

  function renderContent() {
    switch (selectedMenu) {
      case "Dashboard":
        return <Dashboard />;
      case "Gallery":
        return <Gallery />;
      case "Customer experiences":
        return <CustomerExp />;
      case "User management":
        return <Users />;
      default:
        return <div>Pilih Menu</div>;
    }
  }

  return <div className="flex-1 p-6 bg-stone-100">{renderContent()}</div>;
}
