import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shop",
    },
    category: {
      type: String,
      enum: [
        "Handlooms & Textiles",
        "Apparel & Fashion",
        "Home & Living",
        "Electronics & Appliances",
        "Stationery & Office Supplies",
        "Health & Wellness",
        "Food & Beverages",
        "Bamboo & Sustainable Products",
        "Industrial & Raw Materials",
        "Automobile & Spare Parts",
        "Logistics & Packaging",
        "Export-Exclusive Section",
        "others",
      ],
      require: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
      required: true,
    },
    description: {
      type: String,
    },
    unit: {
      type: String,
      enum: ["piece", "kg", "box"],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
