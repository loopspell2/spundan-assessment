const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  items: [
    {
      item: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  gst: {
    type: Number,
    required: true,
    default: 0,
  },
  restaurantCharge: {
    type: Number,
    required: true,
    default: 0,
  },
  finalTotal: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
