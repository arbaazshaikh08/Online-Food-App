import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "delivery"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Oreder", orderSchema);
