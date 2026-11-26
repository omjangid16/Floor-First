import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || "floor_first_super_secret_jwt_key_2026";
  const expiresIn = process.env.JWT_EXPIRES_IN || "30d";
  return jwt.sign({ id: userId }, secret, { expiresIn });
};
