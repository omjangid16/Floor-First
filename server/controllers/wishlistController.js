import Wishlist from "../models/Wishlist.js";

// @desc    Get user's wishlist product IDs
// @route   GET /api/wishlist
export const getWishlist = async (req, res, next) => {
  try {
    const items = await Wishlist.find({ user: req.user._id });
    const productIds = items.map((item) => item.product_id);
    res.json(productIds);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle product in wishlist
// @route   POST /api/wishlist/toggle
export const toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const existing = await Wishlist.findOne({
      user: req.user._id,
      product_id: productId,
    });

    let isSaved = false;
    if (existing) {
      await Wishlist.deleteOne({ _id: existing._id });
      isSaved = false;
    } else {
      await Wishlist.create({
        user: req.user._id,
        product_id: productId,
      });
      isSaved = true;
    }

    const all = await Wishlist.find({ user: req.user._id });
    res.json({
      isSaved,
      ids: all.map((i) => i.product_id),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
export const removeFromWishlist = async (req, res, next) => {
  try {
    await Wishlist.deleteOne({
      user: req.user._id,
      product_id: req.params.productId,
    });
    const all = await Wishlist.find({ user: req.user._id });
    res.json({ ids: all.map((i) => i.product_id) });
  } catch (error) {
    next(error);
  }
};
