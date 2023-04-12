import axios from "axios";

export const signUp = async (data) => {
  console.log(data, "im here");
  const result = await axios.post(
    `http://localhost:5000/api/user/create`,
    data
  );

  return result;
};

export const signIn = async (data) => {
  const result = await axios.post(`http://localhost:5000/api/user/login`, data);
  console.log(result.data.data.token);
  localStorage.setItem("AUTH_TOKEN", result.data.data.token);

  return result;
};
export const uploadPhoto = async (data) => {
  console.log("hi");
  try {
    const result = await axios.post(
      "http://localhost:5000/api/user/photoUpload",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
