import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


const EditProfile = () => {
  const user_id = localStorage.getItem("EcomUserId");

  let navigate = useNavigate();

  const [user_name, setUsername] = useState();
  const [user_email, setUserEmail] = useState();
  const [user_contact, setUserContact] = useState();
  const [user_address, setUserAddress] = useState();
  const [user_photo, setUserPhoto] = useState({ file:[0]});
  const [imageToDisplay, setImageToDisplay] = useState()

  useEffect(() => {
    fetch(`http://localhost:3009/getaddress/${user_id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })

      .then((data) => {
        console.log(data);
        console.log("photo", data.response[0].user_photo);
        const user_id = data.response[0].user_id;
        console.log("name", data.response[0].user_name);
        console.log(data.response[0].user_name);
        setUsername(data.response[0].user_name);
        setUserEmail(data.response[0].user_email);
        setUserContact(data.response[0].user_contact);
        setUserAddress(data.response[0].user_address);
        setUserPhoto(data.response[0].user_photo);
      });
  }, []);
  

  const handleUserPhoto = (e) => {
    
    setUserPhoto({
      ...user_photo,
      
      file: e.target.files[0],
    });

    const objectURL = window.URL.createObjectURL(e.target.files[0])
    setImageToDisplay(objectURL)
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("user_name", user_name);
    formData.append("user_contact", user_contact);
    formData.append("user_email", user_email);
    formData.append("user_address", user_address);
    formData.append("user_photo", user_photo.file);

    axios
      .put(`http://localhost:3009/updateprofile/${user_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
          alert("Successfully Inserted");
          console.log("updated data", res);
          navigate("/MyProfile");
      });
  };

  return (
    <>
      <div class="card-body"  >
        <div class="d-flex flex-column align-items-center text-center">
          <img
            src={ imageToDisplay ? imageToDisplay : `http://localhost:3009/Images/${user_photo}`}
            class="rounded-circle p-1 bg-primary"
            width="115"
            height="100 "
          />
          <input
            onChange={handleUserPhoto}
            type="file"
            class="text-center center-block file-upload"/>
          
        </div>
      </div>
      <form onSubmit={handleEditProfileSubmit}>
        <div class="col-lg-8">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-sm-3">
                <h6 class="mb-0">Username</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <input onChange={(e) => setUsername(e.target.value)} type="text"
                  class="form-control" Value={user_name} required/>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-sm-3">
                <h6 class="mb-0">phone_No</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <input onChange={(e) => setUserContact(e.target.value)} type="text"
                  class="form-control" Value={user_contact} required/>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-3">
                <h6 class="mb-0">user_email</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <input onChange={(e) => setUserEmail(e.target.value)} type="text"
                  class="form-control" Value={user_email}required />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-3">
                <h6 class="mb-0">Address</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <input onChange={(e) => setUserAddress(e.target.value)} type="text"
                  class="form-control" Value={user_address} required/>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-9 text-secondary">
                <input  type="submit" class="btn btn-primary px-4" value="Submit"/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default EditProfile;
