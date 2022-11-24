/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "../../pages/context/UserSlice";
import Deleting from "./Deleting";
import Filter from "./Filter";
import Select from "./Select";
import Warning from "./Warning";

export enum state {
  Filter,
  Delete,
  Select,
  Warning,
}

export interface SavedVehicle {
  type: string;
  brand: string;
  body: string;
  fuel: string;
  transmision: string;
  traction: string;
  cilinder: string;
  year: string;
  model: string;
}

export const DeletingContext = createContext<any>(null);
export const FilterContext = createContext<any>(null);
export const SelectedContext = createContext<any>(null);

export enum keys {
  guest,
  user,
}

export let key = keys.guest.toString();

interface Props {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setVehicle: React.Dispatch<React.SetStateAction<SavedVehicle | null>>;
}

const VehicleFilter = forwardRef<HTMLDivElement, Props>(
  ({ setContent, setVehicle }, ref) => {
    const [view, setView] = useState<state>();
    const [deleting, setDeleting] = useState<null | number>(null);
    const [selected, setSelected] = useState<null | number>(null);

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
      key = user ? keys.user.toString() : keys.guest.toString();
      setView(undefined);
      setSelected(null);
    }, [user]);

    useEffect(() => {
      view === undefined && setView(state.Select);
    }, [view]);

    useEffect(() => {
      const string = localStorage.getItem(key);
      const vehicle = string
        ? (JSON.parse(string) as SavedVehicle[])[selected ?? 0]
        : null;

      setVehicle(selected !== null ? vehicle : null);

      setContent(
        (selected !== null || selected === 0) && vehicle
          ? `${vehicle.brand}, ${vehicle.year}, ${vehicle.model}, ${
              vehicle.cilinder
            }, ${vehicle.fuel} ${
              vehicle.transmision !== undefined ? vehicle.transmision : ""
            }`
          : "Agregar vehiculo"
      );
    }, [selected]);

    useEffect(() => {
      const saved = localStorage.getItem(key);

      if (saved) {
        setView(state.Select);
        setSelected(0);
      } else {
        setView(state.Filter);
      }
    }, []);

    return (
      <div
        ref={ref}
        className="filter-container absolute mt-1 hidden w-full translate-y-[-1rem] overflow-hidden rounded-lg border border-main bg-lightMain p-3 transition-all lg:right-0 lg:w-4/5 lg:translate-y-[-1.8rem]"
      >
        <SelectedContext.Provider value={{ selected, setSelected }}>
          <DeletingContext.Provider value={{ deleting, setDeleting }}>
            <FilterContext.Provider value={{ view, setView }}>
              {view === state.Filter ? (
                <Filter />
              ) : view === state.Select ? (
                <Select />
              ) : view === state.Delete ? (
                <Deleting />
              ) : view === state.Warning ? (
                <Warning />
              ) : (
                ""
              )}
            </FilterContext.Provider>
          </DeletingContext.Provider>
        </SelectedContext.Provider>
      </div>
    );
  }
);

VehicleFilter.displayName = "VehicleFilter";

export default VehicleFilter;
