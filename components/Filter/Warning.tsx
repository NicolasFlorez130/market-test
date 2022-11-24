/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import Button from "../Button";
import ExclamationIcon from "../svgs/ExclamationIcon";
import { FilterContext, state } from "./VehicleFilter";

const Warning = () => {
  const { setView } = useContext(FilterContext);

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] items-center gap-4">
        <ExclamationIcon className="aspect-square w-8 fill-main" />
        <p className="text-lg font-semibold text-main">
          Has llegado al maximo de vehiculos que puedes agregar.
        </p>
      </div>
      <p className="text-main my-4">
        Debes eliminar por lo menos un vehiculo para agregar uno nuevo.
      </p>
      <Button
        onclick={() => {
          setView(state.Select);
        }}
      >
        Aceptar
      </Button>
    </>
  );
};

export default Warning;
