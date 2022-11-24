/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import ExclamationIcon from "../svgs/ExclamationIcon";
import VehicleOverview from "../VehicleOverview";
import {
  DeletingContext,
  FilterContext,
  key,
  SavedVehicle,
  state,
} from "./VehicleFilter";

const Deleting = () => {
  const { deleting } = useContext(DeletingContext);
  const { setView } = useContext(FilterContext);

  const [vehicle, setVehicle] = useState<SavedVehicle>();

  useEffect(() => {
    const string = localStorage.getItem(key);
    const localVehicle = (JSON.parse(string ?? "") as SavedVehicle[]).at(
      deleting
    );
    setVehicle(localVehicle);
  }, []);

  const accept = () => {
    const string = localStorage.getItem(key);
    const vehicles = JSON.parse(string ?? "") as SavedVehicle[];
    vehicles.splice(deleting, 1);
    localStorage.setItem(key, JSON.stringify(vehicles));
    setView(vehicles.length > 0 ? state.Select : state.Filter);
  };

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] items-center gap-4">
        <ExclamationIcon className="aspect-square w-8 fill-main" />
        <p className="text-lg font-semibold text-main">
          ¿Estás seguro que deseas eliminar este vehiculo?
        </p>
      </div>
      {vehicle && <VehicleOverview type={state.Delete} vehicle={vehicle} />}
      <Button onclick={accept}>Aceptar</Button>
      <Button
        onclick={() => {
          setView(state.Select);
        }}
      >
        Cancelar
      </Button>
    </>
  );
};

export default Deleting;
