import { anshuman } from "./anshuman.js";
import { abhimanyu } from "./abhimanyu.js";
import { kshitij } from "./kshitij.js";

export { Persona } from "./Persona.js";

export const personas = {
  anshuman,
  abhimanyu,
  kshitij
};

export const publicPersonas = Object.values(personas).map((persona) =>
  persona.toPublicJSON()
);
