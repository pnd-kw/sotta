import Image from "next/image";

const imageLogo = [
  {
    name: "ugm",
    path: "/assets/ugm_logo.svg",
    alt: "UGM logo",
  },
  {
    name: "pertamina",
    path: "/assets/pertamina_logo.svg",
    alt: "Pertamina logo",
  },
  {
    name: "pupuk kaltim",
    path: "/assets/pupuk_kaltim_logo.svg",
    alt: "Pupuk kaltim logo",
  },
  {
    name: "uny",
    path: "/assets/uny_logo.svg",
    alt: "UNY logo",
  },
  {
    name: "uad",
    path: "/assets/uad_logo.svg",
    alt: "UAD logo",
  },
  {
    name: "uii",
    path: "/assets/uii_logo.svg",
    alt: "UII logo",
  },
  {
    name: "unnes",
    path: "/assets/unnes_logo.svg",
    alt: "Unnes logo",
  },
  {
    name: "unipin",
    path: "/assets/unipin_logo.svg",
    alt: "Unipin logo",
  },
  {
    name: "mlbb",
    path: "/assets/mlbb_logo.svg",
    alt: "Mlbb logo",
  },
];

export default function Customers() {
  return (
    <div className="w-full bg-white">
      <section id="customers" className="text-center py-10">
        <h3 className="text-xl md:text-2xl font-semibold mb-2 py-4 text-[#85582c] bg-white rounded-full w-62 mx-auto">
          Our Customers
        </h3>
        <div className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/assets/peta-indonesia.png"
            alt="Peta indonesia"
            fill
            className="flex object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 min-h-[40vh] w-[75vw] mx-auto">
          {imageLogo.map((item) => (
            <div
              key={item.name}
              className="relative w-24 h-16 sm:w-28 sm:h-20 md:w-[10vw] md:h-[10vh]"
            >
              <Image
                src={item.path}
                alt={item.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
