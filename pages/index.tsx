import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import ChangeUser from "../components/ChangeUser";
import Header from "../components/Header";
import { FetchedVehicle, Filter } from "../types/Filter";
import { UserContext } from "./context/UserSlice";
import { VehicleTypesContext } from "./context/VehicleTypesSlice";
import { SavedVehiclesContext } from "./context/VehiclesSavedSlice";
import { SavedVehicle } from "./../components/Filter/FilterWrapper";

interface Props {
  filter: Filter;
  vehicles: FetchedVehicle[];
}

// export interface Filters {
//   brand: Brand[];
//   vehicleType: VehicleType[];
//   body: Body[];
//   cilinderCapacity: CilinderCapacity[];
//   transmision: Transmision[];
//   tractionType: TractionType[];
//   fuelType: FuelType[];
//   vehicleModel: VehicleModel[];
// }

const Home = ({ filter, vehicles }: Props) => {
  const [user, setUser] = useState();

  //   console.log(vehicles);

  const formattedVehicles: SavedVehicle[] = vehicles.map((v) => ({
    body: v.carroceria.toString(),
    brand: v.marca.toString(),
    cilinder: v.cilindrajemotor.toString(),
    fuel: v.tipocombustible.toString(),
    model: v.modelo.toString(),
    traction: v.tipotraccion.toString(),
    transmision: v.transmision.toString(),
    type: v.tipovehiculo.toString(),
    year: v.anno.toString(),
    ids: {
      body: v.carroceria.toString(),
      brand: v.marca.toString(),
      cilinder: v.cilindrajemotor.toString(),
      fuel: v.tipocombustible.toString(),
      model: v.modelo.toString(),
      traction: v.tipotraccion.toString(),
      transmision: v.transmision.toString(),
      type: v.tipovehiculo.toString(),
      year: v.anno.toString(),
    },
  }));

  return (
    <Index>
      {filter && (
        <SavedVehiclesContext.Provider value={vehicles}>
          <VehicleTypesContext.Provider value={filter}>
            <UserContext.Provider value={{ user, setUser }}>
              <Header />
              <ChangeUser />
            </UserContext.Provider>
          </VehicleTypesContext.Provider>
        </SavedVehiclesContext.Provider>
      )}
    </Index>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const filterProm = fetch("https://sitbusiness.co/mrp/api/997").then((res) =>
    res.json()
  );
  //   const filter = await filterProm.json();

  const vehiclesProm = axios.post("https://sitbusiness.co/mrp/api/28", {
    idusuario: 222222,
  });

  const props = await Promise.all([filterProm, vehiclesProm]).then((res) => ({
    filter: res[0],
    vehicles: res[1].data,
  }));

  //   console.log(filterProm.json());

  return {
    props,
  };
};

const Index = styled.div`
  position: relative;
  min-height: 100vh;
`;
