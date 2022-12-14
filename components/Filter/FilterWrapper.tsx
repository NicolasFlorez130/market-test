/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { UserContext } from "../../pages/context/UserSlice";
import { CloseWindowContext } from "../Header";
import CloseIcon from "../svgs/CloseIcon";
import Deleting from "./Deleting";
import Filter from "./Filter";
import Select from "./Select";
import Warning from "./Warning";
import { Themes } from "../../pages/StyleVariables";
import Edit from "./Edit";
import ModalWarning from "../ModalWarning";
import axios from "axios";
import { FetchedVehicle } from "../../types/Filter";
import { VehicleTypesContext } from "../../pages/context/VehicleTypesSlice";

export enum state {
  Filter,
  Delete,
  Select,
  Warning,
  None,
  Edit,
}

export interface Vehicle {
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

export interface SavedVehicle extends Vehicle {
  id?: number;
  ids: Vehicle;
}

export const DeletingContext = createContext<any>(null);
export const FilterContext = createContext<any>(null);
export const SelectedContext = createContext<any>(null);
export const EditingContext = createContext<any>(null);
export const DuplicatedContext = createContext<any>(null);

export enum keys {
  guest,
  user,
}

export let key = keys.guest.toString();

interface Props {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setVehicle: React.Dispatch<React.SetStateAction<SavedVehicle | null>>;
}

const transmisiones = [
  { id: 1, label: "Automática" },
  { id: 2, label: "Manual" },
];

const combustibles = [
  { id: 1, label: "Gasolina" },
  { id: 2, label: "Diesel" },
  { id: 3, label: "Gasolina - Gas" },
  { id: 4, label: "Gasolina - Electrico" },
];

const tracciones = [
  { id: 1, label: "Tracción Delantera" },
  { id: 2, label: "Tracción Trasera" },
  { id: 3, label: "Tracción 4x4" },
];

const VehicleWrapper = forwardRef<HTMLDivElement, Props>(
  ({ setContent, setVehicle }, ref) => {
    const [view, setView] = useState<state>();
    const [deleting, setDeleting] = useState<null | number>(null);
    const [editing, setEditing] = useState<null | number>(null);
    const [selected, setSelected] = useState<null | number>(null);
    const [vehicles, setVehicles] = useState<SavedVehicle[] | null>(null);
    const [isDuplicated, setIsDuplicated] = useState<any>(null);
    const filter = useContext(VehicleTypesContext);

    const { user } = useContext(UserContext);
    const closeWindow = useContext(CloseWindowContext);

    const searchVehiclesLocal = async () => {
      if (user) {
        const { data: $vehicles }: { data: FetchedVehicle[] } =
          await axios.post("https://sitbusiness.co/mrp/api/28", {
            idusuario: 222222,
          });

        const formattedVehicles: SavedVehicle[] = $vehicles.map((v) => ({
          id: v.id,

          type:
            filter.vgl_tiposvehiculos.find((el) => el.id === v.tipovehiculo)
              ?.label ?? "indefinido",

          brand:
            filter.vgl_marcasvehiculos.find((el) => el.id === v.marca)?.label ??
            "indefinido",

          body:
            filter.vgl_carroceriasvehiculos.find((el) => el.id === v.carroceria)
              ?.label ?? "indefinido",

          fuel:
            combustibles.find((el) => el.id === v.tipocombustible)?.label ??
            "indefinido",

          transmision:
            transmisiones.find((el) => el.id === v.transmision)?.label ??
            "indefinido",

          traction:
            tracciones.find((el) => el.id === v.tipotraccion)?.label ??
            "indefinido",

          cilinder:
            filter.vgl_cilindrajesvehiculos.find(
              (el) => el.id === v.cilindrajemotor
            )?.label ?? "indefinido",

          year:
            filter.vgl_annosvehiculos.find((el) => el.id === v.anno)?.label ??
            "indefinido",

          model:
            filter.vgl_modelosvehiculos.find((el) => el.id == v.modelo)
              ?.label ?? "indefinido",
          ids: {
            body: v.carroceria.toString(),
            brand: v.marca.toString(),
            cilinder: v.cilindrajemotor.toString(),
            fuel: v.tipocombustible.toString(),
            model: v.modelo.toString(),
            traction: v.tipotraccion?.toString() ?? "",
            transmision: v.transmision?.toString() ?? "",
            type: v.tipovehiculo.toString(),
            year: v.anno.toString(),
          },
        }));

        setVehicles(formattedVehicles);
        return;
      } else {
        let vehicles: string | SavedVehicle[] | null =
          localStorage.getItem(key);
        if (vehicles) {
          vehicles = JSON.parse(vehicles);
          setVehicles(vehicles as SavedVehicle[]);
          return;
        }

        setVehicles([]);
      }
    };

    useEffect(() => {
      if (!user) {
        searchVehiclesLocal();
      }

      key = user ? keys.user.toString() : keys.guest.toString();
      setView(undefined);
      setSelected(null);
      setEditing(null);
    }, [user]);

    useEffect(() => {
      view === undefined && setView(state.Select);
    }, [view]);

    useEffect(() => {
      let vehicle;
      if (user) {
        vehicle = vehicles?.find((v) => v.id === selected);
      } else {
        const string = localStorage.getItem(key);
        vehicle = string
          ? (JSON.parse(string) as SavedVehicle[])[selected ?? 0]
          : null;
      }

      setVehicle(selected !== null ? (vehicle as SavedVehicle) : null);

      setContent(
        (selected !== null || selected === 0) && vehicle
          ? `${vehicle.brand}, ${vehicle.year}, ${vehicle.model}, ${
              vehicle.cilinder
            }, ${vehicle.fuel}${
              vehicle.transmision !== undefined
                ? ", " + vehicle.transmision
                : ""
            }`
          : "Agregar vehiculo"
      );
    }, [selected]);

    useEffect(() => {
      let saved: string | Array<SavedVehicle> | null =
        localStorage.getItem(key);

      if (saved) {
        setView(state.Select);
        setSelected(0);
      } else {
        setView(state.Filter);
      }
    }, []);

    useEffect(() => {
      searchVehiclesLocal();
    }, [editing, view, user]);

    return (
      <DuplicatedContext.Provider value={setIsDuplicated}>
        <Container ref={ref}>
          {isDuplicated && <ModalWarning />}
          <div onClick={closeWindow} className="close-icon-container ">
            <CloseIcon />
          </div>
          <SelectedContext.Provider value={{ selected, setSelected }}>
            <DeletingContext.Provider value={{ deleting, setDeleting }}>
              <FilterContext.Provider value={{ view, setView }}>
                <EditingContext.Provider value={{ editing, setEditing }}>
                  {vehicles &&
                    (view === state.Filter ? (
                      <Filter vehicles={vehicles} />
                    ) : view === state.Select ? (
                      <Select vehicles={vehicles} />
                    ) : view === state.Delete ? (
                      <Deleting vehicles={vehicles} />
                    ) : view === state.Warning ? (
                      <Warning />
                    ) : (
                      <>{editing !== null && <Edit vehicles={vehicles} />}</>
                    ))}
                </EditingContext.Provider>
              </FilterContext.Provider>
            </DeletingContext.Provider>
          </SelectedContext.Provider>
        </Container>
      </DuplicatedContext.Provider>
    );
  }
);

VehicleWrapper.displayName = "VehicleFilter";

export default VehicleWrapper;

const Container = styled.div`
  background-color: ${Themes.lightMain};
  border: 1px ${Themes.main} solid;
  border-radius: 8px;
  color: ${Themes.main};
  margin-top: 0.25rem;
  overflow: hidden;
  padding: 0.75rem;
  position: absolute;
  transition: 0.2s;
  translate: 0 -1rem;
  width: 100%;
  display: grid;

  &.hidden {
    display: none;
  }

  .close-icon-container {
    cursor: pointer;
    height: 1rem;
    margin-right: 1rem;
    position: absolute;
    right: 0;
    width: 1rem;

    svg {
      fill: ${Themes.main};
      margin-top: 0.75rem;
      width: 100%;
    }
  }

  @media screen and (min-width: ${Themes.lg}) {
    right: 0;
    width: 80%;
    translate: 0 -1.3rem;
  }
`;
