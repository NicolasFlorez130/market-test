import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../pages/context/UserSlice";
import Button from "./Button";

const ChangeUser = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <Container>
      <Button onclick={() => setUser(!user)}>
        Estado: {user ? "Logueado" : "Invitado"}
      </Button>
    </Container>
  );
};

export default ChangeUser;

const Container = styled.div`
  bottom: 0;
  left: 0;
  margin: 1rem;
  position: absolute;
`;
