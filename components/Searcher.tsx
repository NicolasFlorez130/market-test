import React from "react";
import { SavedVehicle } from "./Filter/VehicleFilter";
import CarIcon from "./svgs/CarIcon";
import Glass from "./svgs/GlassIcon";

interface Props {
  content: string;
  vehicle: SavedVehicle | null;
}

const Searcher = React.forwardRef<HTMLButtonElement, Props>(
  ({ content, vehicle }, ref) => {
    const search = () => {
      const string = vehicle
        ? `Se realizará una busqueda con base en el siguiente vehiculo: ${
            vehicle.brand
          }, ${vehicle.year}, ${vehicle.model}, ${vehicle.cilinder}, ${
            vehicle.fuel
          } ${vehicle.transmision !== undefined ? vehicle.transmision : ""}`
        : `Se realizará una busqueda sin aplicar ningún filtro`;

      window.alert(string);
    };

    return (
      <div className="grid rounded border border-main p-1 sm:grid-cols-[34%_65%] sm:gap-[1%]">
        <div className="input-container mb-1 grid grid-cols-[1fr_auto] overflow-hidden rounded bg-lightMain sm:order-2 sm:mb-0">
          <input
            id="searcher"
            className="bg-lightMain p-2"
            type="text"
            placeholder="Busca el producto para tu vehiculo"
          />
          <button onClick={search}>
            <Glass className="h-full cursor-pointer border-l-2 border-gray-400 fill-main p-3" />
          </button>
        </div>
        <button
          ref={ref}
          className="filter-button flex w-full justify-center gap-2 rounded border border-main p-2 font-bold text-main sm:order-1"
        >
          <p className="sm:truncate">{content}</p>
          <CarIcon className="h-6 fill-main flex-none" />
        </button>
      </div>
    );
  }
);

Searcher.displayName = "Searcher";

export default Searcher;
