import { useAuthStore } from "@/store/authStore";
import UserForm from "../components/forms/UserForm";
import { useState } from "react";

const users = [
  {
    id_user: "xvk765ia",
    username: "john",
    nama: "john doe",
    phone_number: "085524311234",
    roles: "admin",
    password: "admin123",
    password_confirm: "admin123",
    created_at: "2025-02-10T10:14:40.000456Z",
    updated_at: "2025-02-10T10:14:40.000456Z",
  },
  {
    id_user: "myc285pl",
    username: "susie",
    nama: "susan",
    phone_number: "085578900987",
    roles: "account officer",
    password: "account123",
    password_confirm: "account123",
    created_at: "2025-02-10T10:14:41.000456Z",
    updated_at: "2025-02-10T10:14:41.000456Z",
  },
];

export default function Profile() {
  const user = useAuthStore((state) => state.username);
  const [selectedUser, setSelectedUser] = useState<string | null>("");

  function getUser() {
    const matchUser = users.find((item) => item.username === user);
    if (matchUser) {
      setSelectedUser(matchUser.id_user);
    }
  }

  return <UserForm userId={selectedUser} />;
}
