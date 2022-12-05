/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { CloseWindowContext } from "../Header";
import VehicleOverview from "../VehicleOverview";
import { FilterContext, key, keys, SavedVehicle, state } from "./VehicleFilter";

const Select = () => {
  const { view, setView } = useContext(FilterContext);
  const closeWindow = useContext(CloseWindowContext);
  const [options, setOptions] = useState<SavedVehicle[]>();

  useEffect(() => {
    //  (localStorage.getItem(key) === "[]" ||
    //    localStorage.getItem(key) === null) &&
    //    setView(state.Filter);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(key);

    saved && setOptions(JSON.parse(saved));
  }, [view]);

  const goToCreate = () => {
    const length = key === keys.guest.toString() ? 3 : 10;

    (options as any).length >= length
      ? setView(state.Warning)
      : setView(state.Filter);
  };

  return (
    <div className="grid ">
      <div className="select-container">
        <p className="text-xl font-bold text-main">
          Agrega tu vehiculo para filtrar tu busqueda
        </p>
        <VehicleOverview type={state.None} />
        {options?.map((op, i) => (
          <VehicleOverview type={state.Select} key={i} index={i} vehicle={op} />
        ))}
        <button
          className="mb-4 w-full rounded-full bg-offWhite py-2 px-4 text-start"
          onClick={goToCreate}
        >
          Agregar vehiculo
        </button>
      </div>
      <div className="button-container justify-self-end">
        <Button onclick={closeWindow}>Listo</Button>
      </div>
    </div>
  );
};

export default Select;
