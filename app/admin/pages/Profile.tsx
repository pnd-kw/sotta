import { useAuthStore } from "@/store/authStore";
import UserForm from "../components/forms/UserForm";
import { useEffect, useState } from "react";
import { getUserById } from "@/app/api/user/getUserById";
import ToastWithProgress from "@/utils/ToastWithProgress";

type Gender = "laki-laki" | "perempuan";

type UserData = {
  id_user: string;
  name: string;
  email: string;
  gender: Gender;
  avatar: string;
  phone_number: string;
  role: {
    id: number;
    name: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformUserData = (user: any): UserData => ({
  id_user: user.id_user,
  name: user.name,
  email: user.email,
  gender: user.gender.value.toLowerCase(),
  avatar: user.avatar,
  phone_number: user.phone_number,
  role: {
    id: user.role.id,
    name: user.role.name,
  },
});

export default function Profile() {
  const user = useAuthStore((state) => state.user?.id_user);
  console.log("user", user);
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchUserById = async () => {
      try {
        const data = await getUserById({ id: user });
        console.log(data);
        setLoggedInUser(transformUserData(data));
      } catch (error) {
        console.error("Failed to get target user by id", error);
        ToastWithProgress({
          title: "Gagal",
          description: "Gagal mendapatkan data user yang dipilih.",
          duration: 3000,
          type: "error",
        });
      }
    };
    fetchUserById();
  }, [user]);

  return <UserForm userId={user} initialData={loggedInUser} />;
}
