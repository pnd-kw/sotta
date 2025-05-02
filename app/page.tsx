"use client";

// import Image from "next/image";
import CustomerExp from "./components/homepage/CustomerExp";
import ImageGallery from "./components/homepage/ImageGallery";
import Customers from "./components/homepage/Customers";
import Jumbotron from "./components/homepage/Jumbotron";
import Head from "next/head";

// const materialsImages = [
//   {
//     name: "Alumunium",
//     path: "/assets/metal-bar.svg",
//     alt: "Alumunium",
//   },
//   {
//     name: "Tembaga",
//     path: "/assets/copper-bar.svg",
//     alt: "Tembaga",
//   },
//   {
//     name: "Stainless steel",
//     path: "/assets/stainless-steel.svg",
//     alt: "Stainless steel",
//   },
// ];

export default function Home() {
  return (
    <>
      <Head>
        <title>Sotta Souvenir - Pusat Souvenir Logam Yogyakarta</title>
        <meta
          name="description"
          content="Sotta Souvenir adalah pusat kerajinan logam dan souvenir 
      yang berada di Yogyakarta, melayani pelanggan dari seluruh indonesia."
        />
        <meta property="og:title" content="Sotta Souvenir" />
        <meta
          property="og:description"
          content="Pusat kerajinan souvenir logam di Yogyakarta"
        />
        <meta property="og:image" content="/assets/og-image.jpg" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="flex flex-col items-center">
        <Jumbotron />
        {/* <section className="text-center py-10">
        <h3 className="text-xl md:text-2xl font-semibold mb-2 py-4">
          Our Materials
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {materialsImages.map((item) => (
            <div key={item.name} className="flex flex-col">
              <div className="relative mb-4 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-stone-200">
                <Image
                  src={item.path}
                  alt={item.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h4 className="text-xl">{item.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section> */}
        <ImageGallery />
        <CustomerExp />
        <Customers />
      </div>
    </>
  );
}
