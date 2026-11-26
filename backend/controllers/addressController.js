import Address from "../models/Address.js";

// @desc    Get all addresses for logged-in user
// @route   GET /api/addresses
export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user._id })
      .sort({ is_default: -1, createdAt: -1 });
    res.json(addresses);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new delivery address
// @route   POST /api/addresses
export const addAddress = async (req, res, next) => {
  try {
    const {
      label,
      recipient_name,
      phone,
      line1,
      line2,
      city,
      emirate,
      is_default,
    } = req.body;

    if (!recipient_name?.trim() || !line1?.trim()) {
      return res.status(400).json({ message: "Recipient name and line 1 are required" });
    }

    const count = await Address.countDocuments({ user: req.user._id });
    const shouldBeDefault = Boolean(is_default) || count === 0;

    if (shouldBeDefault) {
      await Address.updateMany(
        { user: req.user._id },
        { $set: { is_default: false } }
      );
    }

    const address = await Address.create({
      user: req.user._id,
      label: label?.trim() || "Home",
      recipient_name: recipient_name.trim(),
      phone: phone?.trim() || "",
      line1: line1.trim(),
      line2: line2?.trim() || "",
      city: city?.trim() || "Dubai",
      emirate: emirate?.trim() || "Dubai",
      is_default: shouldBeDefault,
    });

    res.status(201).json(address);
  } catch (error) {
    next(error);
  }
};

// @desc    Update address
// @route   PUT /api/addresses/:id
export const updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    const {
      label,
      recipient_name,
      phone,
      line1,
      line2,
      city,
      emirate,
      is_default,
    } = req.body;

    if (label !== undefined) address.label = label.trim();
    if (recipient_name !== undefined) address.recipient_name = recipient_name.trim();
    if (phone !== undefined) address.phone = phone.trim();
    if (line1 !== undefined) address.line1 = line1.trim();
    if (line2 !== undefined) address.line2 = line2.trim();
    if (city !== undefined) address.city = city.trim();
    if (emirate !== undefined) address.emirate = emirate.trim();

    if (is_default) {
      await Address.updateMany(
        { user: req.user._id },
        { $set: { is_default: false } }
      );
      address.is_default = true;
    }

    const updated = await address.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Set address as default
// @route   PATCH /api/addresses/:id/default
export const setDefaultAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await Address.updateMany(
      { user: req.user._id },
      { $set: { is_default: false } }
    );

    address.is_default = true;
    const updated = await address.save();

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete address
// @route   DELETE /api/addresses/:id
export const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // If default address was deleted, set another as default if available
    if (address.is_default) {
      const another = await Address.findOne({ user: req.user._id });
      if (another) {
        another.is_default = true;
        await another.save();
      }
    }

    res.json({ message: "Address removed successfully" });
  } catch (error) {
    next(error);
  }
};
