import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/providers/AuthContext";
import {useCart} from '../../context/providers/CartContext'
import {BsFillCartFill} from 'react-icons/bs'

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          StefiCommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/products/new">
                    New Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/auth/register">
                  Register
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link active d-flex align-items-center" to="/cart">
                <BsFillCartFill size={20} className="me-1" />
                <span>Cart</span>
                <span className="badge bg-secondary ms-2 p-2">{totalItems}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
