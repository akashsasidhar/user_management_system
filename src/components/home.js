import { useEffect } from "react";

export const Home = ({ handleLogin }) => {
  useEffect(() => {
    handleLogin();
  }, []);
  return (
    <div className="container" style={{ marginTop: "4%" }}>
      <div className=" row d-flex ">
        <div className="container-fluid  ">
          <h1>Home</h1>
        </div>
      </div>
    </div>
  );
};
