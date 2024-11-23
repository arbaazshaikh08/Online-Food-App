import { Router } from "express";
import { verifyJWT } from "../middleweres/auth.moddlewer.js";
import {
  CreateResturant,
  deleteRestaurent,
  getAllRestaurant,
  getRestaurantById,
} from "../controller/Resturant.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, CreateResturant);
router.route("/getAll").post(verifyJWT, getAllRestaurant);
router.route("/get-restaurent/:id").get(verifyJWT, getRestaurantById);
router.route("/delete-restaurent/:id").delete(verifyJWT, deleteRestaurent);

export default router;
