/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import VehicleOverview from "../VehicleOverview";
import { FilterContext, key, keys, SavedVehicle, state } from "./VehicleFilter";

const Select = () => {
  const { view, setView } = useContext(FilterContext);
  const [options, setOptions] = useState<SavedVehicle[]>();

  useEffect(() => {
    (localStorage.getItem(key) === "[]" ||
      localStorage.getItem(key) === null) &&
      setView(state.Filter);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(key);

    saved && setOptions(JSON.parse(saved));
  }, [view]);

  const goToCreate = () => {
    const length = key === keys.guest.toString() ? 1 : 3;

    (options as any).length >= length
      ? setView(state.Warning)
      : setView(state.Filter);
  };

  return (
    <div className="select-container">
      <p className="text-xl font-bold text-main">
        Agrega tu vehiculo para filtrar tu busqueda
      </p>
      {options?.map((op, i) => (
        <VehicleOverview type={state.Select} key={i} index={i} vehicle={op} />
      ))}{" "}
      <Button onclick={goToCreate}>Agregar vehiculo</Button>
    </div>
  );
};

export default Select;
