/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import { CloseWindowContext } from "../Header";
import VehicleOverview from "../VehicleOverview";
import { FilterContext, key, keys, SavedVehicle, state } from "./FilterWrapper";
import { Themes } from "./../../pages/StyleVariables";

interface Props {
  vehicles: SavedVehicle[];
}

const Select = ({ vehicles }: Props) => {
  const { setView } = useContext(FilterContext);
  const closeWindow = useContext(CloseWindowContext);

  const goToCreate = () => {
    const length = key === keys.guest.toString() ? 3 : 10;

    vehicles.length >= length ? setView(state.Warning) : setView(state.Filter);
  };

  return (
    <Container>
      <div className="select-container">
        <p>Agrega tu vehiculo para filtrar tu busqueda</p>
        <VehicleOverview type={state.None} />
        {vehicles.map((op, i) => (
          <VehicleOverview type={state.Select} key={i} index={i} vehicle={op} />
        ))}
        <button className="add-vehicle-button" onClick={goToCreate}>
          Agregar vehiculo
        </button>
      </div>
      <div className="button-container">
        <Button onclick={closeWindow}>Listo</Button>
      </div>
    </Container>
  );
};

export default Select;

const Container = styled.div`
  display: grid;

  .select-container {
    & > p {
      font-size: 1.25rem;
      font-weight: bold;
      line-height: 1.75rem;
      color: ${Themes.main};
    }

    .add-vehicle-button {
      background-color: ${Themes.offWhite};
      border-radius: 999px;
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      text-align: start;
      width: 100%;
    }
  }

  .button-container {
    justify-self: end;
  }
`;
