import React, { useState } from "react";
import { useCart } from "../../context/providers/CartContext";
import { BsFillTrashFill } from "react-icons/bs";
import PaypalComponent from "../../components/paypal/PaypalButton";

function CartPage() {
  // Functions
  const {
    items,
    removeItemCart,
    totalPrice,
    clearCart,
    appendItemCart,
    decreaseItemCart,
  } = useCart();

  const [quantity, setQuantity] = useState(0);

  // HTML Cart Page
  if (items.length === 0) return <h1>Empty cart</h1>;
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <header className="my-5 d-flex justify-content-between">
          <div>
            <h2>Your Products List</h2>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
          <h4> $ {totalPrice} </h4>
        </header>
        {items.map((product) => (
          <div className="card rounded-0 my-2" key={product._id}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <img
                    src={
                      product.images.url
                        ? product.images.url
                        : "/assets/noimage2.png"
                    }
                    alt={product.name}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-8">
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <h1 className="h4">{product.name}</h1>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: {product.price}</p>
                      </div>
                      <h2> $ {product.price * product.quantity}</h2>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      className="btn btn-primary rounded-0"
                      onClick={() => decreaseItemCart(product, quantity)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control w-25 d-inline rounded-0"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button
                      className="btn btn-dark rounded-0"
                      onClick={() => appendItemCart(product, quantity)}
                    >
                      +
                    </button>
                  </div>
                  <div className="d-flex justify-content-end mt-4">
                    <button
                      className="btn btn-danger rounded-0 btn-sm"
                      onClick={() => removeItemCart(product)}
                    >
                      <BsFillTrashFill />
                      <span className="ms-2">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-end"  >
          <PaypalComponent />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
