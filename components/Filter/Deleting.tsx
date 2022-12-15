/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { deleteVehicleById } from "../../core/fetch";
import { UserContext } from "../../pages/context/UserSlice";
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

interface Props {
  vehicles: SavedVehicle[];
}

const Deleting = ({ vehicles }: Props) => {
  const { deleting } = useContext(DeletingContext);
  const { setView } = useContext(FilterContext);
  const { user } = useContext(UserContext);

  const [vehicle, setVehicle] = useState<SavedVehicle>();

  useEffect(() => {
    if (user) {
      const vehicle = vehicles.find((v) => v.id === parseInt(deleting));

      setVehicle(vehicle);
    } else {
      const string = localStorage.getItem(key);
      const localVehicle = (JSON.parse(string ?? "") as SavedVehicle[]).at(
        deleting
      );
      setVehicle(localVehicle);
    }
  }, []);

  const accept = async () => {
    if (user) {
      await deleteVehicleById(deleting);
    } else {
      const string = localStorage.getItem(key);
      const vehicles = JSON.parse(string ?? "") as SavedVehicle[];
      vehicles.splice(deleting, 1);
      localStorage.setItem(key, JSON.stringify(vehicles));
    }
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
      width: 3rem;
    }

    p {
      color: ${Themes.main};
      font-size: 1.25rem;
      font-weight: bold;
      line-height: 1.75rem;
      padding-right: 1.5rem;
    }
  }
`;
