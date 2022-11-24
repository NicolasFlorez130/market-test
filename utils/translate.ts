export default function translate(string: String) {
  switch (string) {
    case "brand":
      return "Marca";
    case "vehicleType":
      return "Tipo";
    case "body":
      return "Carrocería";
    case "cilinderCapacity":
      return "Cilindraje";
    case "transmision":
      return "Transmisión";
    case "tractionType":
      return "Tracción";
    case "fuelType":
      return "Combustible";
    default:
  }
}
