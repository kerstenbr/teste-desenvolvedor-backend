import express from "express";
import { createAddress, getAddresses } from "../controllers/addressesController.js";
import { isLogged } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isLogged, createAddress);
router.get("/", isLogged, getAddresses);

export default router;  