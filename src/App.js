import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { CreateUser } from "./components/create_user";
import { Home } from "./components/home";
import { LoginUser } from "./components/login";
import { UserProfile } from "./components/user_profile";
import { validateJWT } from "./utils/utils";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log(isLoggedIn, "login");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    validateJWT(navigate);
  }, []);
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <h3 className="navbar-brand">User Management System</h3>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/home"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/user-profile"}>
                  User Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<LoginUser />} />
        <Route path="/sign-in" element={<LoginUser />} />
        <Route path="/sign-up" element={<CreateUser />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
