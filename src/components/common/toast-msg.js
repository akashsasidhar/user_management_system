import React, { useState, useEffect } from "react";

const Toast = ({ message, onClose, status }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`toast ${show ? "show" : ""}`}
      style={{
        marginTop: "10%",
        color:
          status == "success" ? "green" : status == "error" ? "red" : "black",
      }}
    >
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Toast;
