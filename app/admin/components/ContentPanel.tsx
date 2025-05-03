import { useMenu } from "@/context/MenuContext";
import Gallery from "../pages/Gallery";
import Dashboard from "../pages/Dashboard";

export default function ContentPanel() {
  const { selectedMenu } = useMenu();

  function renderContent() {
    switch (selectedMenu) {
      case "Dashboard":
        return <Dashboard />;
      case "Gallery":
        return <Gallery />;
      default:
        return <div>Pilih Menu</div>;
    }
  }

  return <div className="flex-1 p-6 bg-white">{renderContent()}</div>;
}
