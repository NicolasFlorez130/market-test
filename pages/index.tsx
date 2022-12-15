import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import styled from "styled-components";
import ChangeUser from "../components/ChangeUser";
import Header from "../components/Header";
import { getAllFilters } from "../core/fetch";
import { Filter } from "../types/Filter";
import { UserContext } from "./context/UserSlice";
import { VehicleTypesContext } from "./context/VehicleTypesSlice";

interface Props {
  filter: Filter;
}

const Home = ({ filter }: Props) => {
  const [user, setUser] = useState(false);

  return (
    <Index>
      {filter && (
        <VehicleTypesContext.Provider value={filter}>
          <UserContext.Provider value={{ user, setUser, id: 222222 }}>
            <Header />
            <ChangeUser />
          </UserContext.Provider>
        </VehicleTypesContext.Provider>
      )}
    </Index>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const filterProm = getAllFilters();

  const props = await Promise.all([filterProm]).then((res) => ({
    filter: res[0].data,
  }));

  return {
    props,
  };
};

const Index = styled.div`
  position: relative;
  min-height: 100vh;
`;
