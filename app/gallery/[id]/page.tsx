import GalleryDetail from "@/app/components/GalleryDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

type Props = {
  params: { id: string };
  searchParams?: { preview?: string };
};

export async function generateStaticParams() {
  return galleryImage
    .filter((img) => img.published)
    .map((img) => ({ id: img.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const image = galleryImage.find(
    (img) => img.id === params.id && img.published
  );
  if (!image) return {};

  const siteUrl = "https://example.com";

  return {
    title: image.name,
    description: image.caption,
    openGraph: {
      title: image.name,
      description: image.caption,
      images: [
        {
          url: `${siteUrl}${image.url}`,
          width: 800,
          height: 600,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: image.name,
      description: image.caption,
      images: [`${siteUrl}${image.url}`],
    },
  };
}

export default function GalleryDetailPage({ params, searchParams }: Props) {
  const allowPreview = searchParams?.preview?.toLowerCase() === "true";

  const image = galleryImage.find((img) =>
    allowPreview ? img.id === params.id : img.id === params.id && img.published
  );

  if (!image) return notFound();

  return (
    <>
      {/* {image && (
        <div className="bg-yellow-100 text-yellow-900 p-2 text-sm mb-4 rounded">
          Ini adalah tampilan <strong>preview</strong>
        </div>
      )} */}
      <GalleryDetail data={image} />
    </>
  );
}
