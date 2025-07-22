export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <h1>Logo</h1>
        </div>
        <nav className="space-x-6 text-sm md:text-base">
          <a
            href="#home"
            className="hover:text-white px-6 py-2 hover:bg-[#ba7b0b] rounded-full"
          >
            Home
          </a>
          <a
            href="#gallery"
            className="hover:text-white px-6 py-2 hover:bg-[#ba7b0b] rounded-full"
          >
            Products
          </a>
          <a
            href="#customers"
            className="hover:text-white px-6 py-2 hover:bg-[#ba7b0b] rounded-full"
          >
            Customers
          </a>
          <a
            href="#contacts"
            className="hover:text-white px-6 py-2 hover:bg-[#ba7b0b] rounded-full"
          >
            Contacts
          </a>
        </nav>
      </div>
    </header>
  );
}
