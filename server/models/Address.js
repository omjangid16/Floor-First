import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    label: {
      type: String,
      default: "Home",
      trim: true,
    },
    recipient_name: {
      type: String,
      required: [true, "Recipient name is required"],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    line1: {
      type: String,
      required: [true, "Address line 1 is required"],
      trim: true,
    },
    line2: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      default: "Dubai",
      trim: true,
    },
    emirate: {
      type: String,
      default: "Dubai",
      trim: true,
    },
    is_default: {
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

const Address = mongoose.model("Address", addressSchema);
export default Address;
