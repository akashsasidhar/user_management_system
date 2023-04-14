import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateJWT, validatePassword } from "../utils/utils";
import { changePassword } from "../actions/users";
import Toast from "./common/toast-msg";
export const ChangePassword = () => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  let decodedToken;
  const handleButtonClick = (message, sts) => {
    setMessage(message);
    setStatus(sts);
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
    setMessage("");
  };
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmitName = async (e) => {
    e.preventDefault();
    decodedToken = validateJWT(navigate);
    formData.id = decodedToken.id;
    const data = formData;
    console.log(data);
    if (formData.oldPassword !== decodedToken.code) {
      handleButtonClick("Old password is incorrect", "error");
      return;
    }

    // Validate new password and confirm new password
    // if (formData.password.length < 8) {
    //   alert("New password must be at least 8 characters long");
    //   return;
    // }

    const passValid = validatePassword(formData?.password);
    if (passValid === true) {
      if (formData.password !== formData.confirmPassword) {
        handleButtonClick(
          "New password and confirm new password do not match",
          "error"
        );
        return;
      }
      let res = changePassword(data);
      if (res.data.status == 200) {
        handleButtonClick(res.data.message, "success");
        setFormData({
          id: "",
          oldPassword: "",
          confirmPassword: "",
          password: "",
        });
      }
    } else {
      handleButtonClick(passValid, "error");
    }
  };
  return (
    <div className="container" style={{ marginTop: "6%" }}>
      <div className=" row d-flex ">
        <div className="container-fluid  ">
          <form onSubmit={onSubmitName}>
            <div className="mb-3">
              <label>Enter Old Password</label>
              <input
                name="oldPassword"
                type="password"
                className="form-control"
                onChange={handleChange}
                value={formData.oldPassword}
                placeholder="Enter Old Password"
              />
            </div>
            <div className="mb-3">
              <label>Enter New Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter Password"
              />
            </div>
            <div className="mb-3">
              <label>Confim Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Enter Confirm Password"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>{" "}
          </form>{" "}
        </div>
      </div>
      {showToast && (
        <Toast message={message} status={status} onClose={handleToastClose} />
      )}
    </div>
  );
};
