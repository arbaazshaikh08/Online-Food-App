import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandlar.js";

export const adminverify = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.usertype !== "admin") {
      throw new ApiError(401, "Only Admin Access");
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" })
  }
});
