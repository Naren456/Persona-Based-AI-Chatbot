import express from "express";
import { getPersonas, getHealth } from "../controllers/personaController.js";

const router = express.Router();

router.get("/health", getHealth);
router.get("/personas", getPersonas);

export default router;
