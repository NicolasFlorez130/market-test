import { useContext } from "react";
import styled from "styled-components";
import { Themes } from "../pages/StyleVariables";
import {
  DeletingContext,
  FilterContext,
  SavedVehicle,
  SelectedContext,
  state,
} from "./Filter/VehicleFilter";
import TrashIcon from "./svgs/TrashIcon";

interface Props {
  vehicle?: SavedVehicle;
  type: state;
  index?: number;
}

const VehicleOverview = ({ vehicle, index, type }: Props) => {
  const { setDeleting } = useContext(DeletingContext);
  const { setView } = useContext(FilterContext);
  const { selected, setSelected } = useContext(SelectedContext);

  const deleteVehicle = () => {
    setDeleting(index);
    setView(state.Delete);
    setSelected(null);
  };

  return (
    <Container type={type}>
      <div
        onClick={() => setSelected(type === state.Select ? index : null)}
        className="overview"
      >
        {type === state.None && <div>Buscar para cualquier vehiculo</div>}
        {vehicle && type !== state.None && (
          <>
            <div>{`${vehicle.brand}, ${vehicle.year}, ${vehicle.model}, ${
              vehicle.cilinder
            }, ${vehicle.fuel} ${
              vehicle.transmision !== undefined ? vehicle.transmision : ""
            }`}</div>
          </>
        )}
        {type !== state.Delete && (
          <input
            type={"radio"}
            readOnly
            checked={
              selected === index || (selected === null && type === state.None)
            }
          />
        )}
      </div>
      {type === state.Select && (
        <button onClick={deleteVehicle}>
          <TrashIcon className="aspect-square w-4 fill-main" />
        </button>
      )}
    </Container>
  );
};

export default VehicleOverview;

interface ContainerProps {
  type: state;
}

const Container = styled.div<ContainerProps>`
  grid-template-columns: 1fr auto;
  display: grid;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  gap: 0.5rem;

  ${({ type }) => type === state.Select && `cursor: pointer;`}

  .overview {
    background-color: ${Themes.offWhite};
    border-radius: 9999px;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr auto;
    padding: 0.5rem 1rem;
  }

  button {
    aspect-ratio: 1/1;
    border-radius: 999px;
    background-color: ${Themes.offWhite};
    padding: 0.75rem;
  }
`;
