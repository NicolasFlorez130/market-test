import { createContext } from "react";
import { FetchedVehicle } from "../../types/Filter";

export const SavedVehiclesContext = createContext<FetchedVehicle[]>([]);
