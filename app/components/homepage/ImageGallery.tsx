import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

export default function ImageGallery() {
  const [visibleImageGallery, setVisibleImageGallery] = useState(8);

  const handleLoadGallery = () => {
    setVisibleImageGallery((prev) => prev + 8);
  };

  const visibleImage = galleryImage.slice(0, visibleImageGallery);

  return (
    <div className="w-full bg-[#85582c]">
      <section id="gallery" className="text-center py-10">
        <div className="md:max-w-[80vw] mx-auto">
          <h3 className="text-xl md:text-2xl text-[#85582c] font-semibold mb-2 py-4 bg-white rounded-full w-28 md:w-32 mx-auto mb-6">
            Gallery
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 max-w-screen-xl mx-auto">
            {visibleImage.map((item) => (
              <div
                key={item.name}
                className="group relative aspect-square border border-white overflow-hidden"
              >
                <Image
                  src={item.path}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </div>
            ))}
          </div>
          <div className="w-full flex items-center justify-center text-center">
            <span className="py-4">
              <Button onClick={handleLoadGallery}>More</Button>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
