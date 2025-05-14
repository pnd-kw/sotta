import { cookies } from "next/headers";
import ContentPanel from "./components/ContentPanel";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return <ContentPanel />;
}
