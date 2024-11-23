import mongoose, { Types } from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
    },
    description: {
      type: String,
      required: [true, "Food Item is required"],
    },
    foodtags: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "food price is required"],
    },
    imageurl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvalable: {
      type: Boolean,
      default: true,
    },
    restaurent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Foods = mongoose.model("Foods", foodSchema);
