import {
  Body,
  Brand,
  CilinderCapacity,
  FuelType,
  PrismaClient,
  TractionType,
  Transmision,
  VehicleModel,
  VehicleType,
} from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import styled from "styled-components";
import ChangeUser from "../components/ChangeUser";
import Header from "../components/Header";
import { UserContext } from "./context/UserSlice";
import { VehicleTypesContext } from "./context/VehicleTypesSlice";

interface Props {
  filters: Filters;
}

export interface Filters {
  brand: Brand[];
  vehicleType: VehicleType[];
  body: Body[];
  cilinderCapacity: CilinderCapacity[];
  transmision: Transmision[];
  tractionType: TractionType[];
  fuelType: FuelType[];
  vehicleModel: VehicleModel[];
}

const Home = ({
      filters,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [user, setUser] = useState();

  return (
    <Index>
      <VehicleTypesContext.Provider value={filters}>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <ChangeUser />
        </UserContext.Provider>
      </VehicleTypesContext.Provider>
    </Index>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();

  const brand = prisma.brand.findMany().then();
  const vehicleType = prisma.vehicleType.findMany().then();
  const body = prisma.body.findMany().then();
  const cilinderCapacity = prisma.cilinderCapacity.findMany().then();
  const transmision = prisma.transmision.findMany().then();
  const tractionType = prisma.tractionType.findMany().then();
  const fuelType = prisma.fuelType.findMany().then();
  const vehicleModel = prisma.vehicleModel.findMany().then();

  const filters: Filters = await Promise.all([
    brand,
    vehicleType,
    body,
    cilinderCapacity,
    transmision,
    tractionType,
    fuelType,
    vehicleModel,
  ]).then((res) => ({
    brand: res[0],
    vehicleType: res[1],
    body: res[2],
    cilinderCapacity: res[3],
    transmision: res[4],
    tractionType: res[5],
    fuelType: res[6],
    vehicleModel: res[7],
  }));

  return {
    props: {
      filters,
    },
  };
};

const Index = styled.div`
  position: relative;
  min-height: 100vh;
`;
