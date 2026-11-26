import express from "express";
import {
  createQuote,
  getQuotes,
} from "../controllers/quoteController.js";

const router = express.Router();

router.route("/")
  .post(createQuote)
  .get(getQuotes);

export default router;
