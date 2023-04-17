import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { CreateUser } from "./components/create_user";
import { Home } from "./components/home";
import { LoginUser } from "./components/login";
import { UserProfile } from "./components/user_profile";
import { validateJWT } from "./utils/utils";
import { ChangePassword } from "./components/change-password";
import LeadsPage from "./components/lead";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let decodedToken;
  let confirmed = false;
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log(isLoggedIn, "login");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const handleConfirmDelete = (companyId) => {
    confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      navigate("/log-out");
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    decodedToken = validateJWT(navigate);
  }, []);
  useEffect(() => {
    if (decodedToken?.id) {
      handleLogin();
    }
  }, []);
  return (
    <div className="App">
      {isLoggedIn && (
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
                  </Link>{" "}
                </li>
                <li>
                  <Link className="nav-link" to={"/change-password"}>
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to={"/leads"}>
                    Leads
                  </Link>
                </li>
                <li>
                  <h2 className="nav-link" onClick={handleConfirmDelete}>
                    Logout
                  </h2>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <Routes>
        <Route
          exact
          path="/"
          element={<LoginUser handleLogout={handleLogout} />}
        />
        <Route
          exact
          path="/log-out"
          element={<LoginUser handleLogout={handleLogout} />}
        />
        <Route
          path="/sign-in"
          element={<LoginUser handleLogout={handleLogout} />}
        />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/sign-up" element={<CreateUser />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/home" element={<Home handleLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
