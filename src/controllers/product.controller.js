import Product from "../models/Products";
import { uploadImage } from "../helpers/cloudinary";
export const getProducts = async (req, res) => {
  const product = await Product.find();
  res.json(product);
};

export const createProducts = async (req, res, next) => {
  try {
    const { name, price, description, quantity } = req.body;

    const result = await uploadImage(req.files.image.tempFilePath);

    const newProduct = new Product({
      name,
      price,
      description,
      quantity,
      images: {
        url: result.secure_url,
      },
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    next(error);
  }
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
