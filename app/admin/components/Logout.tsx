import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

export default function Logout() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Button variant="ghost" onClick={handleLogout}>
      <MdLogout />{" "}Logout
    </Button>
  );
}
