import React, { useState } from "react";
import { useAuth } from "../../context/providers/AuthContext";
import Spinner from "../../components/ui/Spinner";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { regis, isLoading, errorMessage } = useAuth();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await regis({ email: user.email, password: user.password });
  };

  return (
    <div className="row h-100">
      <div className="col-md-4 offset-md-4 p-2 my-auto">

        {
          errorMessage && (
          <>
          
          <h1>{errorMessage}</h1>
          
          </>)
        }

        <div className="card card-body">
          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control rounded-0"
                placeholder="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control rounded-0"
                placeholder="password"
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-primary rounded-0"
              disabled={!user.email || !user.password || isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
