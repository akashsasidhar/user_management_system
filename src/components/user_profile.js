import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadPhoto } from "../actions/users";
import { validateJWT } from "../utils/utils";
export const UserProfile = () => {
  // const { username } = useParams();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
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

    const picData = new FormData();
    picData.append("image", file);
    const res = await uploadPhoto(picData);
    if (res.data.status == 200) setImageUrl(res.data.imageUrl);
  };
  useEffect(() => {
    validateJWT(navigate);
  }, []);
  return (
    <>
      <div className="container-fluid  g-0">
        <div className=" row d-flex ">
          <div className="container-fluid  ">
            <div className="row">
              <div className="mb-3">
                {imageUrl ? (
                  <img
                    src={`http://localhost:5000${imageUrl}`}
                    alt="uploaded image"
                  />
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
              <h1 style={{ marginLeft: "20px" }}>{user.name}</h1>
            </div>
            <p style={{ marginLeft: "20px" }}>{user.bio}</p>
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
          </div>
        </div>
      </div>
    </>
  );
};
