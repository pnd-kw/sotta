import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top--0 w-full bg-white shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        <nav className="space-x-6 text-sm md:text-base">
          <Link href="#home" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="#produk" className="hover:text-blue-600">
            Produk
          </Link>
          <Link href="#hubungi" className="hover:text-blue-600">
            Hubungi Kami
          </Link>
        </nav>
      </div>
    </header>
  );
}
