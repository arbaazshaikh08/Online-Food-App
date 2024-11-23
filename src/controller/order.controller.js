import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/AsyncHandlar.js";

// place order
const PlaceOrder = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  try {
    if (!cart) {
      throw new ApiError("Plese food cart or payment method");
    }
    let total = 0;

    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new Order({
      foods: cart,
      payment: total,
      buyer: req.user._id,
    });

    await newOrder.save();

    return res
      .status(200)
      .json(new ApiResponce(200, newOrder, "Order Placed successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});

// Order Controller
const orderStatus = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  try {
    if (!orderId) {
      throw new ApiError(404, "Please provide valid order id");
    }
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    return res.status(200).json(new ApiResponce(200, order, "order Status "));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
  }
});


export { PlaceOrder, orderStatus };
