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
  localStorage.clear();
  localStorage.setItem("AUTH_TOKEN", result.data.data.token);

  return result;
};
export const uploadPhoto = async (picData, id) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/api/user/photoUpload",
      picData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(id);

    const picResult = await showPhoto(id);
    console.log({ data: result.data, pic: picResult });
    return { data: result.data, pic: picResult.data };
  } catch (error) {
    console.error(error);
  }
};
export const showPhoto = async (id) => {
  try {
    const result = await axios.get(
      `http://localhost:5000/api/user/photo/${id}`
    );
    console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
export const collectUser = async (id) => {
  try {
    const result = await axios.get(
      `http://localhost:5000/api/user/userDetails/${id}`
    );
    console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateUser = async (data) => {
  try {
    const result = await axios.post(
      `http://localhost:5000/api/user/update`,
      data
    );
    console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const changePassword = async (data) => {
  try {
    const result = await axios.post(
      `http://localhost:5000/api/user/changePassword`,
      data
    );
    console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchLead = async (id) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/getLeads",
      { id: id }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateLead = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/updateLeads",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
