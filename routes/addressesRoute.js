import express from "express";
import { createAddress, getAddresses, editAddress, deleteAddress } from "../controllers/addressesController.js";
import { isLogged } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isLogged, createAddress);
router.get("/", isLogged, getAddresses);
router.put("/:id", isLogged, editAddress);
router.delete("/:id", isLogged, deleteAddress);

export default router;  