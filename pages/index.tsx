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
    <div className="relative min-h-screen">
      <VehicleTypesContext.Provider value={filters}>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <ChangeUser />
        </UserContext.Provider>
      </VehicleTypesContext.Provider>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();

  const brand = await prisma.brand.findMany();
  const vehicleType = await prisma.vehicleType.findMany();
  const body = await prisma.body.findMany();
  const cilinderCapacity = await prisma.cilinderCapacity.findMany();
  const transmision = await prisma.transmision.findMany();
  const tractionType = await prisma.tractionType.findMany();
  const fuelType = await prisma.fuelType.findMany();
  const vehicleModel = await prisma.vehicleModel.findMany();

  return {
    props: {
      filters: {
        brand,
        vehicleType,
        body,
        cilinderCapacity,
        transmision,
        tractionType,
        fuelType,
        vehicleModel,
      },
    },
  };
};
