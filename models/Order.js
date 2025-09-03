import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  items: [
    {
      product: {
        type: String,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  address: { type: String, required: true, ref: "Address" },
  status: {
    type: String,
    required: true,
    default: "Order Placed",
  },
  date: {
    type: Date,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
