import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Table } from "@/utils/Table";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FaPlus } from "react-icons/fa";
import UserForm from "../components/forms/UserForm";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRef, useState } from "react";
import BouncingImage from "@/utils/BouncingImage";
import ImageAlertDialog, {
  ImageAlertDialogHandle,
} from "@/utils/ImageAlertDialog";

type Gender = "laki-laki" | "perempuan";

type User = {
  id_user: string;
  username: string;
  nama: string;
  gender: Gender;
  avatar: string;
  phone_number: string;
  roles: string;
  password: string;
  password_confirm: string;
  created_at: string;
  updated_at: string;
};

const users: User[] = [
  {
    id_user: "manutd20",
    username: "alfian_persie",
    nama: "Eva Alfian",
    gender: "laki-laki",
    avatar: "/assets/avatar-1.svg",
    phone_number: "085774801409",
    roles: "superadmin",
    password: "rahasia",
    password_confirm: "rahasia",
    created_at: "2025-05-13T10:09:23.000456Z",
    updated_at: "2025-05-13T10:09:23.000456Z",
  },
  {
    id_user: "xvk765ia",
    username: "john",
    nama: "john doe",
    gender: "laki-laki",
    avatar: "/assets/avatar-2.svg",
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
    gender: "perempuan",
    avatar: "/assets/avatar-3.svg",
    phone_number: "085578900987",
    roles: "account officer",
    password: "account123",
    password_confirm: "account123",
    created_at: "2025-02-10T10:14:41.000456Z",
    updated_at: "2025-02-10T10:14:41.000456Z",
  },
];

export default function Users() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const dialog = useRef<ImageAlertDialogHandle>(null);

  function handleEdit(id_user: string) {
    console.log("handle edit", id_user);
    setSelectedUserId(id_user);
    setIsFormDialogOpen(true);
  }

  function handleDelete(id_user: string) {
    console.log("handleDelete");
    setSelectedUserId(id_user);
    dialog.current?.openDialog();
  }

  return (
    <>
      <div className="w-full h-[100vh] bg-white px-4 py-4 rounded-lg">
        <h3 className="text-xl md:text-2xl font-bold mb-2">User Management</h3>
        <div className="md:max-w-[80vw] mx-auto px-4 py-2 mb-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between py-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-1/2 border border-stone-300 px-2 py-2 rounded-md"
            />
            <Button
              variant="green"
              onClick={() => {
                setSelectedUserId(null);
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
                  setSelectedUserId(null);
                }
              }}
            >
              {/* <DialogTrigger asChild>
                <Button variant="green">
                  <FaPlus />
                  Tambah
                </Button>
              </DialogTrigger> */}
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
                  {selectedUserId ? "Edit User" : "Tambah User"}
                </div>
                <UserForm userId={selectedUserId} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="md:max-w-[80vw] mx-auto px-4 py-2 mb-4 rounded-lg shadow-sm">
          <Table
            data={users}
            listIconButton={[
              {
                name: "edit",
                value: true,
                icon: <MdEdit />,
                variant: "transAmberText",
                onClick: (row: User) => handleEdit(row.id_user),
              },
              {
                name: "delete",
                value: true,
                icon: <MdDelete />,
                variant: "transRedText",
                onClick: (row: User) => handleDelete(row.id_user),
              },
            ]}
            customWidths={{
              username: "min-w-[14rem]",
              nama: "min-w-[14rem]",
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
        content={`Apakah anda ingin menghapus user dengan id ${selectedUserId} ?`}
      />
    </>
  );
}
