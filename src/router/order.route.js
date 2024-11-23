import { Router } from "express";
import { orderStatus, PlaceOrder } from "../controller/order.controller.js";
import { verifyJWT } from "../middleweres/auth.moddlewer.js";
import { adminverify } from "../middleweres/admin.middlewere.js";

const router = Router();
router.route("/placeorder").post(verifyJWT, PlaceOrder);
router.route("/orderstatus/:id").post(verifyJWT, adminverify, orderStatus);

export default router;
