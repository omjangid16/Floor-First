import express from "express";
import {
  getMyOrders,
  createOrder,
  getOrderById,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getMyOrders)
  .post(createOrder);

router.get("/:id", getOrderById);

export default router;
