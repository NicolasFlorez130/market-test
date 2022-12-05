import styled from "styled-components";
import { Themes } from "../pages/StyleVariables";

interface Props {
  onclick: () => void;
  disabled?: boolean;
  children: any;
}

const Button = ({ onclick, disabled, children }: Props) => {
  return (
    <Container onClick={onclick} disabled={disabled}>
      {children}
    </Container>
  );
};

export default Button;

const Container = styled.button`
  background-color: ${Themes.main};
  border-radius: 999px;
  color: white;
  margin: 0.5rem;
  margin-top: 0;
  padding: 0.5rem 2rem;
  transition: 0.2s;
  height: min-content;

  &:disabled {
    border: 1px rgb(156 163 175) solid;
    background-color: ${Themes.lightMain};
    color: rgb(156 163 175);
  }
`;
