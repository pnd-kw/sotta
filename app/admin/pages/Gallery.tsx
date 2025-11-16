import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdDelete, MdEdit, MdPreview } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Pagination from "@/utils/Pagination";
import RowsPerPageSelector from "@/utils/RowsPerPageSelector";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import GalleryForm from "../components/forms/GalleryForm";
import ImageAlertDialog, {
  ImageAlertDialogHandle,
} from "@/utils/ImageAlertDialog";
import BouncingImage from "@/utils/BouncingImage";
import { format } from "date-fns";
import { useAuthStore } from "@/store/authStore";
import { getGalleryImages } from "@/app/api/gallery/getGalleryImages";
import Spinner from "@/utils/Spinner";
import { getGalleryImagesById } from "@/app/api/gallery/getGalleryImageById";
import ToastWithProgress from "@/utils/ToastWithProgress";
import { updatePublishGalleryImage } from "@/app/api/gallery/updateGalleryImage";
import { deleteGalleryImage } from "@/app/api/gallery/deleteGalleryImage";
import { useGalleryStore } from "@/store/galleryStore";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageObject = {
  imageUrl: string;
  public_id: string;
  alt: string;
  mimeType: string;
  size: string;
};

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

type GalleryImage = {
  id: string;
  name: string;
  published: boolean;
  thumbnailUrl: string;
  images: ImageObject[];
  caption: string;
  tags: string[];
  categories: Category[];
  createdBy: string;
  updatedBy: string;
  created_at: string;
  updated_at: string;
};

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
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
  const [isLoadingGallery, setIsLoadingGallery] = useState<boolean>(false);
  const [imagePerPage, setImagePerPage] = useState(8);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { successApiResponse, setSuccessApiResponse } = useGalleryStore();
  const [isPublishDialogOpen, setIsPublishDialogOpen] =
    useState<boolean>(false);
  const [mainImage, setMainImage] = useState<ImageObject | null>(null);
  const user = useAuthStore((state) => state.user);
  const dialog = useRef<ImageAlertDialogHandle>(null);

  const fetchGallery = async (
    page = 1,
    per_page = imagePerPage,
    search = ""
  ) => {
    try {
      setIsLoadingGallery(true);
      const data = await getGalleryImages({
        page,
        per_page,
        search,
      });
      const mappedData = data.data.map(
        (item): GalleryImage => ({
          ...item,
          published: Boolean(item.published),
          images: item.images.map(
            (img): ImageObject => ({
              imageUrl: img.imageUrl,
              public_id: img.public_id,
              alt: img.alt,
              mimeType: img.mimeType,
              size: img.size.toString(),
            })
          ),
          categories: item.categories || [],
        })
      );
      setGalleryImages(mappedData);
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
      setIsLoadingGallery(false);
    }
  };

  useEffect(() => {
    fetchGallery(1, imagePerPage, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePerPage]);

  useEffect(() => {
    if (successApiResponse) {
      fetchGallery(1, imagePerPage, searchQuery);
      setSuccessApiResponse(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successApiResponse]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchGallery(1, imagePerPage, "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    const resetGalleryIfEmpty = async () => {
      if (searchQuery.trim() === "") {
        fetchGallery(1, imagePerPage, "");
      }
    };

    resetGalleryIfEmpty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  async function handleEdit(id_image: string) {
    try {
      const data = await getGalleryImagesById({ id: id_image });
      setSelectedImage({
        ...data,
        published: Boolean(data.published),
        images: data.images.map(
          (img): ImageObject => ({
            imageUrl: img.imageUrl,
            public_id: img.public_id,
            alt: img.alt,
            mimeType: img.mimeType,
            size: img.size.toString(),
          })
        ),
        categories: data.categories || [],
      });
      setIsFormDialogOpen(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to get gallery image by id", error);
      ToastWithProgress({
        title: "Gagal",
        description: "Gagal mendapatkan data image yang dipilih.",
        duration: 3000,
        type: "error",
      });
    }
  }

  async function handlePublish(id_image: string | undefined) {
    if (!id_image) {
      ToastWithProgress({
        title: "Gagal",
        description: "ID image tidak ditemukan",
        duration: 3000,
        type: "error",
      });
      return;
    }
    try {
      await updatePublishGalleryImage(
        { published: !selectedImage?.published, updatedBy: user?.name },
        { params: { id: id_image } }
      );
      ToastWithProgress({
        title: "Berhasil",
        description: "Image berhasil dipublikasikan",
        duration: 3000,
        type: "success",
      });
      setIsPublishDialogOpen(false);
      setSuccessApiResponse(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to update publish gallery image", error);
      ToastWithProgress({
        title: "Gagal",
        description: "Image gagal dipublikasikan",
        duration: 3000,
        type: "error",
      });
    }
  }

  function handleSearchGalleryImages() {
    fetchGallery(paginationInfo.current_page, imagePerPage, searchQuery);
  }

  async function handleGetTargetImage(id_image: string) {
    try {
      const data = await getGalleryImagesById({ id: id_image });
      setSelectedImage({
        ...data,
        published: Boolean(data.published),
        images: data.images.map(
          (img): ImageObject => ({
            imageUrl: img.imageUrl,
            public_id: img.public_id,
            alt: img.alt,
            mimeType: img.mimeType,
            size: img.size.toString(),
          })
        ),
        categories: data.categories || [],
      });
      dialog.current?.openDialog();
    } catch (error) {
      console.error("Failed to get target image by id", error);
      ToastWithProgress({
        title: "Gagal",
        description: "Gagal mendapatkan data image yang dipilih.",
        duration: 3000,
        type: "error",
      });
    }
  }

  async function handleDelete(id_image: string | undefined) {
    if (!id_image) {
      ToastWithProgress({
        title: "Gagal",
        description: "ID image tidak ditemukan",
        duration: 3000,
        type: "error",
      });
      return;
    }
    try {
      await deleteGalleryImage(id_image);
      ToastWithProgress({
        title: "Berhasil",
        description: `Berhasil menghapus data image ${id_image}`,
        duration: 3000,
        type: "success",
      });
      setSuccessApiResponse(true);
    } catch (error) {
      console.error("Failed to delete data image", error);
      ToastWithProgress({
        title: "Gagal",
        description: `Gagal menghapus data image ${id_image}`,
        duration: 3000,
        type: "error",
      });
    }
  }

  function handlePageChange(newPage: number) {
    fetchGallery(newPage, imagePerPage, searchQuery);
  }

  return (
    <>
      <div className="w-full px-4 py-4 bg-white rounded-lg">
        <h3 className="text-xl md:text-2xl font-bold mb-2 font-sans">
          Gallery
        </h3>
        <div className="md:max-w-[80vw] mx-auto px-4 mb-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between py-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchGalleryImages();
                }
              }}
              placeholder="Search image..."
              className="w-1/2 border border-stone-300 rounded-md px-2 py-2"
            />
            <Button
              variant="green"
              onClick={() => {
                setSelectedImage(null);
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
                  setSelectedImage(null);
                }
              }}
            >
              <DialogContent className="min-w-[60vw] max-h-[90vh] overflow-y-auto">
                <VisuallyHidden>
                  <DialogTitle></DialogTitle>
                </VisuallyHidden>
                <VisuallyHidden>
                  <DialogDescription>
                    Form untuk menambah gallery image
                  </DialogDescription>
                </VisuallyHidden>

                <div className="flex items-center px-4 bg-[#996515] w-full h-[10vh] rounded-tl-md rounded-tr-md text-white font-semibold">
                  {selectedImage ? "Edit Image" : "Tambah Image"}
                </div>
                <GalleryForm
                  imageId={selectedImage?.id}
                  // initialData={selectedImage}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="md:max-w-[80vw] mx-auto px-4 py-4 rounded-lg shadow-md">
          {isLoadingGallery ? (
            <Spinner />
          ) : galleryImages.length === 0 ? (
            <div className="w-full h-[50vh] flex items-center justify-center">
              <span className="text-xl text-stone-900">
                Data gallery images tidak ditemukan.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 max-w-screen-xl mx-auto mb-4">
              {galleryImages.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>
                      <p>
                        <strong>Dibuat:</strong>{" "}
                        {format(new Date(item.created_at), "dd MMMM yyyy")}
                      </p>
                      <p>
                        <strong>Diperbarui:</strong>{" "}
                        {format(new Date(item.updated_at), "dd MMMM yyyy")}
                      </p>
                      <p>
                        <strong>Dibuat oleh:</strong> {item.createdBy}
                      </p>
                      <p>
                        <strong>Diperbarui oleh:</strong> {item.updatedBy}
                      </p>
                    </CardDescription>
                    <CardAction>
                      <div className="absolute inset-0 flex justify-end py-2 px-2 space-x-2">
                        {!item.published && (
                          <Dialog
                            open={isPublishDialogOpen}
                            onOpenChange={setIsPublishDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="green"
                                onClick={() => {
                                  setSelectedImage(item);
                                  setMainImage(item.images[0]);
                                  setIsPublishDialogOpen(true);
                                }}
                              >
                                <MdPreview />
                              </Button>
                            </DialogTrigger>
                            <DialogContent fullscreen>
                              <VisuallyHidden>
                                <DialogTitle></DialogTitle>
                              </VisuallyHidden>
                              <VisuallyHidden>
                                <DialogDescription>
                                  Dialog untuk preview image gallery halaman
                                  pengunjung
                                </DialogDescription>
                              </VisuallyHidden>

                              <div className="flex items-center space-x-4 px-4 bg-[#996515] w-full h-[10vh] rounded-tl-md rounded-tr-md text-white font-semibold">
                                <Button
                                  variant="green"
                                  onClick={() => {
                                    if (selectedImage?.id) {
                                      handlePublish(selectedImage.id);
                                    }
                                  }}
                                >
                                  Publish
                                </Button>
                                <span>Preview</span>
                              </div>

                              {selectedImage && (
                                <div className="max-w-[80vw] mx-auto p-4">
                                  <h1 className="text-2xl font-semibold mb-4 capitalize font-mono">
                                    {selectedImage.name}
                                  </h1>

                                  <div className="relative w-full h-[60vh] bg-black/5 rounded-lg flex items-center justify-center overflow-hidden">
                                    {selectedImage.images.length > 1 && (
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          const currentIndex =
                                            selectedImage.images.findIndex(
                                              (x) =>
                                                x.imageUrl ===
                                                mainImage?.imageUrl
                                            );
                                          const prevIndex =
                                            currentIndex === 0
                                              ? selectedImage.images.length - 1
                                              : currentIndex - 1;
                                          setMainImage(
                                            selectedImage.images[prevIndex]
                                          );
                                        }}
                                        className="absolute left-3 p-2 bg-white/70 rounded-full shadow hover:bg-white"
                                      >
                                        <ChevronLeft size={28} />
                                      </Button>
                                    )}

                                    <div className="relative w-full h-full">
                                      <Image
                                        src={mainImage?.imageUrl ?? ""}
                                        alt={mainImage?.alt ?? "image"}
                                        fill
                                        className="object-contain rounded"
                                      />
                                    </div>

                                    {selectedImage.images.length > 1 && (
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          const currentIndex =
                                            selectedImage.images.findIndex(
                                              (x) =>
                                                x.imageUrl ===
                                                mainImage?.imageUrl
                                            );
                                          const nextIndex =
                                            currentIndex ===
                                            selectedImage.images.length - 1
                                              ? 0
                                              : currentIndex + 1;

                                          setMainImage(
                                            selectedImage.images[nextIndex]
                                          );
                                        }}
                                        className="absolute right-3 p-2 bg-white/70 rounded-full shadow hover:bg-white"
                                      >
                                        <ChevronRight size={28} />
                                      </Button>
                                    )}
                                  </div>

                                  <div className="flex justify-center gap-3 mt-4">
                                    {selectedImage.images.map((img, index) => (
                                      <Button
                                        type="button"
                                        key={index}
                                        onClick={() => setMainImage(img)}
                                        className={`border-2 rounded-md p-1 ${
                                          mainImage?.imageUrl === img.imageUrl
                                            ? "border-blue-500"
                                            : "border-transparent"
                                        }`}
                                      >
                                        <Image
                                          src={img.imageUrl}
                                          alt={img.alt}
                                          width={90}
                                          height={90}
                                          className="object-cover rounded"
                                        />
                                      </Button>
                                    ))}
                                  </div>

                                  <div className="mt-6">
                                    <p className="text-gray-700 mb-3">
                                      {selectedImage.caption}
                                    </p>
                                    <strong>Tag:</strong>{" "}
                                    {selectedImage?.tags?.map((tag) => (
                                      <span
                                        key={tag}
                                        className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 mr-2 rounded-md"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>

                                  {/* <div className="flex gap-2">
                                    <div className="relative w-full h-125 mb-4">
                                      {mainImage && mainImage.imageUrl ? (
                                        <>
                                          <Image
                                            src={mainImage.imageUrl}
                                            alt={mainImage.alt}
                                            fill
                                            className="object-contain rounded"
                                          />
                                          <div className="flex mt-4 space-x-2">
                                            {selectedImage.images.map(
                                              (img, index) => (
                                                <div
                                                  key={index}
                                                  className="cursor-pointer"
                                                  onClick={() =>
                                                    setMainImage(img)
                                                  }
                                                >
                                                  <Image
                                                    src={img.imageUrl}
                                                    alt={img.alt}
                                                    width={100}
                                                    height={100}
                                                    className="object-cover"
                                                  />
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </>
                                      ) : (
                                        <div>Failed to load image.</div>
                                      )}
                                    </div>

                                    <div className="flex flex-col">
                                      <p className="text-gray-700 mb-2">
                                        {selectedImage.caption}
                                      </p>

                                      <div className="mt-4">
                                        <strong>Tag:</strong>{" "}
                                        {selectedImage?.tags?.map((tag) => (
                                          <span
                                            key={tag}
                                            className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 mr-2 rounded-md"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div> */}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        )}
                        <Button
                          variant="whiteAmberText"
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                        >
                          <MdEdit />
                        </Button>
                        <Button
                          variant="whiteRedText"
                          disabled={user?.role_name !== "superadmin"}
                          onClick={() => handleGetTargetImage(item.id)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </CardAction>
                    <CardContent>
                      <Image
                        src={item.thumbnailUrl}
                        alt={item.images[0].alt}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                      />

                      <div
                        className={`absolute bottom-1 right-1 px-4 py-2 rounded-md text-xs font-bold ${
                          item.published
                            ? "bg-green-600 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {item.published ? "Published" : "Draft"}
                      </div>
                    </CardContent>
                  </CardHeader>
                  {/* <div
                  key={item.id}
                  title={item.caption ?? item.alt}
                  className="relative aspect-square border border-white overflow-hidden group"
                > */}
                  {/* <div className="absolute inset-0 w-[300px] h-[300px] flex items-center px-4 bg-black/20 opacity-0 group-hover:opacity-100  transition-opacity duration-300">
                    <div className="text-sm text-white mb-4">
                      <p>
                        <strong>Ukuran:</strong> {(item.size / 1024).toFixed(2)}{" "}
                        KB
                      </p>
                      <p>
                        <strong>Tipe:</strong> {item.mimeType}
                      </p>
                      <p>
                        <strong>Dibuat:</strong>{" "}
                        {format(new Date(item.created_at), "dd MMMM yyyy")}
                      </p>
                      <p>
                        <strong>Diperbarui:</strong>{" "}
                        {format(new Date(item.updated_at), "dd MMMM yyyy")}
                      </p>
                      <p>
                        <strong>Dibuat oleh:</strong> {item.createdBy}
                      </p>
                      <p>
                        <strong>Diperbarui oleh:</strong> {item.updatedBy}
                      </p>
                    </div>
                  </div> */}

                  {/* </div> */}
                </Card>
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <RowsPerPageSelector
              value={imagePerPage}
              onChange={(val) => {
                setImagePerPage(val);
              }}
              total={paginationInfo.total}
              options={[8, 16, 24]}
            />
            <Pagination
              page={paginationInfo.current_page}
              totalPages={paginationInfo.last_page}
              onPageChange={(p) => handlePageChange(p)}
            />
          </div>
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
        content={`Apakah anda ingin menghapus image ${selectedImage?.id} ${selectedImage?.name} ?`}
        button={() => handleDelete(selectedImage?.id)}
      />
    </>
  );
}
