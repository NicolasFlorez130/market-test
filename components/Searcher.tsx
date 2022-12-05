import React from "react";
import styled from "styled-components";
import { Themes } from "../pages/StyleVariables";
import { SavedVehicle } from "./Filter/VehicleFilter";
import CarIcon from "./svgs/CarIcon";
import Glass from "./svgs/GlassIcon";

interface Props {
  content: string;
  vehicle: SavedVehicle | null;
}

const Searcher = React.forwardRef<HTMLButtonElement, Props>(
  ({ content, vehicle }, ref) => {
    const search = () => {
      const string = vehicle
        ? `Se realizará una busqueda con base en el siguiente vehiculo: ${
            vehicle.brand
          }, ${vehicle.year}, ${vehicle.model}, ${vehicle.cilinder}, ${
            vehicle.fuel
          } ${vehicle.transmision !== undefined ? vehicle.transmision : ""}`
        : `Se realizará una busqueda sin aplicar ningún filtro`;

      window.alert(string);
    };

    return (
      <Container>
        <div className="input-container">
          <input
            id="searcher"
            type="text"
            placeholder="Busca el producto para tu vehiculo"
          />
          <button onClick={search}>
            <Glass />
          </button>
        </div>
        <button className="window-toggle-button" ref={ref}>
          <p>{content}</p>
          <CarIcon />
        </button>
      </Container>
    );
  }
);

Searcher.displayName = "Searcher";

export default Searcher;

const Container = styled.div`
  border: 1px ${Themes.main} solid;
  border-radius: 0.25rem;
  display: grid;
  padding: 0.25rem;

  @media (width > ${Themes.sm}) {
    grid-template-columns: 34% 65%;
    gap: 1%;
  }

  .input-container {
    background: ${Themes.lightMain};
    border-radius: 0.25rem;
    display: grid;
    grid-template-columns: 1fr auto;
    margin-bottom: 0.25rem;
    overflow: hidden;

    @media (width > ${Themes.sm}) {
      margin-bottom: 0;
      order: 2;
    }

    #searcher {
      background: ${Themes.lightMain};
      padding: 0.5rem;
    }

    svg {
      border-left: 2px rgb(156 163 175) solid;
      cursor: pointer;
      fill: ${Themes.main};
      height: 100%;
      padding: 0.75rem;
    }
  }

  .window-toggle-button {
    border: 1px ${Themes.main} solid;
    border-radius: 0.25rem;
    color: ${Themes.main};
    display: flex;
    font-weight: bold;
    gap: 0.5rem;
    justify-content: center;
    padding: 0.5rem;
    width: 100%;

    @media (width > ${Themes.sm}) {
      order: 1;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    svg {
      height: 1.5rem;
      flex: none;
      fill: ${Themes.main};
    }
  }
`;
