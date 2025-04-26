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

export default function Home() {
  const firstRow = imageLogo.slice(0, 6);
  const secondRowLength = imageLogo.length - firstRow.length;
  
  return (
    <div className="flex flex-col items-center px-4 py-10 space-y-10">
      <section className="text-center space-y-2">
        <h1 className="text-4xl md:text-6xl font-bold mb-2">
          Selamat Datang di Sotta Souvenir
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          Pusat kerajinan souvenir logam yang berada di Yogyakarta
        </h2>
      </section>
      <section className="text-center">
        <h3 className="text-lg md:text-xl font-semibold mb-2">Klien Kami</h3>
        <div
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        xl:grid-cols-6 gap-6 justify-items-center px-4"
        >
          {imageLogo.map((item) => (
            <div
              key={item.name}
              className="relative w-[12vw] max-w-[20vw] h-[12vh] max-h-[20vh]"
            >
              <Image
                src={item.path}
                alt={item.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
          {/* <div className="relative w-[12vw] max-w-[20vw] h-[12vh] max-h-[20vh]">
            <Image
              src="/assets/ugm_logo.svg"
              alt="UGM logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-[12vw] max-w-[20vw] h-[12vh] max-h-[20vh]">
            <Image
              src="/assets/pertamina_logo.svg"
              alt="Pertamina logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-[12vw] max-w-[20vw] h-[12vh] max-h-[20vh]">
            <Image
              src="/assets/pupuk_kaltim_logo.svg"
              alt="Pupuk kaltim logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-[12vw] max-w-[20vw] h-[12vh] max-h-[20vh]">
            <Image
              src="/assets/uny_logo.svg"
              alt="UNY logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-[12vw] max-w-[20vw] h-[12vh] max-h-[20vh]">
            <Image
              src="/assets/uad_logo.svg"
              alt="UAD logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-[12vw] max-w-[20vw] h-[12vh] max-h-[20vh]">
            <Image
              src="/assets/uii_logo.svg"
              alt="UII logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-[12vw] max-w-[20vw] h-[12vh] max-h-[20vh]">
            <Image
              src="/assets/unnes_logo.svg"
              alt="Unnes logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-[12vw] max-w-[20vw] h-[12vh] max-h-[20vh]">
            <Image
              src="/assets/unipin_logo.svg"
              alt="Unipin logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-[12vw] max-w-[20vw] h-[12vh] max-h-[20vh]">
            <Image
              src="/assets/mlbb_logo.svg"
              alt="Mobile legends logo"
              fill
              className="object-contain"
            />
          </div> */}
        </div>
      </section>
    </div>
  );
}
