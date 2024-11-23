import mongoose from "mongoose";
import { Foods } from "../models/food.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/AsyncHandlar.js";

// Create Foods
const createFoods = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    foodtags,
    price,
    imageurl,
    category,
    code,
    isAvalable,
    restaurent,
    rating,
    ratingCount,
  } = req.body;

  if ([title, description , price, restaurent].some((field) => field?.trim() === "")) {
    throw new ApiError(500, "Please Provide All Feilds");
  }
  if (restaurent && !mongoose.Types.ObjectId.isValid(restaurent)) {
    throw new ApiError(400,"Invalid Restarunt refrence" )
  }

  const newFoods = await Foods({
    title,
    description,
    foodtags,
    price,
    imageurl,
    category,
    code,
    isAvalable,
    restaurent,
    rating,
    ratingCount,
  });

  await newFoods.save();

  return res
    .status(200)
    .json(new ApiResponce(200, newFoods, "New Food Item Created"));
});

// get food
const getAllfoods = asyncHandler(async (req, res) => {
  const foods = await Foods.find({});
  
  if (!foods || foods.length === 0) {
    throw new ApiError(404, "No foods item found");
  }

  return res
    .status(200)
    .json(
      new ApiResponce(
        200,
        { totalFoods: foods.length, foods },
        "All foods fetch successfully"
      )
    );
});

//Get Sungle Food
const getSingleFood = asyncHandler(async (req, res) => {
  const foodId = req.params.id;
  if (!foodId) {
    throw new ApiError(404, "Please provide ID");
  }
  const food = await Foods.findById(foodId);
  if (!food) {
    throw new ApiError(404, "No food found with this id");
  }

  return res.status(200).json(new ApiResponce(200, food));
});

// Get Food By Resturent
const getFoodByRestaurant = asyncHandler(async (req, res) => {
  const restaurentId = req.params.id;
  try {
    if (!restaurentId) {
      throw new ApiError(404, "Please provide ID");
    }
    const food = await Foods.find({ restaurent: restaurentId });
    if (!food) {
      throw new ApiError(404, "No food found with this id");
    }

    return res
      .status(200)
      .json(new ApiResponce(200, food, " food base of Restaurant"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

// Updated Food Item
const updateFoodItem = asyncHandler(async (req, res) => {
  const foodId = req.params.id;
  try {
    if (!foodId) {
      throw new ApiError(404, "No food id was found");
    }

    const food = await Foods.findById(foodId);
    if (!food) {
      throw new ApiError(404, "No Food found");
    }

    const {
      title,
      description,
      foodtags,
      price,
      imageurl,
      category,
      code,
      isAvalable,
      restaurent,
      rating,
      ratingCount,
    } = req.body;

    const updatedFood = await Foods.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        foodtags,
        price,
        imageurl,
        category,
        code,
        isAvalable,
        restaurent,
        rating,
        ratingCount,
      },
      { new: true }
    );

    return res
      .status(200)
      .json(new ApiResponce(200, updatedFood, "Foods Item was updated"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

// Delete Foods
const deleteFood = asyncHandler(async (req, res) => {
  const foodId = req.params.id;
  try {
    if (!foodId) {
      throw new ApiError(400, "Food item is not Found");
    }
    const food = await Foods.findById(foodId);
    if (!food) {
      throw new ApiError(404, "No food found");
    }
    const deleteFood = await Foods.findByIdAndDelete(foodId);
  
    return res
      .status(200)
      .json(new ApiResponce(200, deleteFood, "Food deleted Successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" })
  }
});

export {
  createFoods,
  getAllfoods,
  getSingleFood,
  getFoodByRestaurant,
  updateFoodItem,
  deleteFood,
};
