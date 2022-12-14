/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import styled from "styled-components";
import Button from "../Button";
import ExclamationIcon from "../svgs/ExclamationIcon";
import { FilterContext, state } from "./FilterWrapper";
import { Themes } from "./../../pages/StyleVariables";

const Warning = () => {
  const { setView } = useContext(FilterContext);

  return (
    <Container>
      <div>
        <ExclamationIcon />
        <p>Has llegado al maximo de vehiculos que puedes agregar.</p>
      </div>
      <p>Debes eliminar por lo menos un vehiculo para agregar uno nuevo.</p>
      <Button
        onclick={() => {
          setView(state.Select);
        }}
      >
        Aceptar
      </Button>
    </Container>
  );
};

export default Warning;

const Container = styled.div`
  & > div {
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: auto 1fr;

    svg {
      aspect-ratio: 1/1;
      fill: ${Themes.main};
      width: 2rem;
    }

    p {
      color: ${Themes.main};
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 1.75rem;
      margin-right: 1.5rem;
    }
  }

  & > p {
    color: ${Themes.main};
    margin: 1rem;
    text-align: justify;
  }
`;
