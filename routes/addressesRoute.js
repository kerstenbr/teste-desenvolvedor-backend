import express from "express";
import { createAddress, getAddresses, editAddress, deleteAddress, shareAddress, seeAddress } from "../controllers/addressesController.js";
import { isLogged } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isLogged, createAddress);
router.get("/", isLogged, getAddresses);
router.put("/:id", isLogged, editAddress);
router.delete("/:id", isLogged, deleteAddress);
router.post("/:id/share", isLogged, shareAddress);
router.get("/shared/:token", seeAddress);

export default router;  