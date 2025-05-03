import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

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

  const handleLoadGallery = () => {
    setVisibleImageGallery((prev) => prev + 8);
  };

  const visibleImage = galleryImage.slice(0, visibleImageGallery);

  return (
    <div className="w-full bg-white">
      <div className="md:max-w-[80vw] mx-auto">
        <h3 className="text-xl md:text-2xl font-bold mb-2">Gallery</h3>
        <div className="flex items-center justify-between py-4">
          <input
            type="text"
            placeholder="Search image..."
            className="w-1/2 border border-stone-300 rounded-md px-2 py-2"
          />
          <Button variant="green">
            <FaPlus /> Tambah
          </Button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 max-w-screen-xl mx-auto">
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
      </div>
    </div>
  );
}
