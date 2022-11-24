import { Dispatch, SetStateAction, useContext } from "react";
import {
  DeletingContext,
  FilterContext,
  SavedVehicle,
  SelectedContext,
  state,
} from "./Filter/VehicleFilter";
import TrashIcon from "./svgs/TrashIcon";

interface Props {
  vehicle: SavedVehicle;
  type: state;
  index?: number;
}

const VehicleOverview = ({ vehicle, index, type }: Props) => {
  const { deleting, setDeleting } = useContext(DeletingContext);
  const { view, setView } = useContext(FilterContext);
  const { selected, setSelected } = useContext(SelectedContext);

  const deleteVehicle = () => {
    setDeleting(index);
    setView(state.Delete);
    setSelected(null);
  };

  return (
    <div
      className={`my-4 grid grid-cols-[1fr_auto] gap-2 ${
        type === state.Select && "cursor-pointer"
      }`}
    >
      <div
        onClick={() => type === state.Select && setSelected(index)}
        className="grid grid-cols-[1fr_auto] gap-2 rounded-full bg-offWhite py-2 px-4"
      >
        <div>{`${vehicle.brand}, ${vehicle.year}, ${vehicle.model}, ${
          vehicle.cilinder
        }, ${vehicle.fuel} ${
          vehicle.transmision !== undefined ? vehicle.transmision : ""
        }`}</div>
        {type === state.Select && (
          <input type={"radio"} readOnly checked={selected === index} />
        )}
      </div>
      {type === state.Select && (
        <button
          className="aspect-square rounded-full bg-offWhite p-3"
          onClick={deleteVehicle}
        >
          <TrashIcon className="aspect-square w-4 fill-main" />
        </button>
      )}
    </div>
  );
};

export default VehicleOverview;
