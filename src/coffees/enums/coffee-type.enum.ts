import { registerEnumType } from "@nestjs/graphql";

export enum CoffeeType {
  ARABICA = "ARABICA",
  ROBUSTA = "ROBUSTA",

}

registerEnumType(CoffeeType, {
  name: "CoffeeType"
})