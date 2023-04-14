import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collectUser, updateUser, uploadPhoto } from "../actions/users";
import { validateJWT } from "../utils/utils";
import { Buffer } from "buffer";
export const UserProfile = () => {
  // const { username } = useParams();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const navigate = useNavigate();
  let decodedToken;
  const user = {
    name: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    profilePic: "https://via.placeholder.com/150",
    coverPhoto: "https://via.placeholder.com/800x200",
  };
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    decodedToken = validateJWT(navigate);
    const picData = new FormData();
    picData.append("image", file);
    picData.append("id", decodedToken.id);
    const res = await uploadPhoto(picData, decodedToken.id);
    if (res.data.status == 200) {
      setImageUrl(Buffer.from(res.pic.data));
      console.log(imageUrl);
    }
  };
  const onSubmitName = async (e) => {
    e.preventDefault();
    decodedToken = validateJWT(navigate);
    formData.id = decodedToken.id;
    const data = formData;
    console.log(data);

    const res = await updateUser(data);
    if (res.data.status == 200) {
      navigate("/home");
    }
    setFormData({
      id: "",
      email: "",
      password: "",
    });
  };
  const fetchUser = async () => {
    decodedToken = validateJWT(navigate);
    const res = await collectUser(decodedToken.id);
    setFormData({
      id: decodedToken.id,
      email: res.data.email,
      name: res.data.username,
    });
  };
  useEffect(() => {
    validateJWT(navigate);
    fetchUser();
  }, []);
  return (
    <>
      <div className="container-fluid  g-0">
        <div className=" row d-flex ">
          <div className="container-fluid  ">
            <div className="row">
              <div className="mb-3" style={{ marginTop: "4%" }}>
                {imageUrl ? (
                  <img src={`${imageUrl}`} width="300" />
                ) : (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      marginLeft: "20px",
                      margin: "auto",
                      border: "5px solid white",
                    }}
                  />
                )}
              </div>
            </div>
            <form onSubmit={handleFormSubmit}>
              <input
                type="file"
                onChange={handleFileInputChange}
                required={true}
              />
              <button type="submit" className="btn btn-primary">
                Upload Photo
              </button>
            </form>
            <form onSubmit={onSubmitName}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Enter Name"
                />
              </div>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
