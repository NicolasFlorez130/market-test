import Image from "next/image";
import { createContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import VehicleFilter, { SavedVehicle } from "./Filter/VehicleFilter";
import NavBar from "./NavBar";
import Searcher from "./Searcher";
import { Themes } from "./../pages/StyleVariables";

const Header = () => {
  const searcherButton = useRef<HTMLButtonElement>(null);
  const vehicleFilter = useRef<HTMLDivElement>(null);

  const [vehicle, setVehicle] = useState<SavedVehicle | null>(null);

  const [buttonContent, setButtonContent] = useState("Agregar vehiculo");

  useEffect(() => {
    if (searcherButton.current && vehicleFilter.current) {
      searcherButton.current.onclick = () => {
        vehicleFilter.current?.classList.remove("hidden");
      };
    }
  }, []);

  const closeWindow = () => {
    vehicleFilter.current?.classList.add("hidden");
  };

  return (
    <Container>
      <header>
        <div className="top-side">
          <div className="image-container">
            <Image
              priority
              src="/logo.png"
              alt="logo mercado repuesto"
              fill
              className="object-contain"
              sizes="100%"
            />
          </div>
          <Searcher
            vehicle={vehicle}
            content={buttonContent}
            ref={searcherButton}
          />
        </div>
        <div className="filter-container">
          <CloseWindowContext.Provider value={closeWindow}>
            <VehicleFilter
              setVehicle={setVehicle}
              setContent={setButtonContent}
              ref={vehicleFilter}
            />
          </CloseWindowContext.Provider>
        </div>
        <NavBar />
      </header>
    </Container>
  );
};

export default Header;

export const CloseWindowContext = createContext({} as () => void);

const Container = styled.div`
  width: 100%;

  header {
    position: relative;
    margin: auto;
    max-width: ${Themes.xl};

    .top-side {
      padding: 1rem;

      @media (width > ${Themes.lg}) {
        align-items: center;
        display: grid;
        grid-template-columns: 20% 80%;
      }

      .image-container {
        position: relative;
        margin-bottom: 0.5rem;
        aspect-ratio: 3/1;
        width: 50%;

        @media (width > ${Themes.sm}) {
          margin-bottom: 1rem;
          width: 33%;
        }

        @media (width > ${Themes.lg}) {
          margin: 0;
          margin-right: 4rem;
          width: auto;
        }
      }
    }

    .filter-container {
      position: relative;
      margin: 0 1rem;
    }
  }
`;
