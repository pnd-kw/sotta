"use client";

import { useAuthStore } from "@/store/authStore";

import { useEffect, useState } from "react";
import { getUserById } from "@/app/api/user/getUserById";
import ToastWithProgress from "@/utils/ToastWithProgress";
import UserForm from "../admin/components/forms/UserForm";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

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
  gender:
    typeof user.gender?.value === "string" && user.gender.value
      ? user.gender.value.toLowerCase()
      : "laki-laki",
  avatar: user.avatar,
  phone_number: user.phone_number,
  role: {
    id: user.role.id,
    name: user.role.name,
  },
});

export default function Profile() {
  const router = useRouter(); 
  const user = useAuthStore((state) => state.user?.id_user);
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchUserById = async () => {
      try {
        const data = await getUserById({ id: user });
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

  return (
    <div className="relative flex items-center justify-center w-[100vw] h-[100vh] bg-white">
      <button
        className="absolute top-2 right-6 text-xl font-bold text-stone-500 hover:text-stone-700 transition"
        onClick={() => router.push("/admin")}
        aria-label="Close"
        title="Kembali ke halaman admin"
      >
        <MdClose size={30}/>
      </button>

      <div className="w-[60vw] h-[100vh]">
        <UserForm userId={user} initialData={loggedInUser} />
      </div>
    </div>
  );
}

