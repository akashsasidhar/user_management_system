import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../actions/users";

export const LoginUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = formData;
    console.log(data);

    const res = await signIn(data);
    if (res.data.status == 200) {
      navigate("/home");
    }
    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="container-fluid auth-wrapper g-0">
      <div className=" row d-flex ">
        <div className="container-fluid  auth-inner">
          <form onSubmit={onSubmit}>
            <h3>Sign In</h3>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter password"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="row">
              <div className="col">
                <p className="forgot-password text-right">
                  Forgot{" "}
                  <Link
                    className="navbar-brand"
                    to={"/sign-up"}
                    style={{ color: "blue " }}
                  >
                    password?{" "}
                  </Link>
                </p>
              </div>{" "}
              <div className="col">
                <p className="forgot-password text-right">
                  New User{" "}
                  <Link
                    className="navbar-brand"
                    to={"/sign-up"}
                    style={{ color: "blue " }}
                  >
                    sign up?
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
