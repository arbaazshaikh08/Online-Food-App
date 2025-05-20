import { Restaurant } from "../models/resturent.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/AsyncHandlar.js";

// create Restaurant
const CreateResturant = asyncHandler(async (req, res) => {
  const {
    title,
    imageurl,
    foods,
    time,
    pickup,
    delivery,
    isopen,
    logourl,
    rating,
    ratingCount,
    coords,
  } = req.body;

  try {
    // Validation
    if (!title || !coords) {
      throw new ApiError(400, "Please Provide address and title");
    }

    const newRestaurant = await Restaurant.create({
      title,
      imageurl,
      foods,
      time,
      pickup,
      delivery,
      isopen,
      logourl,
      rating,
      ratingCount,
      coords,
    });

    return res
      .status(201)
      .json(
        new ApiResponce(201, newRestaurant, "New Resturent Create Successfully")
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

// get all Restautent
const getAllRestaurant = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({});

  // Check if the restaurants array is empty
  try {
    if (!restaurants || restaurants.length === 0) {
      throw new ApiError(404, "No Restaurants Available");
    }

    return res.status(200).json(
      new ApiResponce(200, {
        totalCount: restaurants.length,
        restaurants,
      })
    );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

// get  Restautent By id
const getRestaurantById = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  try {
    if (!restaurantId) {
      throw new ApiError(404, "Please provide Restaurent ID");
    }
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new ApiError(404, "Restaurent Not Found");
    }

    return res
      .status(200)
      .json(new ApiResponce(200, restaurant, "Restaurent finded Successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

//delete Resturent
const deleteRestaurent = asyncHandler(async (req, res) => {
  try {
    const restaurantId = req.params;
    if (!restaurantId) {
      throw new ApiError(404, "No Restaurent found or Provide ID");
    }
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

    return res
      .status(200)
      .json(
        new ApiResponce(200, restaurant, "Restaurent Deleted sucesssfully")
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

export {
  CreateResturant,
  getAllRestaurant,
  getRestaurantById,
  deleteRestaurent,
};
