const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A product must belong to a user."],
    },
    name: {
      type: String,
      required: [true, "A product must have a name."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price."],
      min: [0, "Price cannot be negative."],
    },
    quantity: {
      type: Number,
      required: [true, "A product must have a quantity."],
      min: [0, "Quantity cannot be negative."],
      default: 0,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
