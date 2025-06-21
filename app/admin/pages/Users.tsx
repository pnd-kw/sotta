import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table } from "@/utils/Table";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FaPlus } from "react-icons/fa";
import UserForm from "../components/forms/UserForm";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import BouncingImage from "@/utils/BouncingImage";
import ImageAlertDialog, {
  ImageAlertDialogHandle,
} from "@/utils/ImageAlertDialog";
import { getUsers } from "@/app/api/user/getUsers";
import { getUserById } from "@/app/api/user/getUserById";
import ToastWithProgress from "@/utils/ToastWithProgress";
import { deleteUser } from "@/app/api/user/deleteUser";
import Spinner from "@/utils/Spinner";

type Gender = "laki-laki" | "perempuan";

// Tipe untuk menampilkan data ke dalam tabel
type UserTable = {
  id_user: string;
  name: string;
  email: string;
  gender: Gender;
  avatar: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  role_name: string;
};

// Tipe untuk dikirim ke user form
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

const mapGenderFromAPI = (gender: string): "laki-laki" | "perempuan" => {
  if (gender === "male") return "laki-laki";
  if (gender === "female") return "perempuan";
  return "laki-laki"; // default fallback
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformUserTable = (user: any): UserTable => ({
  id_user: user.id_user,
  name: user.name,
  email: user.email,
  gender: mapGenderFromAPI(user.gender),
  avatar: user.avatar,
  phone_number: user.phone_number,
  created_at: user.created_at,
  updated_at: user.updated_at,
  role_name: user.role.name,
});

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

export default function Users() {
  const [userData, setUserData] = useState<UserTable[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<{
    current_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page: number;
    total: number;
  }>({
    current_page: 1,
    next_page_url: null,
    prev_page_url: null,
    last_page: 1,
    total: 0,
  });
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [userPerPage, setUserPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dialog = useRef<ImageAlertDialogHandle>(null);

  const fetchUser = async (page = 1, per_page = userPerPage, search = "") => {
    try {
      setIsLoadingUser(true);
      const data = await getUsers({
        page,
        per_page,
        search,
      });
      setUserData(data.data.map(transformUserTable));
      setPaginationInfo({
        current_page: data.current_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        last_page: data.last_page,
        total: data.total,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to fetch gallery images", error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  // useEffect(() => {
  //   fetchUser(1, userPerPage, searchQuery);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userPerPage]);

  // useEffect(() => {
  //   if (searchQuery.trim() === "") {
  //     fetchUser(1, userPerPage, "");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchQuery]);

  useEffect(() => {
    fetchUser(paginationInfo.current_page, userPerPage, searchQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPerPage, searchQuery]);

  useEffect(() => {
    const resetGalleryIfEmpty = async () => {
      if (searchQuery.trim() === "") {
        fetchUser(1, userPerPage, "");
      }
    };

    resetGalleryIfEmpty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  async function handleEdit(id_user: string) {
    try {
      const data = await getUserById({ id: id_user });
      setSelectedUser(transformUserData(data));
      setIsFormDialogOpen(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to get user by id", error);
      ToastWithProgress({
        title: "Gagal",
        description: "Gagal mendapatkan data user yang dipilih.",
        duration: 3000,
        type: "error",
      });
    }
  }

  function handleSearchUser() {
    fetchUser(paginationInfo.current_page, userPerPage, searchQuery);
  }

  async function handleGetTargetUser(id_user: string) {
    try {
      const data = await getUserById({ id: id_user });
      setSelectedUser(transformUserData(data));
      dialog.current?.openDialog();
    } catch (error) {
      console.error("Failed to get target user by id", error);
      ToastWithProgress({
        title: "Gagal",
        description: "Gagal mendapatkan data user yang dipilih.",
        duration: 3000,
        type: "error",
      });
    }
  }

  async function handleDelete(id_user: string | undefined) {
    if (!id_user) {
      ToastWithProgress({
        title: "Gagal",
        description: "ID image tidak ditemukan",
        duration: 3000,
        type: "error",
      });
      return;
    }
    try {
      await deleteUser(id_user);
      ToastWithProgress({
        title: "Berhasil",
        description: `Berhasil menghapus data user ${id_user}`,
        duration: 3000,
        type: "success",
      });
    } catch (error) {
      console.error("Failed to delete data user", error);
      ToastWithProgress({
        title: "Gagal",
        description: `Gagal menghapus data user ${id_user}`,
        duration: 3000,
        type: "error",
      });
    }
  }

  function handlePageChange(newPage: number) {
    const newPageFixed = newPage + 1;
    setPaginationInfo((prev) => ({
      ...prev,
      current_page: newPageFixed,
    }));
    fetchUser(newPageFixed, userPerPage, searchQuery);
  }

  return (
    <>
      <div className="w-full h-[100vh] bg-white px-4 py-4 rounded-lg">
        <h3 className="text-xl md:text-2xl font-bold mb-2">User Management</h3>
        <div className="md:max-w-[80vw] mx-auto px-4 py-2 mb-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between py-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchUser();
                }
              }}
              placeholder="Search..."
              className="w-1/2 border border-stone-300 px-2 py-2 rounded-md"
            />
            <Button
              variant="green"
              onClick={() => {
                setSelectedUser(null);
                setIsFormDialogOpen(true);
              }}
            >
              <FaPlus /> Tambah
            </Button>
            <Dialog
              open={isFormDialogOpen}
              onOpenChange={(open) => {
                setIsFormDialogOpen(open);
                if (!open) {
                  setSelectedUser(null);
                }
              }}
            >
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <VisuallyHidden>
                  <DialogTitle></DialogTitle>
                </VisuallyHidden>
                <VisuallyHidden>
                  <DialogDescription>
                    Form untuk menambah user
                  </DialogDescription>
                </VisuallyHidden>

                <div className="flex items-center px-4 bg-[#996515] w-full h-[10vh] rounded-tl-md rounded-tr-md text-white font-semibold">
                  {selectedUser ? "Edit User" : "Tambah User"}
                </div>
                <UserForm
                  userId={selectedUser?.id_user}
                  initialData={selectedUser}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="md:max-w-[80vw] mx-auto px-4 py-2 mb-4 rounded-lg shadow-sm">
          {isLoadingUser ? (
            <Spinner />
          ) : userData.length === 0 ? (
            <div className="w-full h-[50vh] flex items-center justify-center">
              <span className="text-xl text-stone-900">
                Data user tidak ditemukan.
              </span>
            </div>
          ) : (
            <Table
              data={userData}
              page={paginationInfo?.current_page - 1}
              totalPage={Math.ceil(paginationInfo?.total / userPerPage)}
              listIconButton={[
                {
                  name: "edit",
                  value: true,
                  icon: <MdEdit />,
                  variant: "transAmberText",
                  onClick: (row: UserTable) => handleEdit(row.id_user),
                },
                {
                  name: "delete",
                  value: true,
                  icon: <MdDelete />,
                  variant: "transRedText",
                  onClick: (row: UserTable) => handleGetTargetUser(row.id_user),
                },
              ]}
              perPage={userPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={(newPerPage) => {
                setUserPerPage(newPerPage);
                setPaginationInfo((prev) => ({
                  ...prev,
                  current_page: 1,
                }));
              }}
              customWidths={{
                name: "min-w-[14rem]",
                email: "min-w-[14rem]",
                gender: "min-w-[12rem]",
                avatar: "min-w-[14rem]",
                phone_number: "min-w-[10rem]",
                roles: "min-w-[10rem]",
                password: "min-w-[10rem]",
                password_confirm: "min-w-[10rem]",
                created_at: "min-w-[10rem]",
                updated_at: "min-w-[10rem]",
              }}
            />
          )}
        </div>
      </div>
      <ImageAlertDialog
        ref={dialog}
        alertImage={
          <BouncingImage
            image="/assets/exclamation-red-icon.svg"
            alt="Delete warning image"
            width={120}
            height={120}
          />
        }
        title="Peringatan"
        content={`Apakah anda ingin menghapus user dengan id ${selectedUser?.id_user} ${selectedUser?.name} ?`}
        button={() => handleDelete(selectedUser?.id_user)}
      />
    </>
  );
}
