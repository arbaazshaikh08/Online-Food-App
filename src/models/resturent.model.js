import mongoose from "mongoose";

const resturantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resturant title is required"],
    },
    imageurl: {
      type: String,
    },
    foods: {
      type: Array,
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isopen: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    logourl: {
      type: String,
    },
    ratingCount: { type: String },
    code: {
      type: String,
    },
    coords: {
      id: { type: Number },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", resturantSchema);
