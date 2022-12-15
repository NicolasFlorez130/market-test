/* eslint-disable react-hooks/exhaustive-deps */
import { createRef, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { updateVehicleById, VehicleWithId } from "../../core/fetch";
import { UserContext } from "../../pages/context/UserSlice";
import { VehicleTypesContext } from "../../pages/context/VehicleTypesSlice";
import { Themes } from "../../pages/StyleVariables";
import { FormattedVehicle } from "../../types/Filter";
import Button from "../Button";
import {
  DuplicatedContext,
  EditingContext,
  FilterContext,
  key,
  SavedVehicle,
  SelectedContext,
  state,
} from "./FilterWrapper";

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

interface Props {
  setIsLeaving: React.Dispatch<React.SetStateAction<boolean>>;
  vehicles: SavedVehicle[];
}

const Edit = ({ vehicles, setIsLeaving }: Props) => {
  const filter = useContext(VehicleTypesContext);
  const { setView } = useContext(FilterContext);
  const { setSelected } = useContext(SelectedContext);
  const { editing: index } = useContext(EditingContext);
  const setDuplicate = useContext(DuplicatedContext);
  const { user } = useContext(UserContext);

  const editingVehicle = vehicles[index];

  const [locked, setLocked] = useState(true);

  const [type, setType] = useState<string | null>(editingVehicle.ids.type);
  const [body, setBody] = useState<string | null>(editingVehicle.ids.body);
  const [year, setYear] = useState<string | null>(editingVehicle.ids.year);
  const [brand, setBrand] = useState<string | null>(editingVehicle.ids.brand);
  const [fuel, setFuel] = useState<string | null>(editingVehicle.ids.fuel);
  const [transmision, setTransmision] = useState<string | null>(
    editingVehicle.ids.transmision
  );
  const [traction, setTraction] = useState<string | null>(
    editingVehicle.ids.traction
  );
  const [cilinder, setCilinder] = useState<string | null>(
    editingVehicle.ids.cilinder
  );
  const [model, setModel] = useState<string | null>(editingVehicle.ids.model);

  const [isValid, setIsValid] = useState<Boolean>(false);

  const typeInput = createRef<HTMLSelectElement>();
  const bodyInput = createRef<HTMLSelectElement>();
  const brandInput = createRef<HTMLSelectElement>();
  const yearInput = createRef<HTMLSelectElement>();
  const tractionInput = createRef<HTMLSelectElement>();
  const modelInput = createRef<HTMLSelectElement>();
  const cilinderInput = createRef<HTMLSelectElement>();
  const fuelInput = createRef<HTMLSelectElement>();
  const transmisionInput = createRef<HTMLSelectElement>();

  const motorbikeSelected =
    parseInt(type ?? "") ===
    filter.vgl_tiposvehiculos.find(
      (type) => type.label.toLowerCase() === "motos"
    )?.id;

  const electricSelected =
    parseInt(type ?? "") ===
    filter.vgl_tiposvehiculos.find(
      (type) => type.label.toLowerCase() === "eléctricos"
    )?.id;

  const submitVehicle = async () => {
    let saved = [...vehicles];

    const newVehicle = {
      type: filter.vgl_tiposvehiculos.find(
        (el) => el.id === parseInt(type ?? "")
      )?.label,

      brand: filter.vgl_marcasvehiculos.find(
        (el) => el.id === parseInt(brand ?? "")
      )?.label,

      body: filter.vgl_carroceriasvehiculos.find(
        (el) => el.id === parseInt(body ?? "")
      )?.label,

      fuel: combustibles.find((el) => el.id === parseInt(fuel ?? ""))?.label,

      traction: tracciones.find((el) => el.id === parseInt(traction ?? ""))
        ?.label,

      transmision: transmisiones.find(
        (el) => el.id === parseInt(transmision ?? "")
      )?.label,

      cilinder: filter.vgl_cilindrajesvehiculos.find(
        (el) => el.id === parseInt(cilinder ?? "")
      )?.label,

      year: filter.vgl_annosvehiculos.find(
        (el) => el.id === parseInt(year ?? "")
      )?.label,

      model: filter.vgl_modelosvehiculos.find(
        (el) => el.id === parseInt(model ?? "")
      )?.label,

      ids: {
        body,
        brand,
        cilinder,
        fuel,
        model,
        traction,
        transmision,
        type,
        year,
      },
    } as SavedVehicle;

    let duplicate = false;

    saved.forEach((vehicle) => {
      const rotationKeys = Object.values(vehicle.ids);
      const newVehicleKeys = Object.values(newVehicle.ids);

      console.log(Object.keys(vehicle.ids), Object.keys(newVehicle.ids));

      let equals = true;

      rotationKeys.forEach((rK, i) => {
        rK !== newVehicleKeys[i] ? (equals = false) : 0;
      });

      equals ? (duplicate = true) : 0;
    });

    if (duplicate) {
      setDuplicate(true);
      return;
    }

    if (user) {
      const formattedVehicle = {
        id: editingVehicle.id ?? 0,
        anno: parseInt(newVehicle.ids.year),
        carroceria: parseInt(newVehicle.ids.body),
        cilindrajemotor: parseInt(newVehicle.ids.cilinder),
        comentario: "Vehiculo agregado desde el filtro de busqueda",
        estado: 1,
        marca: parseInt(newVehicle.ids.brand),
        modelo: parseInt(newVehicle.ids.model),
        tipocombustible: parseInt(newVehicle.ids.fuel),
        tipotraccion: parseInt(newVehicle.ids.traction),
        tipovehiculo: parseInt(newVehicle.ids.type),
        transmision: parseInt(newVehicle.ids.transmision),
      };
      await updateVehicleById(formattedVehicle as VehicleWithId);

      setSelected(editingVehicle.id);
    } else {
      (saved as SavedVehicle[]).splice(index, 1, newVehicle);
      setSelected(index);
    }

    setView(state.Select);
  };

  useEffect(() => {
    if (locked) return;

    if (bodyInput.current) bodyInput.current.selectedIndex = 0;
    if (brandInput.current) brandInput.current.selectedIndex = 0;
    if (tractionInput.current) tractionInput.current.selectedIndex = 0;

    setBody(null);
    setBrand(null);
    setTraction(null);
  }, [type]);

  useEffect(() => {
    if (locked) return;

    if (brandInput.current) brandInput.current.selectedIndex = 0;

    setBrand(null);
  }, [body]);

  useEffect(() => {
    if (locked) return;

    if (modelInput.current) modelInput.current.selectedIndex = 0;

    setModel(null);
  }, [brand]);

  useEffect(() => {
    if (locked) return;

    if (cilinderInput.current) cilinderInput.current.selectedIndex = 0;
    if (fuelInput.current) fuelInput.current.selectedIndex = 0;

    setCilinder(null);
    setFuel(null);
  }, [model]);

  useEffect(() => {
    setIsValid(() => {
      if (type && body && brand && year) {
        if (traction || (!traction && motorbikeSelected)) {
          if (model && cilinder && fuel) {
            if (transmision || (!transmision && electricSelected)) {
              return true;
            }
          }
        }
      }
      return false;
    });
  }, [type, brand, body, fuel, transmision, traction, cilinder, year, model]);

  return (
    <Container>
      <div className="top">
        <p>Edita tu vehiculo</p>
        <Button disabled={!locked} onclick={() => setLocked(false)}>
          Comenzar a editar
        </Button>
      </div>
      <div className="filters-container">
        <div className="selects-rows row-1">
          <select
            disabled
            ref={typeInput}
            defaultValue={editingVehicle.ids.type}
            onChange={(e) => setType(e.target.value)}
            className={`first-select ${type == "n" && "not-selected"}`}
            name="type"
            id="type"
          >
            <option value="n" disabled>
              Tipo
            </option>
            {filter.vgl_tiposvehiculos.map((type) => (
              <option value={type.id} key={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            className={`${type == "n" && "not-selected"}`}
            ref={bodyInput}
            name="body"
            id="body"
            disabled={!type || locked}
            defaultValue={editingVehicle.ids.body}
            onChange={(e) => setBody(e.target.value)}
          >
            <option value="n" disabled>
              Carrocería
            </option>
            {type &&
              filter.vgl_carroceriasvehiculos
                .filter((body) => body.tipovehiculo === parseInt(type))
                .map((body) => (
                  <option value={body.id} key={body.id}>
                    {body.label}
                  </option>
                ))}
          </select>
          <select
            ref={brandInput}
            name="brand"
            id="brand"
            disabled={!type || !body || locked}
            defaultValue={editingVehicle.ids.brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option disabled value="n">
              Marca
            </option>
            {type &&
              body &&
              filter.vgl_marcasvehiculos
                .filter(
                  (brand, i) =>
                    brand.tipovehiculo === parseInt(type) &&
                    brand.carroceria === parseInt(body) &&
                    filter.vgl_marcasvehiculos.at(i - 1)?.id !== brand.id
                )
                .map((brand, i) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.label}
                  </option>
                ))}
          </select>
          <select
            ref={yearInput}
            name="year"
            id="year"
            disabled={!type || locked}
            defaultValue={editingVehicle.ids.year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option disabled value="n">
              Año
            </option>
            {filter.vgl_annosvehiculos.map((year) => (
              <option value={year.id} key={year.id}>
                {year.label}
              </option>
            ))}
          </select>
          <select
            ref={tractionInput}
            name="traction"
            id="traction"
            disabled={!type || motorbikeSelected || locked}
            defaultValue={editingVehicle.ids.traction}
            onChange={(e) => setTraction(e.target.value)}
          >
            <option disabled value="n">
              Tracción
            </option>
            {!motorbikeSelected &&
              tracciones.map((model) => (
                <option value={model.id} key={model.id}>
                  {model.label}
                </option>
              ))}
          </select>
        </div>
        <div className="selects-rows row-2">
          <select
            ref={modelInput}
            name="model"
            id="model"
            disabled={!brand || locked}
            defaultValue={editingVehicle.ids.model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option disabled value="n">
              Modelo
            </option>
            {brand &&
              body &&
              filter.vgl_modelosvehiculos
                .filter(
                  (model) =>
                    model.marca === parseInt(brand) &&
                    model.carroceria === parseInt(body)
                )
                .map((model) => (
                  <option value={model.id} key={model.id}>
                    {model.label}
                  </option>
                ))}
          </select>
          <select
            ref={cilinderInput}
            name="cilinder"
            id="cilinder"
            disabled={!model || locked}
            defaultValue={editingVehicle.ids.cilinder}
            onChange={(e) => setCilinder(e.target.value)}
          >
            <option disabled value="n">
              Cilindraje
            </option>
            {model &&
              filter.vgl_cilindrajesvehiculos
                .filter((cilinder) => cilinder.modelo === parseInt(model))
                .map((cilinder) => (
                  <option value={cilinder.id} key={cilinder.id}>
                    {cilinder.label}
                  </option>
                ))}
          </select>
          <select
            ref={fuelInput}
            name="fuel"
            id="fuel"
            disabled={!model || locked}
            defaultValue={editingVehicle.ids.fuel}
            onChange={(e) => setFuel(e.target.value)}
          >
            <option disabled value="n">
              Combustible
            </option>
            {model &&
              combustibles.map((fuel) => (
                <option value={fuel.id} key={fuel.id}>
                  {fuel.label}
                </option>
              ))}
          </select>
          <select
            ref={transmisionInput}
            name="transmision"
            id="transmision"
            disabled={!fuel || electricSelected || locked}
            defaultValue={editingVehicle.ids.transmision}
            onChange={(e) => setTransmision(e.target.value)}
          >
            <option disabled value="n">
              Transmisión
            </option>
            {!electricSelected &&
              transmisiones.map((tr) => (
                <option value={tr.id} key={tr.id}>
                  {tr.label}
                </option>
              ))}
          </select>
        </div>
        <div className="buttons-container">
          <Button secondary onclick={() => setIsLeaving(true)}>
            Cancelar
          </Button>
          <Button onclick={submitVehicle} disabled={!isValid || locked}>
            Listo
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Edit;

const Container = styled.div`
  .top {
    align-items: center;
    display: flex;
    gap: 2rem;
    margin-bottom: 0.75rem;

    p {
      color: ${Themes.main};
      display: inline;
      font-weight: bold;
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    button {
      margin: 0;
      margin-right: 1.5rem;
    }
  }

  .filters-container {
    display: grid;

    @media screen and (min-width: ${Themes.lg}) {
      gap: 0 1rem;
    }

    .selects-rows {
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: hidden;
      background-color: ${Themes.offWhite};
      font-weight: 500;

      @media screen and (min-width: ${Themes.lg}) {
        border-radius: 9999px !important;
      }

      &.row-1 {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;

        @media screen and (min-width: ${Themes.lg}) {
          grid-template-columns: repeat(5, 1fr);
        }
      }

      &.row-2 {
        border-bottom-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        margin-bottom: 1rem;

        @media screen and (min-width: ${Themes.lg}) {
          grid-template-columns: repeat(4, 1fr);
          margin: 1rem 0;
        }
      }

      select {
        appearance: none;
        color: ${Themes.main};
        font-weight: 700;
        padding: 0.5rem;
        transition: 0.2s;

        background: url(./down-blue-arrow.png) white 97% center / 12px auto;
        background-repeat: no-repeat;

        &:disabled {
          color: rgba(0, 0, 0, 0.6);
          background-color: rgba(211, 211, 211, 0.2);
          font-weight: 500;
        }

        &.first-select {
          grid-column: 1 / -1;

          @media screen and (min-width: ${Themes.lg}) {
            grid-column: auto;
          }
        }
      }
    }
  }

  .buttons-container {
    display: flex;
    width: 100%;
    justify-content: end;
  }
`;
