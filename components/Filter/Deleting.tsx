/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Themes } from "../../pages/StyleVariables";
import Button from "../Button";
import ExclamationIcon from "../svgs/ExclamationIcon";
import VehicleOverview from "../VehicleOverview";
import {
  DeletingContext,
  FilterContext,
  key,
  SavedVehicle,
  state,
} from "./FilterWrapper";

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
  9;

  const accept = () => {
    const string = localStorage.getItem(key);
    const vehicles = JSON.parse(string ?? "") as SavedVehicle[];
    vehicles.splice(deleting, 1);
    localStorage.setItem(key, JSON.stringify(vehicles));
    setView(state.Select);
  };

  return (
    <Container>
      <div className="warning-container">
        <ExclamationIcon className="exclamation-icon" />
        <p>¿Estás seguro que deseas eliminar este vehiculo?</p>
      </div>
      {vehicle && <VehicleOverview type={state.Delete} vehicle={vehicle} />}
      <Button secondary onclick={accept}>
        Aceptar
      </Button>
      <Button
        onclick={() => {
          setView(state.Select);
        }}
      >
        Cancelar
      </Button>
    </Container>
  );
};

export default Deleting;

const Container = styled.div`
  .warning-container {
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: auto 1fr;

    .exclamation-icon {
      aspect-ratio: 1/1;
      fill: ${Themes.main};
      height: 100%;
    }

    p {
      color: ${Themes.main};
      font-size: 1.25rem;
      font-weight: bold;
      line-height: 1.75rem;
    }
  }
`;
