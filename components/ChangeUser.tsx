import { useContext } from "react";
import { UserContext } from "../pages/context/UserSlice";
import Button from "./Button";

const ChangeUser = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="button-container absolute bottom-0 left-0 m-4">
      <Button onclick={() => setUser(!user)}>
        Estado: {user ? "Logueado" : "Invitado"}
      </Button>
    </div>
  );
};

export default ChangeUser;
