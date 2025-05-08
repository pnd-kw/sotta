import { useState } from "react";
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

type GalleryImage = {
  id: string;
  name: string;
  published: boolean;
  url: string;
  alt: string;
  caption: string;
  tags: string[];
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
};

const galleryImage: GalleryImage[] = [
  {
    id: "img_001",
    name: "tabernakel",
    published: false,
    url: "/assets/tabernakel.svg",
    alt: "Tabernakel",
    caption: "Tabernakel dari bahan kuningan",
    tags: ["tabernakel", "kuningan"],
    mimeType: "image/svg",
    size: 125034,
    createdAt: "2020-09-10T10:12:40.000456Z",
    updatedAt: "2020-09-10T10:12:40.000456Z",
  },
  {
    id: "img_002",
    name: "bejana kuningan",
    published: true,
    url: "/assets/bejana_kuningan.svg",
    alt: "Bejana kuningan",
    caption: "Bejana dari kuningan",
    tags: ["bejana", "kuningan"],
    mimeType: "image/svg",
    size: 98342,
    createdAt: "2021-02-10T10:12:40.000456Z",
    updatedAt: "2021-02-10T10:12:40.000456Z",
  },
  {
    id: "img_003",
    name: "plakat souvenir",
    published: true,
    url: "/assets/plakat_souvenir.svg",
    alt: "Plakat souvenir",
    caption: "Plakat untuk souvenir",
    tags: ["plakat", "souvenir"],
    mimeType: "image/svg",
    size: 85760,
    createdAt: "2023-04-10T10:12:40.000456Z",
    updatedAt: "2023-04-10T10:12:40.000456Z",
  },
  {
    id: "img_004",
    name: "kalung etnik",
    published: true,
    url: "/assets/kalung_etnik.svg",
    alt: "Kalung etnik",
    caption: "Kalung etnik dari kuningan",
    tags: ["kalung", "etnik", "kuningan"],
    mimeType: "image/svg",
    size: 90214,
    createdAt: "2024-02-10T10:12:40.000456Z",
    updatedAt: "2024-02-10T10:12:40.000456Z",
  },
  {
    id: "img_005",
    name: "lencana kerajaan",
    published: true,
    url: "/assets/lencana_kerajaan.svg",
    alt: "Lencana kerajaan",
    caption: "Lencana kerajaan kuno",
    tags: ["lencana", "kerajaan"],
    mimeType: "image/svg",
    size: 75900,
    createdAt: "2025-06-10T10:12:40.000456Z",
    updatedAt: "2025-06-10T10:12:40.000456Z",
  },
  {
    id: "img_006",
    name: "plakat ikan",
    published: true,
    url: "/assets/plakat_ikan.svg",
    alt: "Plakat ikan",
    caption: "Plakat ikan terbang",
    tags: ["plakat", "ikan"],
    mimeType: "image/svg",
    size: 80000,
    createdAt: "2019-01-10T10:12:40.000456Z",
    updatedAt: "2019-01-10T10:12:40.000456Z",
  },
  {
    id: "img_007",
    name: "taber",
    published: true,
    url: "/assets/tabernakel.svg",
    alt: "Taber",
    caption: "Taber kuningan",
    tags: ["taber", "kuningan"],
    mimeType: "image/svg",
    size: 50000,
    createdAt: "2018-02-10T10:12:40.000456Z",
    updatedAt: "2018-02-10T10:12:40.000456Z",
  },
  {
    id: "img_008",
    name: "bejana",
    published: true,
    url: "/assets/bejana_kuningan.svg",
    alt: "Bejana",
    caption: "Bejana kuning",
    tags: ["bejana", "kuning"],
    mimeType: "image/svg",
    size: 40000,
    createdAt: "2020-07-10T10:12:40.000456Z",
    updatedAt: "2020-07-10T10:12:40.000456Z",
  },
  {
    id: "img_009",
    name: "plakat",
    published: true,
    url: "/assets/plakat_souvenir.svg",
    alt: "Plakat",
    caption: "Plakat perak",
    tags: ["plakat", "perak"],
    mimeType: "image/svg",
    size: 60000,
    createdAt: "2023-05-10T10:12:40.000456Z",
    updatedAt: "2023-05-10T10:12:40.000456Z",
  },
  {
    id: "img_010",
    name: "kalung",
    published: true,
    url: "/assets/kalung_etnik.svg",
    alt: "Kalung",
    caption: "Kalung unik",
    tags: ["kalung", "unik"],
    mimeType: "image/svg",
    size: 70000,
    createdAt: "2024-02-10T10:12:40.000456Z",
    updatedAt: "2024-02-10T10:12:40.000456Z",
  },
  {
    id: "img_011",
    name: "lencana",
    published: true,
    url: "/assets/lencana_kerajaan.svg",
    alt: "Lencana",
    caption: "Lencana indah",
    tags: ["lencana", "indah"],
    mimeType: "image/svg",
    size: 90000,
    createdAt: "2024-08-10T10:12:40.000456Z",
    updatedAt: "2024-08-10T10:12:40.000456Z",
  },
  {
    id: "img_012",
    name: "ikan",
    published: true,
    url: "/assets/plakat_ikan.svg",
    alt: "Ikan",
    caption: "Ikan laut",
    tags: ["ikan", "laut"],
    mimeType: "image/svg",
    size: 98769,
    createdAt: "2019-07-10T10:12:40.000456Z",
    updatedAt: "2019-07-10T10:12:40.000456Z",
  },
];

