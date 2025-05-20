import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/AsyncHandlar.js";

// create Category
const createCategory = asyncHandler(async (req, res) => {
  const { title, imageurl } = req.body;

  try {
    if (!title) {
      throw new ApiError(400, "Please provide caregory title");
    }

    const newCategory = new Category({ title, imageurl });
    await newCategory.save();

    return res
      .status(200)
      .json(new ApiResponce(201, newCategory, "Category create Successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

// get All Category
const getallCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  try {
    if (!categories || categories.length === 0) {
      throw new ApiError(404, "No Categories found");
    }

    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          { totalCat: categories.length, categories },
          "Get All categories"
        )
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
  try {
  const { id } = req.params;
if (!id) {
  throw new ApiError(404, "Please provide Category ID");
}
  const { title, imageurl } = req.body;
 if (!title || !imageurl) {
    throw new ApiError(400, "Please provide title and imageurl");
  }
 
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title, imageurl },
      { new: true }
    );
    if (!updatedCategory) {
      throw new ApiError(500, "No category found");
    }
 
    return res
      .status(200)
      .json(
        new ApiResponce(200, updatedCategory, "Categoryupdated Successfully")
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

// delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new ApiError(404, "Please provide Category ID");
    }

    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(500, "No Category Found With this id");
    }

    await Category.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponce(200, "category Deleted succssfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

export { createCategory, getallCategory, updateCategory, deleteCategory };
