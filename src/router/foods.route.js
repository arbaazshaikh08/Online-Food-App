import { Router } from "express";
import {
  createFoods,
  deleteFood,
  getAllfoods,
  getFoodByRestaurant,
  getSingleFood,
  updateFoodItem,
} from "../controller/foods.controller.js";
import { verifyJWT } from "../middleweres/auth.moddlewer.js";

const router = Router();

router.route("/create-foods").post(verifyJWT, createFoods);
router.route("/get-all-Foods").get(verifyJWT, getAllfoods);
router.route("/get-Food/:id").get(verifyJWT, getSingleFood);
router.route("/get-restaurentBy/:id").get(verifyJWT, getFoodByRestaurant);
router.route("/update-food/:id").put(verifyJWT, updateFoodItem);
router.route("/delete-food/:id").delete(verifyJWT, deleteFood);

export default router;