export default function Gallery() {
  const [imagePerPage, setImagePerPage] = useState(8);
  const [imageGalleryPage, setImageGalleryPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const totalPages = Math.ceil(galleryImage.length / imagePerPage);

  const startIndex = imagePerPage * imageGalleryPage;
  const endIndex = startIndex + imagePerPage;
  const visibleImage = galleryImage.slice(startIndex, endIndex);

  return (
    <div className="w-full px-4 py-4 bg-white rounded-lg">
      <h3 className="text-xl md:text-2xl font-bold mb-2">Gallery</h3>
      <div className="md:max-w-[80vw] mx-auto px-4 mb-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between py-4">
          <input
            type="text"
            placeholder="Search image..."
            className="w-1/2 border border-stone-300 rounded-md px-2 py-2"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="green">
                <FaPlus /> Tambah
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <VisuallyHidden>
                <DialogTitle></DialogTitle>
              </VisuallyHidden>
              <VisuallyHidden>
                <DialogDescription>
                  Form untuk menambah gallery image
                </DialogDescription>
              </VisuallyHidden>

              <div className="flex items-center px-4 bg-[#996515] w-full h-[10vh] rounded-tl-md rounded-tr-md text-white font-semibold">
                Tambah Gallery
              </div>
              <GalleryForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="md:max-w-[80vw] mx-auto px-4 py-4 rounded-lg shadow-md">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 max-w-screen-xl mx-auto mb-4">
          {visibleImage.map((item) => (
            <div
              key={item.name}
              title={item.caption ?? item.alt}
              className="relative aspect-square border border-white overflow-hidden"
            >
              <Image
                src={item.url}
                alt={item.alt}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex justify-end py-2 px-2 space-x-2">
                {!item.published && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="green"
                        onClick={() => setSelectedImage(item)}
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
                          Dialog untuk preview image gallery halaman pengunjung
                        </DialogDescription>
                      </VisuallyHidden>

                      <div className="flex items-center space-x-4 px-4 bg-[#996515] w-full h-[10vh] rounded-tl-md rounded-tr-md text-white font-semibold">
                        <Button variant="green">Publish</Button>
                        <span>Preview </span>
                      </div>

                      {selectedImage && (
                        <div className="max-w-[80vw] mx-auto p-4">
                          <h1 className="text-2xl font-semibold mb-4 capitalize">
                            {selectedImage.name}
                          </h1>

                          <div className="flex gap-2">
                            <div className="relative w-full h-125 mb-4">
                              <Image
                                src={selectedImage.url}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain rounded"
                              />
                            </div>

                            <div className="flex flex-col">
                              <p className="text-gray-700 mb-2">
                                {selectedImage.caption}
                              </p>

                              <div className="mt-4">
                                <strong>Tag:</strong>{" "}
                                {selectedImage.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 mr-2 rounded-md"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                )}
                <Button variant="whiteAmberText">
                  <MdEdit />
                </Button>
                <Button variant="whiteRedText">
                  <MdDelete />
                </Button>
              </div>
              <div className={`absolute bottom-1 right-1 px-4 py-2 rounded-md text-xs ${item.published ? "bg-green-600 text-white" : "bg-gray-100"}`}>
                {item.published ? "Published" : "Draft"}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <RowsPerPageSelector
            value={imagePerPage}
            onChange={(val) => {
              setImagePerPage(val);
              setImageGalleryPage(0);
            }}
            total={galleryImage.length}
            options={[8, 16, 24]}
          />
          <Pagination
            page={imageGalleryPage + 1}
            totalPages={totalPages}
            onPageChange={(p) => setImageGalleryPage(p)}
          />
        </div>
      </div>
    </div>
  );
}
