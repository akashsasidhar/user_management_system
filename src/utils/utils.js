import jwtDecode from "jwt-decode";

export const validateJWT = (history) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (!token) {
    localStorage.clear();
    return history("/sign-in");
  }
  const decoded = jwtDecode(token);
  if (Date.now() >= decoded.exp * 1000) {
    localStorage.clear();
    return history("/sign-in");
  }
  return decoded;
};
export function validatePassword(password) {
  if (typeof password !== "string") {
    return "Password must be a string";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  let hasUppercase = false;
  let hasLowercase = false;
  let hasNumber = false;
  let hasSpecialChar = false;

  for (let i = 0; i < password.length; i++) {
    const char = password.charAt(i);

    if (char >= "A" && char <= "Z") {
      hasUppercase = true;
    } else if (char >= "a" && char <= "z") {
      hasLowercase = true;
    } else if (char >= "0" && char <= "9") {
      hasNumber = true;
    } else if ("$@#&!".includes(char)) {
      hasSpecialChar = true;
    }
  }
  if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
    return true;
  } else if (!hasUppercase) {
    return "Password must contain an uppercase letter";
  } else if (!hasLowercase) {
    return "Password must contain a lowercase letter";
  } else if (!hasNumber) {
    return "Password must contain a number";
  } else if (!hasSpecialChar) {
    return "Password must contain a special character ($@#&!)";
  }
}
