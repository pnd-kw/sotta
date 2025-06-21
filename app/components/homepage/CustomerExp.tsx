import { useEffect, useState } from "react";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToastWithProgress from "@/utils/ToastWithProgress";
import { createCustomerReview } from "@/app/api/customer_review/createCustomerReview";
import { v4 as uuidv4 } from "uuid";
import { getCustomerReviews } from "@/app/api/customer_review/getCustomerReviews";

// interface CustomerReview {
//   name: string;
//   path: string;
//   alt: string;
//   message: string;
//   instansi: string;
// }

type CustomerReviewData = {
  id: string;
  name: string;
  message: string;
  instansi?: string | null;
  gender: string;
  avatar?: string | null;
  can_edit: boolean;
  can_delete: boolean;
  created_at: string;
};

const MAX_AVATAR_SIZE = 1 * 1024 * 1024;
const MAX_AVATAR_WIDTH = 300;
const MAX_AVATAR_HEIGHT = 300;

const custReviewSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  instansi: z.string().optional(),
  message: z.string().min(1, "Message tidak boleh kosong"),
  gender: z.enum(["laki-laki", "perempuan"], {
    required_error: "Jenis kelamin wajib dipilih",
  }),
  avatar: z
    .any()
    .optional()
    .refine(
      (file) => !file?.length || file?.[0]?.type?.startsWith("image/"),
      "File harus berupa gambar"
    )
    .refine(
      (file) => !file?.length || file?.[0]?.size <= MAX_AVATAR_SIZE,
      "Ukuran avatar maksimal 1MB"
    ),
});

async function validateAvatarResolution(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      const img: HTMLImageElement = new Image();
      img.onload = () => {
        if (img.width > MAX_AVATAR_WIDTH || img.height > MAX_AVATAR_HEIGHT) {
          resolve(
            `Resolusi avatar maksimal ${MAX_AVATAR_WIDTH}x${MAX_AVATAR_HEIGHT}px`
          );
        } else {
          resolve(null);
        }
      };
      img.onerror = () => resolve("Gagal membaca gambar.");
      img.src = reader.result as string;
    };
    reader.onerror = () => resolve("Gagal membaca file.");
    reader.readAsDataURL(file);
  });
}

type CustomerReviewForm = z.infer<typeof custReviewSchema>;

export default function CustomerReview() {
  const [visibleCustomerReview, setVisibleCustomerReview] = useState(3);
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
  const [selectedReview, setSelectedReview] =
    useState<CustomerReviewData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});

  console.log(customerReviewsData);
  
  const fetchCustomerReview = async (page = 1, per_page = 4, search = "") => {
    try {
      setIsLoadingCustomerReviews(true);
      const data = await getCustomerReviews({
        page,
        per_page,
        search,
      });
      console.log("data", data);
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
      searchQuery
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerReviewsPerPage, searchQuery]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerReviewForm>({
    resolver: zodResolver(custReviewSchema),
    defaultValues: {
      gender: "laki-laki",
    },
  });

  const onSubmit = async (data: CustomerReviewForm) => {
    let avatarFile = data.avatar?.[0];

    if (avatarFile) {
      const resolutionError = await validateAvatarResolution(avatarFile);
      if (resolutionError) {
        alert(resolutionError);
        return;
      }
    }

    const mappedGender = data.gender === "laki-laki" ? "male" : "female";

    let token = localStorage.getItem("customer_review_token");
    if (!token) {
      token = uuidv4();
      localStorage.setItem("customer_review_token", token);
    }

    const basePayload = {
      name: data.name,
      message: data.message,
      instansi: data.instansi,
      gender: mappedGender,
      token,
    };

    try {
      if (selectedReview && token) {
        // await updateReview(basePayload, { params: { id: id } });
        ToastWithProgress({
          title: "Berhasil",
          description: "Data review berhasil diperbarui.",
          duration: 3000,
          type: "success",
        });
      } else {
        await createCustomerReview(basePayload);
        ToastWithProgress({
          title: "Berhasil",
          description: "Data review berhasil disimpan.",
          duration: 3000,
          type: "success",
        });
        reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      ToastWithProgress({
        title: "Gagal",
        description: selectedReview
          ? "Gagal memperbarui data review."
          : "Gagal memyimpan data review.",
        duration: 3000,
        type: "error",
      });
    }
  };

  const groupCustomerReview = (
    reviews: CustomerReviewData[],
    groupSize: number
  ) => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return [];
    }

    if (groupSize <= 0) {
      throw new Error("Group size must be greater than 0");
    }

    const groups: CustomerReviewData[][] = [];
    for (let i = 0; i < reviews.length; i += groupSize) {
      groups.push(reviews.slice(i, i + groupSize));
    }

    return groups;
  };

  const groupedCustomerReview = groupCustomerReview(customerReviewsData, 2);
  const visibleGroupedCustomerReview = groupedCustomerReview.slice(
    0,
    visibleCustomerReview
  );

  const handleLoadCustomerReview = () => {
    setVisibleCustomerReview((prev) => prev + 3);
  };

  const toggleExpand = (name: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <section id="customer exp" className="text-center py-10 w-full">
      <h3 className="text-xl md:text-2xl text-[#85582c] font-semibold mb-2 py-4">
        Customers Experience
      </h3>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-screen-xl mx-auto px-4">
        <div className="w-full md:w-1/3 bg-stone-200 shadow-xl rounded-lg p-6">
          <h4 className="text-lg pb-4">Write your experience</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder="Nama"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="px-2 pt-2 text-red-500 text-xs text-left">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="gender"
                className="text-sm font-medium text-stone-900"
              >
                Jenis Kelamin
              </label>
              <select
                {...register("gender")}
                defaultValue="laki-laki"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <Input placeholder="Instansi" {...register("instansi")} />
            </div>
            <div>
              <Input
                textarea
                placeholder="Message"
                maxLength={150}
                {...register("message")}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="px-2 pt-2 text-red-500 text-xs text-left">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button variant="full">Send</Button>
          </form>
        </div>
        <div className="w-full md:w-2/3">
          <div className="overflow-hidden h-[50vh] relative">
            <div className="flex flex-col overflow-auto h-[50vh]">
              {visibleGroupedCustomerReview.map((group, groupIndex) => (
                <div key={groupIndex} className="py-2 h-full w-full px-4">
                  <div className="flex justify-between gap-6">
                    {group.map((item: CustomerReviewData) => (
                      <div
                        key={item.name}
                        className="flex flex-col md:flex-row items-start bg-white shadow-xl rounded-md p-4 
                      text-left min-h-[4rem] w-full transition-transform duration-300 hover:scale-105"
                      >
                        <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full bg-stone-200">
                          {/* <Image
                            src={item.path}
                            alt={item.alt}
                            fill
                            className="object-cover"
                          /> */}
                        </div>
                        <div className="flex flex-col px-2 py-2 items-start text-justify">
                          <div className="text-left text-sm font-semibold">
                            {item.name} - {item.instansi}
                          </div>
                          <div
                            className={`text-[0.7rem] max-w-[8rem] min-h-[4rem] ${
                              !isExpanded[item.name] ? "truncate" : ""
                            }`}
                          >
                            &quot;
                            {item.message.length > 150
                              ? item.message.slice(0, 150)
                              : item.message}
                            &quot;
                          </div>
                          {item.message.length > 40 && (
                            <Button
                              onClick={() => toggleExpand(item.name)}
                              className="text-xs mt-1"
                            >
                              {isExpanded[item.name]
                                ? "Sembunyikan"
                                : "Lihat lebih"}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <Button onClick={handleLoadCustomerReview}>More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
