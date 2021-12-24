import React from "react";
import ReactDOM from "react-dom";
import { toast } from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {useCart} from '../../context/providers/CartContext'

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PaypalComponent() {
  const navigate = useNavigate()
  const { clearCart } = useCart();
  const createOrder = (data, actions) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const items = cart.items.map(item => (
      {
        unit_amount: {
          currency_code: "USD",
          value: item.price * item.quantity,
        },
        quantity: item.quantity,
        name: item.name
      }
    ))
    return actions.order.create({
      purchase_units: [
        {
          description: "Hardware Products",
          amount: {
            value: cart.totalPrice,
            currency_code: "USD",
          },
          
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    
    await actions.order.capture();
    
    clearCart();
    navigate("/")
    toast.success("Success Payment")
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      style={{
        color: "blue",
        tagline: "false",
        label: "checkout",
        shape: "rect",
        layout: "horizontal",
        size: "medium",
      }}
    />
  );
}

export default PaypalComponent;
