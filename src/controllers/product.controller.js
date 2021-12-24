import Product from "../models/Products";
import { uploadImage } from "../helpers/cloudinary";
import createError from 'http-errors'


export const getProducts = async (req, res) => {
  const product = await Product.find();
  res.json(product);
};

export const createProducts = async (req, res, next) => {
  try {
    let imageURL = ""
    const { name, price, description, stock } = req.body;

    const productFound = await Product.findOne({name: name})
    if (productFound) throw createError.Conflict("Product already exists")

    if (req.files && req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      imageURL = result.secure_url
    }

    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      images: {
        url: imageURL,
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

export const deleteProduct = async (req, res, next) => {
  const {id} = req.params

  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (deletedProduct) return res.sendStatus(204)

    return res.sendStatus(404)
  } catch (error) {
    console.error(error);
    next(error)
  }
};
