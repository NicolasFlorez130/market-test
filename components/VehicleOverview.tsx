import { useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../pages/context/UserSlice";
import { Themes } from "../pages/StyleVariables";
import {
  DeletingContext,
  EditingContext,
  FilterContext,
  SavedVehicle,
  SelectedContext,
  state,
} from "./Filter/FilterWrapper";
import EditIcon from "./svgs/EditIcon";
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
  const { setEditing } = useContext(EditingContext);
  const { user } = useContext(UserContext);

  let isSelected: boolean;

  if (selected === null) {
    isSelected = type === state.None;
  } else if (user) {
    isSelected = vehicle?.id === selected;
  } else {
    isSelected = selected === index;
  }

  const selectVehicle = () => {
    if (user) {
      setSelected(vehicle?.id);
    } else {
      setSelected(type === state.Select ? index : null);
    }
  };

  const deleteVehicle = () => {
    if (user) {
      setDeleting(vehicle?.id);
    } else {
      setDeleting(index);
    }
    setView(state.Delete);
    setSelected(null);
  };

  const editVehicle = () => {
    setEditing(index);
    setView(state.Edit);
    setSelected(null);
  };

  useEffect(() => {
    if (selected === -1 && type !== state.None) {
      selectVehicle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container type={type}>
      <div onClick={selectVehicle} className="overview">
        {type === state.None && <div>Buscar para cualquier vehiculo</div>}
        {vehicle && type !== state.None && (
          <>
            <div>{`${vehicle.brand}, ${vehicle.year}, ${vehicle.model}, ${
              vehicle.cilinder
            }, ${vehicle.fuel}${
              vehicle.transmision !== undefined
                ? ", " + vehicle.transmision
                : ""
            }`}</div>
          </>
        )}
        {type !== state.Delete && (
          <input type={"radio"} readOnly checked={isSelected} />
        )}
      </div>
      {type === state.None && (
        <>
          <button className="dummy-buttons">
            <svg />
          </button>
          <button className="dummy-buttons">
            <svg />
          </button>
        </>
      )}
      {type === state.Select && (
        <>
          <button onClick={deleteVehicle}>
            <span className="tooltip">Eliminar</span>
            <TrashIcon />
          </button>
          <button onClick={editVehicle}>
            <span className="tooltip">Editar</span>
            <EditIcon />
          </button>
        </>
      )}
    </Container>
  );
};

export default VehicleOverview;

interface ContainerProps {
  type: state;
}

const Container = styled.div<ContainerProps>`
  grid-template-columns: 1fr auto auto;
  display: grid;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;

  ${({ type }) => type !== state.Delete && `gap: 0.5rem; cursor: pointer;`}

  .overview {
    background-color: ${Themes.offWhite};
    border-radius: 9999px;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr auto;
    padding: 0.5rem 1rem;

    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  button {
    aspect-ratio: 1/1;
    border-radius: 999px;
    background-color: ${Themes.offWhite};
    padding: 0.75rem;
    position: relative;
    display: flex;

    svg {
      aspect-ratio: 1/1;
      fill: ${Themes.main};
      width: 1rem;
    }

    &:hover {
      .tooltip {
        display: block;
      }
    }

    .tooltip {
      background-color: rgba(211, 211, 211, 0.6);
      border-radius: 4px;
      display: none;
      top: -70%;
      left: 0;
      padding: 2px;
      position: absolute;
      text-align: center;
    }

    &.dummy-buttons {
      opacity: 0;
      cursor: default;
    }
  }
`;
