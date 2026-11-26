import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    product_id: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    installation: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        ret.user_id = ret.user ? ret.user.toString() : null;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

cartItemSchema.index({ user: 1, product_id: 1 }, { unique: true });

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
