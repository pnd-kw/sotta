import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Pagination from "@/utils/Pagination";
import RowsPerPageSelector from "@/utils/RowsPerPageSelector";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import GalleryForm from "../components/forms/GalleryForm";

const galleryImage = [
  {
    name: "tabernakel",
    path: "/assets/tabernakel.svg",
    alt: "Tabernakel",
  },
  {
    name: "bejana kuningan",
    path: "/assets/bejana_kuningan.svg",
    alt: "Bejana kuningan",
  },
  {
    name: "plakat souvenir",
    path: "/assets/plakat_souvenir.svg",
    alt: "Plakat souvenir",
  },
  {
    name: "kalung etnik",
    path: "/assets/kalung_etnik.svg",
    alt: "Kalung etnik",
  },
  {
    name: "lencana kerajaan",
    path: "/assets/lencana_kerajaan.svg",
    alt: "Lencana kerajaan",
  },
  {
    name: "plakat ikan",
    path: "/assets/plakat_ikan.svg",
    alt: "Plakat ikan",
  },
  {
    name: "taber",
    path: "/assets/tabernakel.svg",
    alt: "Taber",
  },
  {
    name: "bejana",
    path: "/assets/bejana_kuningan.svg",
    alt: "Bejana",
  },
  {
    name: "plakat",
    path: "/assets/plakat_souvenir.svg",
    alt: "Plakat",
  },
  {
    name: "kalung",
    path: "/assets/kalung_etnik.svg",
    alt: "Kalung",
  },
  {
    name: "lencana",
    path: "/assets/lencana_kerajaan.svg",
    alt: "Lencana",
  },
  {
    name: "ikan",
    path: "/assets/plakat_ikan.svg",
    alt: "Ikan",
  },
];

export default function Gallery() {
  const [visibleImageGallery, setVisibleImageGallery] = useState(8);
  // const [imageGalleryPerPage, setImageGalleryPerPage] = useState();
  const [galleryPage, setGalleryPage] = useState(0);

  // const handleLoadGallery = () => {
  //   setVisibleImageGallery((prev) => prev + 8);
  // };

  const visibleImage = galleryImage.slice(0, visibleImageGallery);

  // const visible = (data: galleryImage) => {

  // }

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
          {/* <Button variant="green">
            <FaPlus /> Tambah
          </Button> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="green"><FaPlus/> Tambah</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <VisuallyHidden>
                <DialogTitle></DialogTitle>
              </VisuallyHidden>
              <VisuallyHidden>
                <DialogDescription>Form untuk menambah gallery image</DialogDescription>
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
              className="relative aspect-square border border-white overflow-hidden"
            >
              <Image
                src={item.path}
                alt={item.alt}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex justify-end py-2 px-2 space-x-2">
                <Button variant="whiteAmberText">
                  <MdEdit />
                </Button>
                <Button variant="whiteRedText">
                  <MdDelete />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="w-full flex items-center justify-center text-center">
          <span className="py-4">
            <Button onClick={handleLoadGallery}>More</Button>
          </span>
        </div> */}
        <div className="flex justify-between">
          <RowsPerPageSelector
            value={visibleImageGallery}
            onChange={(val) => setVisibleImageGallery(val)}
            total={galleryImage.length}
            options={[8, 16, 24]}
          />
          <Pagination
            page={galleryPage + 1}
            totalPages={2}
            onPageChange={(p) => setGalleryPage(p)}
          />
        </div>
      </div>
    </div>
  );
}
