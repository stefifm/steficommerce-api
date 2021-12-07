import jwt from "jsonwebtoken";
import { SECRET } from "../config";

export const verifyToken = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
