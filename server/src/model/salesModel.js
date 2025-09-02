const mongoose = require("mongoose");
const { Schema } = mongoose;

const saleItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    priceAtSale: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1."],
    },
  },
  { _id: false }
);

const salesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },

    items: [saleItemSchema],
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", salesSchema);

module.exports = Sale;
