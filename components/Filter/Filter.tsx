/* eslint-disable react-hooks/exhaustive-deps */
import { createRef, useContext, useEffect, useState } from "react";
import { VehicleTypesContext } from "../../pages/context/VehicleTypesSlice";
import Button from "../Button";
import {
  FilterContext,
  key,
  SavedVehicle,
  SelectedContext,
  state,
} from "./VehicleFilter";

const Filter = () => {
  const filters = useContext(VehicleTypesContext);
  const { setView } = useContext(FilterContext);
  const { setSelected } = useContext(SelectedContext);

  const [type, setType] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const [fuel, setFuel] = useState<string | null>(null);
  const [transmision, setTransmision] = useState<string | null>(null);
  const [traction, setTraction] = useState<string | null>(null);
  const [cilinder, setCilinder] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);

  const [isValid, setIsValid] = useState<Boolean>(false);

  const brandInput = createRef<HTMLSelectElement>();
  const modelInput = createRef<HTMLSelectElement>();
  const cilinderInput = createRef<HTMLSelectElement>();
  const fuelInput = createRef<HTMLSelectElement>();
  const transmisionInput = createRef<HTMLSelectElement>();
  const tractionInput = createRef<HTMLSelectElement>();

  const motorbikeSelected =
    parseInt(type ?? "") ===
    filters.vehicleType.find((type) => type.name.toLowerCase() === "moto")?.id;

  const electricSelected =
    parseInt(fuel ?? "") ===
    filters.fuelType.find((fuel) => fuel.name.toLowerCase() === "eléctrico")
      ?.id;

  const submitVehicle = () => {
    let saved: string | Array<any> | null = localStorage.getItem(key);

    if (saved) {
      saved = JSON.parse(saved);
    } else {
      saved = [];
    }
    const newVehicle = {
      type: filters.vehicleType.find((el) => el.id === parseInt(type ?? ""))
        ?.name,

      brand: filters.brand.find((el) => el.id === parseInt(brand ?? ""))?.name,

      body: filters.body.find((el) => el.id === parseInt(body ?? ""))?.name,

      fuel: filters.fuelType.find((el) => el.id === parseInt(fuel ?? ""))?.name,

      transmision: filters.transmision.find(
        (el) => el.id === parseInt(transmision ?? "")
      )?.name,

      traction: filters.tractionType.find(
        (el) => el.id === parseInt(traction ?? "")
      )?.name,

      cilinder: filters.cilinderCapacity.find(
        (el) => el.id === parseInt(cilinder ?? "")
      )?.name,

      year,

      model: filters.vehicleModel.find((el) => el.id === parseInt(model ?? ""))
        ?.name,
    } as SavedVehicle;

    (saved as SavedVehicle[]).push(newVehicle);

    localStorage.setItem(key, JSON.stringify(saved));

    setView(state.Select);
    setSelected(saved && saved.length - 1);
  };

  useEffect(() => {
    if (brandInput.current) brandInput.current.selectedIndex = 0;
    if (tractionInput.current) tractionInput.current.selectedIndex = 0;

    setBrand(null);
    setTraction(null);
  }, [type]);

  useEffect(() => {
    if (modelInput.current) modelInput.current.selectedIndex = 0;
    if (cilinderInput.current) cilinderInput.current.selectedIndex = 0;

    setModel(null);
    setCilinder(null);
  }, [brand]);

  useEffect(() => {
    if (cilinderInput.current) cilinderInput.current.selectedIndex = 0;
    if (fuelInput.current) fuelInput.current.selectedIndex = 0;
    if (transmisionInput.current) transmisionInput.current.selectedIndex = 0;

    setCilinder(null);
    setFuel(null);
    setTransmision(null);
  }, [model]);

  useEffect(() => {
    if (transmisionInput.current) transmisionInput.current.selectedIndex = 0;

    setTransmision(null);
  }, [fuel]);

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
    <>
      <p className="mb-4 text-lg font-bold text-main">
        Agregar tu vehiculo para filtrar tu busqueda
      </p>
      <div className="grid lg:gap-y-4">
        <div className="selects-rows grid grid-cols-2 overflow-hidden rounded-t-lg bg-offWhite font-medium lg:grid-cols-5 lg:rounded-full">
          <select
            className="col-span-full p-2 lg:col-auto"
            defaultValue="n"
            onChange={(e) => setType(e.target.value)}
            name="type"
            id="type"
          >
            <option value="n" disabled>
              Tipo
            </option>
            {filters.vehicleType.map((type) => (
              <option value={type.id} key={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <select
            className="p-2"
            name="body"
            id="body"
            disabled={!type}
            defaultValue="n"
            onChange={(e) => setBody(e.target.value)}
          >
            <option value="n" disabled>
              Carrocería
            </option>
            {type &&
              filters.body
                .filter((body) => body.vehicleTypeId === parseInt(type))
                .map((body) => (
                  <option value={body.id} key={body.id}>
                    {body.name}
                  </option>
                ))}
          </select>
          <select
            ref={brandInput}
            className="p-2"
            name="brand"
            id="brand"
            disabled={!type}
            defaultValue="n"
            onChange={(e) => setBrand(e.target.value)}
          >
            <option disabled value="n">
              Marca
            </option>
            {type &&
              filters.brand
                .filter((brand) => brand.vehicleTypeId === parseInt(type))
                .map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
          </select>
          <select
            className="p-2"
            name="year"
            id="year"
            disabled={!type}
            defaultValue="n"
            onChange={(e) => setYear(e.target.value)}
          >
            <option disabled value="n">
              Año
            </option>
            {[...Array(12)].map((n, i) => (
              <option value={2010 + i} key={i}>
                {2010 + i}
              </option>
            ))}
          </select>
          <select
            ref={tractionInput}
            className="p-2"
            name="traction"
            id="traction"
            disabled={!type || motorbikeSelected}
            defaultValue="n"
            onChange={(e) => setTraction(e.target.value)}
          >
            <option disabled value="n">
              Tracción
            </option>
            {type &&
              !motorbikeSelected &&
              filters.tractionType.map((model) => (
                <option value={model.id} key={model.id}>
                  {model.name}
                </option>
              ))}
          </select>
        </div>
        <div className="selects-rows mb-4 grid grid-cols-2 overflow-hidden rounded-b-lg bg-offWhite font-medium lg:grid-cols-4 lg:rounded-full">
          <select
            ref={modelInput}
            className="p-2"
            name="model"
            id="model"
            disabled={!brand}
            defaultValue="n"
            onChange={(e) => setModel(e.target.value)}
          >
            <option disabled value="n">
              Modelo
            </option>
            {brand &&
              filters.vehicleModel
                .filter((model) => model.brandId === parseInt(brand))
                .map((model) => (
                  <option value={model.id} key={model.id}>
                    {model.name}
                  </option>
                ))}
          </select>
          <select
            ref={cilinderInput}
            className="p-2"
            name="cilinder"
            id="cilinder"
            disabled={!model}
            defaultValue="n"
            onChange={(e) => setCilinder(e.target.value)}
          >
            <option disabled value="n">
              Cilindraje
            </option>
            {model &&
              filters.cilinderCapacity
                .filter(
                  (cilinder) => cilinder.vehicleModelId === parseInt(model)
                )
                .map((cilinder) => (
                  <option value={cilinder.id} key={cilinder.id}>
                    {cilinder.name}
                  </option>
                ))}
          </select>
          <select
            ref={fuelInput}
            className="p-2"
            name="fuel"
            id="fuel"
            disabled={!model}
            defaultValue="n"
            onChange={(e) => setFuel(e.target.value)}
          >
            <option disabled value="n">
              Combustible
            </option>
            {model &&
              filters.fuelType.map((fuel) => (
                <option value={fuel.id} key={fuel.id}>
                  {fuel.name}
                </option>
              ))}
          </select>
          <select
            ref={transmisionInput}
            className="p-2"
            name="transmision"
            id="transmision"
            disabled={!fuel || electricSelected}
            defaultValue="n"
            onChange={(e) => setTransmision(e.target.value)}
          >
            <option disabled value="n">
              Transmisión
            </option>
            {fuel &&
              !electricSelected &&
              filters.transmision.map((tr) => (
                <option value={tr.id} key={tr.id}>
                  {tr.name}
                </option>
              ))}
          </select>
        </div>
        <div className="button-container flex w-full justify-end">
          <Button
            onclick={() => setView(state.Select)}
            // disabled={
            //   localStorage.getItem(key) === "[]" ||
            //   localStorage.getItem(key) === null
            // }
          >
            Cancelar
          </Button>
          <Button onclick={submitVehicle} disabled={!isValid}>
            Listo
          </Button>
        </div>
      </div>
    </>
  );
};

export default Filter;
