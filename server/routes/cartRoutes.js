import express from "express";
import {
  getCart,
  syncCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getCart)
  .put(syncCart)
  .post(addToCart)
  .delete(clearCart);

router.delete("/:productId", removeFromCart);

export default router;
