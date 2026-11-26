import CartItem from "../models/CartItem.js";

// @desc    Get current user's cart items
// @route   GET /api/cart
export const getCart = async (req, res, next) => {
  try {
    const items = await CartItem.find({ user: req.user._id });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// @desc    Sync / replace entire cart for user
// @route   PUT /api/cart
export const syncCart = async (req, res, next) => {
  try {
    const { items } = req.body; // array of { product_id, area, installation }

    // Clear old cart items for this user
    await CartItem.deleteMany({ user: req.user._id });

    if (Array.isArray(items) && items.length > 0) {
      const docs = items.map((item) => ({
        user: req.user._id,
        product_id: item.product_id,
        area: item.area || 0,
        installation: Boolean(item.installation),
      }));
      await CartItem.insertMany(docs);
    }

    const currentItems = await CartItem.find({ user: req.user._id });
    res.json(currentItems);
  } catch (error) {
    next(error);
  }
};

// @desc    Add or update item in cart
// @route   POST /api/cart
export const addToCart = async (req, res, next) => {
  try {
    const { product_id, area, installation } = req.body;

    if (!product_id) {
      return res.status(400).json({ message: "product_id is required" });
    }

    const item = await CartItem.findOneAndUpdate(
      { user: req.user._id, product_id },
      {
        $inc: { area: area || 0 },
        $set: { installation: Boolean(installation) },
      },
      { new: true, upsert: true }
    );

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove single item from cart
// @route   DELETE /api/cart/:productId
export const removeFromCart = async (req, res, next) => {
  try {
    await CartItem.deleteOne({
      user: req.user._id,
      product_id: req.params.productId,
    });
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
export const clearCart = async (req, res, next) => {
  try {
    await CartItem.deleteMany({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};
