import { Router } from "express";
import { createCategory, deleteCategory, getallCategory, updateCategory } from "../controller/category.controller.js";


const router = Router()

router.route("/create").post(createCategory)
router.route("/getAll").get(getallCategory)
router.route("/Update/:id").put(updateCategory)
router.route("/delete/:id").delete(deleteCategory)



export default router

