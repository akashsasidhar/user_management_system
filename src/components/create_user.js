import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../actions/users";
import { validatePassword } from "../utils/utils";

export const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  let confirmed = false;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = formData;
    let res;
    console.log(data);
    const passValid = validatePassword(formData?.password);
    if (passValid) {
      res = await signUp(data);
      if (res.status == 200) {
        navigate("/sign-in");
      }
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <>
      {" "}
      <div className="container-fluid auth-wrapper g-0">
        <div className=" row d-flex ">
          <div className="container-fluid  auth-inner">
            <form onSubmit={onSubmit}>
              <h3>Sign Up</h3>

              <div className="mb-3">
                <label>Username</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Username"
                  onChange={handleChange}
                  value={formData.name}
                  required={true}
                />
              </div>

              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  required={true}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  value={formData.password}
                  required={true}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right">
                Already registered{" "}
                <Link
                  className="navbar-brand"
                  to={"/sign-in"}
                  style={{ color: "blue " }}
                >
                  sign in?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
