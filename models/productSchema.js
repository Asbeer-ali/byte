const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  ProductName: {
    type: String,
    required: true,
  },
  ProductDescription: {
    type: String,
  },
  Ram: {
    type: String,
  },
  Storage: {
    type: String,
  },
  Proccessor: {
    type: String,
  },
  ActualPrice: {
    type: Number,
  },
  DiscountPrice: {
    type: Number,
  },
  StockQuantity: {
    type: Number,
  },
  ProductCategory: {
    type: String,
  },
  Images: {
    type: Array,
  },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
