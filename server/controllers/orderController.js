import Order from "../models/Order.js";
import CartItem from "../models/CartItem.js";

// @desc    Get user's orders
// @route   GET /api/orders
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ placed_at: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new order
// @route   POST /api/orders
export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      subtotal,
      total,
      currency = "AED",
      shippingAddress,
      customerInfo,
      notes,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    const order = await Order.create({
      user: req.user._id,
      items: items.map((i) => ({
        product_id: i.product?.id || i.product_id,
        product_name: i.product?.name || i.product_name,
        image: i.product?.image || i.image || "",
        area: i.area || 0,
        quantity: i.quantity || 1,
        unit_price: i.product?.pricePerSqft || i.unit_price || 0,
        installation: Boolean(i.includeInstallation ?? i.installation),
      })),
      order_items: items.map((i) => ({
        product_id: i.product?.id || i.product_id,
        product_name: i.product?.name || i.product_name,
        image: i.product?.image || i.image || "",
        area: i.area || 0,
        quantity: i.quantity || 1,
        unit_price: i.product?.pricePerSqft || i.unit_price || 0,
        installation: Boolean(i.includeInstallation ?? i.installation),
      })),
      subtotal: subtotal || 0,
      total: total || 0,
      currency,
      shippingAddress,
      customerInfo,
      notes: notes || "",
      status: "processing",
    });

    // Optionally clear cart for this user
    await CartItem.deleteMany({ user: req.user._id });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};
