import { HobbyAttributes } from "@/types/hobby";

export const translateToPolish = (attribute: keyof HobbyAttributes) => {
  switch (attribute) {
    case "physicalActivityLevel":
      return "Poziom aktywności fizycznej";
    case "timeConsumption":
      return "Czasochłonność";
    case "sociability":
      return "Poziom socjalizacji";
    case "mobility":
      return "Potrzebna mobilność";
    case "competition":
      return "Poziom rywalizacji";
    case "relaxationLevel":
      return "Poziom relaksu";
    case "monetizationPotential":
      return "Potencjał zarobkowy";
    case "noiseLevel":
      return "Poziom hałasu";
    case "environmentalImpact":
      return "Wpływ na środowisko";
    case "mentalHealthImpact":
      return "Wpływ na zdrowie psychiczne";
    case "physicalHealthImpact":
      return "Wpływ na zdrowie fizyczne";
    case "artisticExpression":
      return "Wyrażanie artystyczne";
    case "initialCost":
      return "Koszt początkowy";
    case "ongoingCost":
      return "Koszt utrzymania";
    default:
      return attribute;
  }
};
