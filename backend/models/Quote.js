import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    projectType: {
      type: String,
      default: "",
    },
    area: {
      type: String,
      default: "",
    },
    flooringType: {
      type: String,
      default: "",
    },
    budget: {
      type: String,
      default: "",
    },
    timeline: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "quoted", "closed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;
