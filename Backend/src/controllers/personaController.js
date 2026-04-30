import { publicPersonas } from "../personas/personas.js";

export const getPersonas = (_req, res) => {
  res.json({ personas: publicPersonas });
};

export const getHealth = (_req, res) => {
  res.json({ ok: true, personas: publicPersonas.map((persona) => persona.id) });
};
