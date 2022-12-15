import axios from "axios";
import { FetchedVehicle, FormattedVehicle } from "../types/Filter";

export interface VehicleWithId extends FormattedVehicle {
  id: number;
}

export const getAllFilters = () =>
  axios.get("https://sitbusiness.co/mrp/api/997");

export const findVehiclesByUserId = (id: number) =>
  axios.post("https://sitbusiness.co/mrp/api/29", {
    idusuario: id,
  });

export const submitVehicle = (vehicle: FormattedVehicle) =>
  axios.post("https://sitbusiness.co/mrp/api/27", vehicle);

export const deleteVehicleById = (id: number) =>
  axios.post("https://sitbusiness.co/mrp/api/31", {
    id,
  });

export const updateVehicleById = (vehicle: VehicleWithId) =>
  axios.post("https://sitbusiness.co/mrp/api/30", vehicle);
