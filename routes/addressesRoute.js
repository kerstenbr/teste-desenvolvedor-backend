import express from "express";
import { createAddress, getAddresses, editAddress } from "../controllers/addressesController.js";
import { isLogged } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isLogged, createAddress);
router.get("/", isLogged, getAddresses);
router.put("/:id", isLogged, editAddress);

export default router;  