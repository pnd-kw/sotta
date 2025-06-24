import { deleteCustomerReview } from "@/app/api/customer_review/deleteCustomerReview";
import { getCustomerReviews } from "@/app/api/customer_review/getCustomerReviews";
import { useAuthStore } from "@/store/authStore";
import BouncingImage from "@/utils/BouncingImage";
import ImageAlertDialog, {
  ImageAlertDialogHandle,
} from "@/utils/ImageAlertDialog";
import Spinner from "@/utils/Spinner";
import { Table } from "@/utils/Table";
import ToastWithProgress from "@/utils/ToastWithProgress";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";

type CustomerReviewData = {
  id: string;
  name: string;
  message: string;
  instansi?: string | null;
  gender: string;
  avatar?: string | null;
  token: string;
  can_edit: boolean;
  can_delete: boolean;
  created_at: string;
};

export default function CustomerExp() {
  const [isLoadingCustomerReviews, setIsLoadingCustomerReviews] =
    useState<boolean>(false);
  const [customerReviewsData, setCustomerReviewsData] = useState<
    CustomerReviewData[]
  >([]);
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [customerReviewsPerPage, setCustomerReviewsPerPage] = useState(10);
  const [selectedReview, setSelectedReview] = useState<CustomerReviewData>({
    id: "",
    name: "",
    message: "",
    instansi: null,
    gender: "laki-laki",
    avatar: null,
    token: "",
    can_edit: false,
    can_delete: false,
    created_at: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reviewPerPage, setReviewPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const loggedInRoles = useAuthStore((state) => state.user?.role_name);
  const dialog = useRef<ImageAlertDialogHandle>(null);

  const fetchCustomerReview = async (page = 1, per_page = 4, search = "") => {
    try {
      setIsLoadingCustomerReviews(true);
      const data = await getCustomerReviews({
        page,
        per_page,
        search,
      });
      setCustomerReviewsData(data.data);
      setPaginationInfo({
        current_page: data.current_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        last_page: data.last_page,
        total: data.total,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to fetch customer reviews", error);
    } finally {
      setIsLoadingCustomerReviews(false);
    }
  };

  useEffect(() => {
    fetchCustomerReview(
      paginationInfo.current_page,
      customerReviewsPerPage,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerReviewsPerPage]);

   useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchCustomerReview(1, reviewPerPage, "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  function handleSearchCustomerReviews() {
    fetchCustomerReview(
      paginationInfo.current_page,
      reviewPerPage,
      searchQuery
    );
  }

  function handleGetTargetReview(token: string) {
    const review = customerReviewsData.find((item) => item.token === token);
    if (review) {
      setSelectedReview(review);
      dialog.current?.openDialog();
    }
  }

  async function handleDelete(id: string, token: string) {
    if (!id) {
      ToastWithProgress({
        title: "Gagal",
        description: "ID review tidak ditemukan",
        duration: 3000,
        type: "error",
      });
      return;
    }
    try {
      await deleteCustomerReview(id, token);
      ToastWithProgress({
        title: "Berhasil",
        description: `Berhasil menghapus data review ${id}`,
        duration: 3000,
        type: "success",
      });
      localStorage.removeItem("customer_review_token");
    } catch (error) {
      console.error("Failed to delete data review", error);
      ToastWithProgress({
        title: "Gagal",
        description: `Gagal menghapus data review ${id}`,
        duration: 3000,
        type: "error",
      });
    }
  }

  return (
    <>
      <div className="w-full bg-white px-4 py-4 rounded-lg">
        <h3 className="text-xl md:text-2xl font-bold mb-2">
          Customer Experiences
        </h3>
        <div className="md:max-w-[80vw] mx-auto px-4 py-2 mb-4 rounded-lg shadow-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchCustomerReviews();
              }
            }}
            placeholder="Search image..."
            className="w-1/2 border border-stone-300 rounded-md px-2 py-2"
          />
        </div>
        <div className="md: max-w-[80vw] mx-auto px-4 py-2 mb-4 rounded-lg shadow-sm">
          {isLoadingCustomerReviews ? (
            <Spinner />
          ) : (
            <Table
              data={customerReviewsData}
              defaultSortBy="created_at"
              perPage={10}
              listIconButton={[
                {
                  name: "delete",
                  value: true,
                  icon: <MdDelete />,
                  variant: "transRedText",
                  disabled: loggedInRoles !== "superadmin",
                  onClick: (row: CustomerReviewData) =>
                    handleGetTargetReview(row.token),
                },
              ]}
              customBooleanRender={{
                can_edit: (value) => (
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      value
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {value ? "Bisa Edit" : "Tidak Bisa"}
                  </span>
                ),
                can_delete: (value) => (
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      value
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {value ? "Bisa Hapus" : "Tidak Bisa"}
                  </span>
                ),
              }}
              customWidths={{
                id_review: "min-w-[14rem]",
                name: "min-w-[14rem]",
                path: "min-w-[10rem]",
                alt: "min-w-[10rem]",
                message: "min-w-[30rem]",
                instansi: "min-w-[12rem]",
                created_at: "min-w-[12rem]",
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
        content={`Apakah anda ingin menghapus review ${selectedReview?.name} - ${selectedReview?.instansi} : ${selectedReview?.message} ?`}
        button={() => handleDelete(selectedReview?.id, selectedReview?.token)}
      />
    </>
  );
}
