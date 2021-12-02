import { Router } from "express";

import {
  createProducts,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/products", getProducts);

router.post("/products", createProducts);

router.get("/products/:id", getProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
