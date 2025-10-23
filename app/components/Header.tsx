
type Category = {
  id: number;
  name: string;
}
export default function Header({ categories = [] }: { categories: Category[] }) {
  return (
    <header className="fixed top-0 w-full bg-white z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <h1>Logo</h1>
        </div>
        <nav className="flex items-center space-x-6 text-sm md:text-base">
          <a
            href="#home"
            className="hover:text-white px-6 py-2 hover:bg-[#ba7b0b] rounded-full"
          >
            Home
          </a>

          <div className="relative group">
            <a
              href="#gallery"
              className="hover:text-white px-6 py-2 hover:bg-[#ba7b0b] rounded-full"
            >
              Products
            </a>

            <div className="absolute right-0 mt-2 w-max bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-x-1/4">
              <div className="flex space-x-6 px-6 py-4">
                {categories.map((item) => (
                  <a
                    key={item.id}
                    href="#"
                    className="whitespace-nowrap px-3 py-2 text-xs text-[#85582c] hover:bg-[#ba7b0b] hover:text-white rounded-full transition "
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

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
