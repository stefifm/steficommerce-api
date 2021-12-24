import React from "react";
import { BsFillCartFill } from "react-icons/bs";
import {useProducts} from '../../context/providers/ProductsContext';
import { useAuth } from '../../context/providers/AuthContext'
import { useCart } from '../../context/providers/CartContext'
import { toast } from 'react-hot-toast';
import {BsFillTrashFill} from 'react-icons/bs'

const ProductCard = ({ product }) => {

  const {removeProduct} = useProducts()
  const {user} = useAuth();
  const {appendItemCart } = useCart();

  const handleCart = (product) => {
    appendItemCart(product)
    toast.success("Product added successfully")
  };

  const handleDelete = async (id) => {
    const deletedProduct = await removeProduct(id);

    if (deletedProduct) toast.success("Product deleted successfully")
  }

  return (
    <div className="card rounded-0">
      <img
        src={
          product.images && product.images.url
            ? product.images.url
            : "./assets/noimage2.png"
        }
        alt=""
        className="w-75 m-auto"
      />
      <div className="card-body">
        <h1 className="h3">{product.name}</h1>
        <p>{product.description}</p>
        <p> $ {product.price} </p>
        <p>Stock: {product.stock}</p>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary rounded-0 btn-sm"
            onClick={() => handleCart(product) }
          >
            <BsFillCartFill />

            <span className="ms-2">Add cart</span>

          </button>
          {user.role === "admin" && (
              <button className="btn btn-danger rounded-0 btn-sm" onClick={() => {
                handleDelete(product._id)
              }} >
                <BsFillTrashFill/>
                <span className="ms-2">Delete</span>
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
