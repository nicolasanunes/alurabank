import { Printable } from "./printable.js";

export function print(...objects: Array<Printable>) {
  for(let object of objects) {
    console.log(object.toText());
  }
}
