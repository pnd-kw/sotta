// "use client";

// import { useAuthStore } from "@/store/authStore";
// import ContentPanel from "./components/ContentPanel";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Spinner from "@/utils/Spinner";

// export default function AdminPage() {
//   const router = useRouter();
//   const [isVerified, setIsVerified] = useState<boolean>(false);
//   const token = useAuthStore((state) => state.token);

//   useEffect(() => {
//     if (!token) {
//       router.replace("/login");
//       setIsVerified(false);
//     } else {
//       setIsVerified(false);
//     }
//   }, [token, router]);

//   if (isVerified === null) {
//     return <Spinner />;
//   }

//   return isVerified ? <ContentPanel /> : null;
// }
"use client";

import ContentPanel from "./components/ContentPanel";

export default function AdminPage() {
  return <ContentPanel />;
}
