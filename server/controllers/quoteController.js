import Quote from "../models/Quote.js";

// @desc    Create a new quote request
// @route   POST /api/quotes
export const createQuote = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      area,
      flooringType,
      budget,
      timeline,
      message,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    const quote = await Quote.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      projectType: projectType || "",
      area: area || "",
      flooringType: flooringType || "",
      budget: budget || "",
      timeline: timeline || "",
      message: message || "",
    });

    res.status(201).json({
      message: "Quote request received successfully",
      quote,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all quote requests
// @route   GET /api/quotes
export const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    next(error);
  }
};
