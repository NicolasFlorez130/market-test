import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import VehicleFilter, { SavedVehicle } from "./Filter/VehicleFilter";
import NavBar from "./NavBar";
import Searcher from "./Searcher";

const Header = () => {
  const searcherButton = useRef<HTMLButtonElement>(null);
  const vehicleFilter = useRef<HTMLDivElement>(null);

  const [vehicle, setVehicle] = useState<SavedVehicle | null>(null);

  const [buttonContent, setButtonContent] =
    useState<string>("Agregar vehiculo");

  useEffect(() => {
    if (searcherButton.current && vehicleFilter.current) {
      searcherButton.current.onclick = () => {
        vehicleFilter.current?.classList.toggle("hidden");
      };
    }
  }, []);

  return (
    <div className="w-full">
      <header className="relative max-w-screen-xl m-auto">
        <div className="top-side p-4 lg:grid lg:grid-cols-[20%_80%] lg:items-center">
          <div className="image-container relative mb-2 aspect-[3/1] w-1/2 sm:mb-4 sm:w-1/3 lg:mr-4 lg:w-auto lg:m-0">
            <Image
              priority
              src="/logo.png"
              alt="logo mercado repuesto"
              fill
              className="object-contain"
              sizes="100%"
            />
          </div>
          <Searcher
            vehicle={vehicle}
            content={buttonContent}
            ref={searcherButton}
          />
        </div>
        <div className="filter-container relative mx-4">
          <VehicleFilter
            setVehicle={setVehicle}
            setContent={setButtonContent}
            ref={vehicleFilter}
          />
        </div>
        <NavBar />
      </header>
    </div>
  );
};

export default Header;
