import { Icon } from "@iconify/react";
import LeafletMap from "../Map";

export default function Contacts() {
  return (
    <div className="w-full">
      <section id="contacts" className="text-center py-10">
        <h3 className="text-xl md:text-2xl font-semibold mb-2 py-4 text-[#85582c] bg-white rounded-full w-62 mx-auto">
          Contacts
        </h3>
        <div className="flex md:flex-row flex-col items-center justify-center gap-4">
          <div className="flex text-left">
            <div className="flex w-full flex-col space-y-2">
              <h4 className="font-semibold text-lg">Hubungi kami di :</h4>
              <span className="flex gap-2 items-center max-w-50">
                <Icon icon="logos:whatsapp-icon" className="w-6 h-6" />
                08175457300
              </span>
              <span className="flex gap-2 max-w-50">
                <Icon icon="line-md:email" className="w-6 h-6" />
                sottaart@gmail.com
              </span>
              <span className="flex gap-2 max-w-100">
                <Icon icon="streamline:location-pin-3" className="w-12 h-6 " />
                Bumen No.536, RT.26/RW.06, Purbayan, Kotagede, Yogyakarta City,
                Special Region of Yogyakarta 55173
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="md:min-w-[40vw] md:min-h-[40vh] min-w-[90vw] min-h-[40vh] bg-white shadow-xl p-4 rounded-md">
              <LeafletMap />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
