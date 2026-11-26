import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  area: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  unit_price: {
    type: Number,
    required: true,
    default: 0,
  },
  installation: {
    type: Boolean,
    default: false,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
      default: "AED",
    },
    order_items: [orderItemSchema],
    shippingAddress: {
      recipient_name: String,
      phone: String,
      line1: String,
      line2: String,
      city: String,
      emirate: String,
    },
    customerInfo: {
      name: String,
      email: String,
      phone: String,
    },
    notes: {
      type: String,
      default: "",
    },
    placed_at: {
      type: Date,
      default: Date.now,
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

orderSchema.pre("save", function () {
  if (!this.orderNumber) {
    this.orderNumber = `FF-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
  }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
