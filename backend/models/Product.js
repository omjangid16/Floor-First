import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subCategory: {
      type: String,
      default: "",
    },
    pricePerSqft: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    features: {
      type: [String],
      default: [],
    },
    specs: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
