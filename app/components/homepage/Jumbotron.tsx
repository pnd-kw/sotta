"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Jumbotron() {
  const textRef = useRef<HTMLDivElement>(null);
  const banner1Ref = useRef<HTMLDivElement>(null);
  const banner2Ref = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const direction = currentScrollY > lastScrollY.current ? "down" : "up";

      if (textRef.current) {
        textRef.current.style.transform =
          direction === "down" ? "translateY(500px)" : "translateY(0px)";
        textRef.current.style.transition = "transform 1.5s ease";
      }

      if (banner1Ref.current) {
        banner1Ref.current.style.transform =
          direction === "down" ? "translateX(-500px)" : "translateX(0px)";
        banner1Ref.current.style.transition = "transform 1.5s ease";
      }

      if (banner2Ref.current) {
        banner2Ref.current.style.transform =
          direction === "down" ? "translateX(500px)" : "translateX(0px)";
        banner2Ref.current.style.transition = "transform 1.5s ease";
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative w-full h-[100vh] overflow-hidden">
      <div ref={banner1Ref} className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/sotta-banner-1.png"
          alt="Banner sotta 1"
          fill
          className="object-cover"
        />
      </div>
      <div ref={banner2Ref} className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/sotta-banner-2.png"
          alt="Banner sotta 2"
          fill
          className="object-cover"
        />
      </div>
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-start space-y-4"
        // bg-[linear-gradient(to_bottom,_rgba(255,255,255,0)_10%,_#ca8606_90%,_#ba7b0b_95%,_#996515_100%)]
      >
        <h1
          className="text-4xl md:text-6xl text-center text-stone-950 font-bold"
          // drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)]
        >
          Sotta Souvenir
        </h1>
        <h2
          className="text-md md:text-lg text-center text-[#ba7b0b] font-bold"
          // drop-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]
        >
          Pusat kerajinan souvenir logam yang berada di Yogyakarta
        </h2>
      </div>
    </section>
  );
}
