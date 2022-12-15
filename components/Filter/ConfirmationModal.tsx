import { useContext } from "react";
import styled from "styled-components";
import { Themes } from "../../pages/StyleVariables";
import Button from "../Button";
import WarningIcon from "../svgs/WarningIcon";
import { FilterContext, state } from "./FilterWrapper";

interface Props {
  setIsLeaving: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationModal = ({ setIsLeaving }: Props) => {
  const { setView } = useContext(FilterContext);

  return (
    <Container>
      <WarningIcon />
      <h3>¿Estás seguro?</h3>
      <p>
        Si sales del editor ahora mismo perderás todos los cámbios que
        realizaste.
      </p>
      <div className="buttons-container">
        <Button
          secondary
          onclick={() => {
            setView(state.Select);
            setIsLeaving(false);
          }}
        >
          Salir
        </Button>
        <Button
          onclick={() => {
            setIsLeaving(false);
          }}
        >
          Continuar
        </Button>
      </div>
    </Container>
  );
};

export default ConfirmationModal;

const Container = styled.div`
  align-self: center;
  background-color: ${Themes.offWhite};
  border: 1px ${Themes.main} solid;
  border-radius: 8px;
  display: grid;
  gap: 0.5rem;
  justify-items: center;
  justify-self: center;
  margin: auto;
  padding: 1rem;
  position: absolute;
  width: 80%;
  z-index: 1;

  svg {
    fill: ${Themes.main};
    height: 4rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  p {
    text-align: center;
  }

  .buttons-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media screen and (min-width: ${Themes.sm}) {
    max-height: 90%;

    h3 {
      font-size: 2rem;
    }
  }

  @media screen and (min-width: ${Themes.md}) {
    h3 {
      font-size: 1.5rem;
    }

    p {
      width: 80%;
    }
  }
`;
