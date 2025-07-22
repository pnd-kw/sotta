"use client";

import CustomerExp from "./components/homepage/CustomerReview";
import ImageGallery from "./components/homepage/ImageGallery";
import Customers from "./components/homepage/Customers";
import Jumbotron from "./components/homepage/Jumbotron";
import Head from "next/head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contacts from "./components/homepage/Contacts";

export default function Home() {
  return (
    <>
      <Header />
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
        <ImageGallery />
        <CustomerExp />
        <Customers />
        <Contacts />
      </div>
      <Footer />
    </>
  );
}
