import jwtDecode from "jwt-decode";

export const validateJWT = (history) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (!token) return history("/sign-in");
  const decoded = jwtDecode(token);
  if (Date.now() >= decoded.exp * 1000) return history("/sign-in");
  return decoded;
};
