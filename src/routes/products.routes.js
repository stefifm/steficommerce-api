import { Router } from "express";

import {
  createProducts,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

import { verifyToken } from '../middlewares/auth.middleware'

const router = Router();

router.get("/products", getProducts);

router.post("/products", verifyToken ,createProducts);

router.get("/products/:id", getProduct);

router.put("/products/:id", verifyToken,updateProduct);

router.delete("/products/:id", verifyToken,deleteProduct);

export default router;
