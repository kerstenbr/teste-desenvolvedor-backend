import { Router } from "express";
import userRoute from "./userRoute.js";
import addressesRoute from "./addressesRoute.js";

const router = Router()

router.use("/user", userRoute)
router.use("/addresses", addressesRoute)

export default router;