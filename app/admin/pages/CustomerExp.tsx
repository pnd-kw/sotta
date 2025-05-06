import { Table } from "@/utils/Table";
import { MdDelete } from "react-icons/md";

const customerExp = [
  {
    name: "Budi",
    path: "/assets/avatar-1.svg",
    alt: "Avatar 1",
    message:
      "Pekerjaan nya bagus dan rapi, woooooow, jooooooooooooooooos, pokoknya weelllllllllllllllllllll, memuaskan pokoknya, sesuai ekspektasi",
    instansi: "UGM",
    created_at: "2021-03-10T10:18:40.000456Z",
  },
  {
    name: "Joko",
    path: "/assets/avatar-2.svg",
    alt: "Avatar 2",
    message: "Mantap pokok nya!!!",
    instansi: "UNY",
    created_at: "2022-04-10T10:18:40.000456Z",
  },
  {
    name: "Agus",
    path: "/assets/avatar-3.svg",
    alt: "Avatar 3",
    message:
      "Terpercaya, hasil maksimal, mantap pokoknya, josss super, bersih, pokoknya terbaik bagus banget harus cobain gak usah ragu langsung datang ke sotta souvenir",
    instansi: "Pupuk Kaltim",
    created_at: "2019-07-10T10:18:40.000456Z",
  },
  {
    name: "Ari",
    path: "/assets/avatar-4.svg",
    alt: "Avatar 4",
    message: "Keren pokoknya!!!",
    instansi: "Unnes",
    created_at: "2023-01-10T10:18:20.000456Z",
  },
  {
    name: "Adi",
    path: "/assets/avatar-5.svg",
    alt: "Avatar 5",
    message: "Hasil tidak mengecewakan",
    instansi: "Moonton Mobile Legend",
    created_at: "2024-06-10T10:14:40.000456Z",
  },
  {
    name: "Doni",
    path: "/assets/avatar-6.svg",
    alt: "Avatar 6",
    message: "Bakal order disini lagi",
    instansi: "UII",
    created_at: "2022-08-10T10:15:40.000456Z",
  },
  {
    name: "Dodi",
    path: "/assets/avatar-7.svg",
    alt: "Avatar 7",
    message: "Kerjaan rapi, sesuai ekspektasi",
    instansi: "UniPin",
    created_at: "2020-05-10T10:18:40.000456Z",
  },
  {
    name: "Joni",
    path: "/assets/avatar-1.svg",
    alt: "Avatar 8",
    message: "Wow bagus sekali",
    instansi: "UGM",
    created_at: "2023-05-10T10:18:10.000456Z",
  },
  {
    name: "Yuli",
    path: "/assets/avatar-5.svg",
    alt: "Avatar 9",
    message: "Hasil mantap",
    instansi: "UNY",
    created_at: "2018-03-10T10:18:40.000456Z",
  },
  {
    name: "Rini",
    path: "/assets/avatar-6.svg",
    alt: "Avatar 10",
    message: "Rekomended!!!",
    instansi: "Pertamina",
    created_at: "2018-08-10T10:18:40.000456Z",
  },
  {
    name: "Susi",
    path: "/assets/avatar-7.svg",
    alt: "Avatar 11",
    message: "Keren gak nyangka",
    instansi: "",
    created_at: "2017-02-10T10:18:40.000456Z",
  },
  {
    name: "Rufi",
    path: "/assets/avatar-1.svg",
    alt: "Avatar 12",
    message: "Joooooooossssssssssssssss",
    instansi: "UAD",
    created_at: "2018-09-10T10:12:40.000456Z",
  },
  {
    name: "Anang",
    path: "/assets/avatar-1.svg",
    alt: "Avatar 1",
    message: "Pekerjaan nya bagus dan rapi",
    instansi: "UGM",
    created_at: "2025-02-10T10:14:40.000456Z",
  },
  {
    name: "Agnes",
    path: "/assets/avatar-2.svg",
    alt: "Avatar 2",
    message: "Luar biasssaaaaa!!!",
    instansi: "UNY",
    created_at: "2024-04-10T10:19:40.000456Z",
  },
  {
    name: "Mita",
    path: "/assets/avatar-3.svg",
    alt: "Avatar 3",
    message:
      "Pokoknya terbaik bagus banget harus cobain gak usah ragu langsung datang ke sotta souvenir",
    instansi: "Pupuk Kaltim",
    created_at: "2018-07-10T10:14:40.000456Z",
  },
  {
    name: "Arif",
    path: "/assets/avatar-4.svg",
    alt: "Avatar 4",
    message: "Mantuuuuulllllllllllll",
    instansi: "Unnes",
    created_at: "2017-01-10T10:12:20.000456Z",
  },
  {
    name: "Dian",
    path: "/assets/avatar-5.svg",
    alt: "Avatar 5",
    message: "Okeeee punyaaaaaa",
    instansi: "Moonton Mobile Legend",
    created_at: "2020-06-10T10:11:40.000456Z",
  },
  {
    name: "Lala",
    path: "/assets/avatar-6.svg",
    alt: "Avatar 6",
    message: "Muantaaaaapuuuuuu",
    instansi: "UII",
    created_at: "2021-02-10T10:15:40.000456Z",
  },
  {
    name: "Lili",
    path: "/assets/avatar-7.svg",
    alt: "Avatar 7",
    message: "Sangat berlebihan",
    instansi: "UniPin",
    created_at: "2020-11-10T10:13:40.000456Z",
  },
  {
    name: "Aldo",
    path: "/assets/avatar-1.svg",
    alt: "Avatar 1",
    message: "Pokoke harus coba",
    instansi: "UGM",
    created_at: "2022-04-10T10:18:10.000456Z",
  },
  {
    name: "Tommy",
    path: "/assets/avatar-5.svg",
    alt: "Avatar 5",
    message: "Hasil tidak mengecewakan",
    instansi: "UNY",
    created_at: "2024-06-10T10:16:40.000456Z",
  },
  {
    name: "Boby",
    path: "/assets/avatar-6.svg",
    alt: "Avatar 6",
    message: "Wululululu",
    instansi: "Pertamina",
    created_at: "2019-03-10T10:18:50.000456Z",
  },
  {
    name: "Cici",
    path: "/assets/avatar-11.svg",
    alt: "Avatar 11",
    message: "Keren bingiiiitssss",
    instansi: "",
    created_at: "2023-02-10T10:17:40.000456Z",
  },
  {
    name: "Endah",
    path: "/assets/avatar-4.svg",
    alt: "Avatar 4",
    message: "Uhuuuyyyyyyyyyyyyyyy",
    instansi: "",
    created_at: "2020-09-10T10:12:40.000456Z",
  },
];

export default function CustomerExp() {
  function handleDelete() {
    console.log("delete row");
  }
  return (
    <div className="w-full bg-white px-4 py-4 rounded-lg">
      <h3 className="text-xl md:text-2xl font-bold mb-2">
        Customer Experiences
      </h3>
      <div className="md:max-w-[80vw] mx-auto px-4 py-2 mb-4 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 border border-stone-300 rounded-md px-2 py-2"
        />
      </div>
      <div className="md: max-w-[80vw] mx-auto px-4 py-2 mb-4 rounded-lg shadow-sm">
        <Table
          data={customerExp}
          defaultSortBy="created_at"
          perPage={10}
          listIconButton={[
            {
              name: "delete",
              value: true,
              icon: <MdDelete />,
              variant: "transRedText",
              onClick: handleDelete,
            },
          ]}
          customWidths={{
            name: "min-w-[14rem]",
            path: "min-w-[10rem]",
            alt: "min-w-[10rem]",
            message: "min-w-[30rem]",
            instansi: "min-w-[12rem]",
            created_at: "min-w-[12rem]",
          }}
        />
      </div>
    </div>
  );
}
