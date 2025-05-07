import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const galleryImage = [
  {
    id: "img_001",
    name: "tabernakel",
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
              <Link key={item.id} href={`/gallery/${item.id}`}>
                <div
                  // key={item.name}
                  className="group relative aspect-square border border-white overflow-hidden"
                >
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                    <h3 className="h-full flex items-center justify-center text-xl font-bold text-white capitalize text-center px-2">
                      {item.name.toLowerCase()}
                    </h3>
                  </div>
                </div>
              </Link>
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
