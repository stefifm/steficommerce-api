import Product from "../models/Products";

export const getProducts = async (req, res) => {
  const product = await Product.find();
  res.json(product);
};

export const createProducts = async (req, res) => {
  const { name, price, description, quantity } = req.body;
  const newProduct = new Product({ name, price, description, quantity });
  await newProduct.save()
  res.json(newProduct)
};

export const updateProduct = (req, res) => {
  res.json("updating products");
};

export const getProduct = (req, res) => {
  res.json("get product");
};

export const deleteProduct = (req, res) => {
  res.json("deleting products");
};
