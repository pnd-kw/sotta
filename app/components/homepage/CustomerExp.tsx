import { useState } from "react";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface CustomerExperience {
  name: string;
  path: string;
  alt: string;
  message: string;
  instansi: string;
}

const customerExp: CustomerExperience[] = [
  {
    name: "Budi",
    path: "/assets/avatar-1.svg",
    alt: "Avatar 1",
    message:
      "Pekerjaan nya bagus dan rapi, woooooow, jooooooooooooooooos, pokoknya weelllllllllllllllllllll, memuaskan pokoknya, sesuai ekspektasi",
    instansi: "UGM",
  },
  {
    name: "Joko",
    path: "/assets/avatar-2.svg",
    alt: "Avatar 2",
    message: "Mantap pokok nya!!!",
    instansi: "UNY",
  },
  {
    name: "Agus",
    path: "/assets/avatar-3.svg",
    alt: "Avatar 3",
    message:
      "Terpercaya, hasil maksimal, mantap pokoknya, josss super, bersih, pokoknya terbaik bagus banget harus cobain gak usah ragu langsung datang ke sotta souvenir",
    instansi: "Pupuk Kaltim",
  },
  {
    name: "Ari",
    path: "/assets/avatar-4.svg",
    alt: "Avatar 4",
    message: "Keren pokoknya!!!",
    instansi: "Unnes",
  },
  {
    name: "Adi",
    path: "/assets/avatar-5.svg",
    alt: "Avatar 5",
    message: "Hasil tidak mengecewakan",
    instansi: "Moonton Mobile Legend",
  },
  {
    name: "Doni",
    path: "/assets/avatar-6.svg",
    alt: "Avatar 6",
    message: "Bakal order disini lagi",
    instansi: "UII",
  },
  {
    name: "Dodi",
    path: "/assets/avatar-7.svg",
    alt: "Avatar 7",
    message: "Kerjaan rapi, sesuai ekspektasi",
    instansi: "UniPin",
  },
  {
    name: "Joni",
    path: "/assets/avatar-1.svg",
    alt: "Avatar 8",
    message: "Wow bagus sekali",
    instansi: "UGM",
  },
  {
    name: "Yuli",
    path: "/assets/avatar-5.svg",
    alt: "Avatar 9",
    message: "Hasil mantap",
    instansi: "UNY",
  },
  {
    name: "Rini",
    path: "/assets/avatar-6.svg",
    alt: "Avatar 10",
    message: "Rekomended!!!",
    instansi: "Pertamina",
  },
  {
    name: "Susi",
    path: "/assets/avatar-7.svg",
    alt: "Avatar 11",
    message: "Keren gak nyangka",
    instansi: "",
  },
  {
    name: "Rufi",
    path: "/assets/avatar-1.svg",
    alt: "Avatar 12",
    message: "Joooooooossssssssssssssss",
    instansi: "UAD",
  },
];

const custExpSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  instansi: z.string().optional(),
  message: z.string().min(1, "Message tidak boleh kosong"),
});

type CustomerExpForm = z.infer<typeof custExpSchema>;

export default function CustomerExp() {
  const [visibleCustomerExp, setVisibleCustomerExp] = useState(3);
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerExpForm>({
    resolver: zodResolver(custExpSchema),
  });

  const onSubmit = (data: CustomerExpForm) => {
    console.log("Submit to api", data);
  };

  const groupCustomerExperiences = (
    experiences: typeof customerExp,
    groupSize: number
  ) => {
    if (!Array.isArray(experiences) || experiences.length === 0) {
      return [];
    }

    if (groupSize <= 0) {
      throw new Error("Group size must be greater than 0");
    }

    const groups: CustomerExperience[][] = [];
    for (let i = 0; i < experiences.length; i += groupSize) {
      groups.push(experiences.slice(i, i + groupSize));
    }

    return groups;
  };

  const groupedCustomerExperiences = groupCustomerExperiences(customerExp, 2);
  const visibleCustomerExperiences = groupedCustomerExperiences.slice(
    0,
    visibleCustomerExp
  );

  const handleLoadCustomerExp = () => {
    setVisibleCustomerExp((prev) => prev + 3);
  };

  const toggleExpand = (name: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <section id="customer exp" className="text-center py-10 w-full">
      <h3 className="text-xl md:text-2xl text-[#85582c] font-semibold mb-2 py-4">
        Customers Experience
      </h3>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-screen-xl mx-auto px-4">
        <div className="w-full md:w-1/3 bg-stone-200 shadow-xl rounded-lg p-6">
          <h4 className="text-lg pb-4">Write your experience</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder="Nama"
                {...register("nama")}
                aria-invalid={!!errors.nama}
              />
              {errors.nama && (
                <p className="px-2 pt-2 text-red-500 text-xs text-left">
                  {errors.nama.message}
                </p>
              )}
            </div>
            <div>
              <Input placeholder="Instansi" {...register("instansi")} />
            </div>
            <div>
              <Input
                textarea
                placeholder="Message"
                maxLength={150}
                {...register("message")}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="px-2 pt-2 text-red-500 text-xs text-left">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button variant="full">Send</Button>
          </form>
        </div>
        <div className="w-full md:w-2/3">
          <div className="overflow-hidden h-[50vh] relative">
            <div className="flex flex-col overflow-auto h-[50vh]">
              {visibleCustomerExperiences.map((group, groupIndex) => (
                <div key={groupIndex} className="py-2 h-full w-full px-4">
                  <div className="flex justify-between gap-6">
                    {group.map((item: CustomerExperience) => (
                      <div
                        key={item.name}
                        className="flex flex-col md:flex-row items-start bg-white shadow-xl rounded-md p-4 
                      text-left min-h-[4rem] w-full transition-transform duration-300 hover:scale-105"
                      >
                        <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full bg-stone-200">
                          <Image
                            src={item.path}
                            alt={item.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col px-2 py-2 items-start text-justify">
                          <div className="text-left text-sm font-semibold">
                            {item.name} - {item.instansi}
                          </div>
                          <div
                            className={`text-[0.7rem] max-w-[8rem] min-h-[4rem] ${
                              !isExpanded[item.name] ? "truncate" : ""
                            }`}
                          >
                            &quot;
                            {item.message.length > 150
                              ? item.message.slice(0, 150)
                              : item.message}
                            &quot;
                          </div>
                          {item.message.length > 40 && (
                            <Button
                              onClick={() => toggleExpand(item.name)}
                              className="text-xs mt-1"
                            >
                              {isExpanded[item.name]
                                ? "Sembunyikan"
                                : "Lihat lebih"}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <Button onClick={handleLoadCustomerExp}>More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
