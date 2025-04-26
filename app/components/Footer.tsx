export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Logo</h3>
          <p>
            Bumen No.536, RT.26/RW.06, Purbayan, Kotagede, Yogyakarta City,
            Special Region of Yogyakarta 55173
          </p>
          <p>08175457300</p>
          <p>sottaart@gmail.com</p>
        </div>
        <div>
            <h3 className="text-xl font-semibold mb-2">Ikuti Kami</h3>
            <ul className="space-y-1">
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Youtube</a></li>
            </ul>
        </div>
      </div>
    </footer>
  );
}
