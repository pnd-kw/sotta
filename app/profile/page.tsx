// "use client";

// import { useAuthStore } from "@/store/authStore";
// import { useEffect, useState } from "react";
// import UserForm from "../admin/components/forms/UserForm";
// import { Button } from "@/components/ui/button";
// import { MdClose } from "react-icons/md";
// import { useRouter } from "next/navigation";

// type Gender = "laki-laki" | "perempuan";

// type User = {
//   id_user: string;
//   username: string;
//   nama: string;
//   gender: Gender;
//   avatar: string;
//   phone_number: string;
//   roles: string;
//   password: string;
//   password_confirm: string;
//   created_at: string;
//   updated_at: string;
// };

// const users: User[] = [
//   {
//     id_user: "manutd20",
//     username: "alfian_persie",
//     nama: "Eva Alfian",
//     gender: "laki-laki",
//     avatar: "/assets/avatar-1.svg",
//     phone_number: "085774801409",
//     roles: "superadmin",
//     password: "rahasia",
//     password_confirm: "rahasia",
//     created_at: "2025-05-13T10:09:23.000456Z",
//     updated_at: "2025-05-13T10:09:23.000456Z",
//   },
//   {
//     id_user: "xvk765ia",
//     username: "john",
//     nama: "john doe",
//     gender: "laki-laki",
//     avatar: "/assets/avatar-2.svg",
//     phone_number: "085524311234",
//     roles: "admin",
//     password: "admin123",
//     password_confirm: "admin123",
//     created_at: "2025-02-10T10:14:40.000456Z",
//     updated_at: "2025-02-10T10:14:40.000456Z",
//   },
//   {
//     id_user: "myc285pl",
//     username: "susie",
//     nama: "susan",
//     gender: "perempuan",
//     avatar: "/assets/avatar-3.svg",
//     phone_number: "085578900987",
//     roles: "account officer",
//     password: "account123",
//     password_confirm: "account123",
//     created_at: "2025-02-10T10:14:41.000456Z",
//     updated_at: "2025-02-10T10:14:41.000456Z",
//   },
// ];

// export default function Profile() {
//   const router = useRouter();
//   const user = useAuthStore((state) => state.username);
//   const [selectedUser, setSelectedUser] = useState<string | null>("");

//   useEffect(() => {
//     const matchUser = users.find((item) => item.username === user);
//     if (matchUser) {
//       setSelectedUser(matchUser.id_user);
//     }
//   }, [user]);

//   const handleClose = () => {
//     router.back();
//   };

//   return (
//     <div className="flex flex-col w-full h-screen">
//       <div className="flex justify-end">
//         <Button
//           variant="transGrayText"
//           size="icon"
//           className="w-12 h-12"
//           onClick={handleClose}
//         >
//           <MdClose className="text-3xl" />
//         </Button>
//       </div>

//       <div className="flex flex-1 items-center justify-center">
//         <div className="flex flex-col w-[50vw] justify-center items-center">
//           <h1 className="flex justify-center text-3xl font-bold py-4">
//             Profile
//           </h1>
//           <div className="w-full">
//             <UserForm userId={selectedUser} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useAuthStore } from "@/store/authStore";

import { useEffect, useState } from "react";
import { getUserById } from "@/app/api/user/getUserById";
import ToastWithProgress from "@/utils/ToastWithProgress";
import UserForm from "../admin/components/forms/UserForm";

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
  const user = useAuthStore((state) => state.user?.id_user);
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
