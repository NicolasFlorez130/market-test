import { useContext } from "react";
import styled from "styled-components";
import { Themes } from "../pages/StyleVariables";
import Button from "./Button";
import { DuplicatedContext } from "./Filter/FilterWrapper";
import WarningIcon from "./svgs/WarningIcon";

const ModalWarning = () => {
  const setDuplicate = useContext(DuplicatedContext);

  return (
    <Container>
      <WarningIcon />
      <h3>¡Vehiculo duplicado!</h3>
      <p>
        No puedes tener dos vehiculos identicos en tu garaje, debes cambiar al
        menos una caracteristica para poder guardar.
      </p>
      <Button onclick={() => setDuplicate(false)}>Cerrar</Button>
    </Container>
  );
};

export default ModalWarning;

const Container = styled.div`
  align-self: center;
  aspect-ratio: 5/3;
  background-color: white;
  border: 1px ${Themes.main} solid;
  border-radius: 8px;
  display: grid;
  gap: 0.4rem;
  justify-items: center;
  justify-self: center;
  margin: auto;
  padding: 1rem;
  position: absolute;
  width: 80%;
  z-index: 1;

  /* max-height: 80%; */

  svg {
    fill: ${Themes.main};
    height: 100%;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  p {
    text-align: center;
  }

  @media screen and (min-width: ${Themes.sm}) {
    max-height: 90%;
    gap: .8rem;

    h3 {
      font-size: 2rem;
    }
  }

  @media screen and (min-width: ${Themes.md}) {
    max-height: 90%;
    gap: 0.2rem;

    h3 {
      font-size: 1.5rem;
    }

    p {
      width: 80%;
    }
  }
`;
