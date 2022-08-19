import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

  const MyProfile = () => {
  const user_id = localStorage.getItem("EcomUserId");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [usercontact, setUserContact] = useState("");
  const [useraddress, setUserAddress] = useState("");
  const [userphoto, setUserPhoto] = useState("");

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
        console.log(data.response[0].user_name);
        setUsername(data.response[0].user_name);
        setUserEmail(data.response[0].user_email);
        setUserContact(data.response[0].user_contact);
        setUserAddress(data.response[0].user_address);
        setUserPhoto(data.response[0].user_photo);
      });
  }, []);

  return (
    <>
      <div class="container align-items-center">
        <div class="row">
          <div>
            <div class="card">
              <div class="card-body"style={{background:"lightskyblue"}}>
             <div class="d-flex flex-column align-items-center text-center" style={{background:"lightskyblue"}}>
                <img src={`http://localhost:3009/Images/${userphoto}`}class="rounded-circle p-1 bg-primary"
                    width="118" height={118}/>
                  <hr class="my-2" />
                  <div class="col-lg-8">
                    <div class="card-body">
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">user_name</h6>
                          
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input type="text"  class="form-control"  value={username} />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">phone_No</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input type="text"  class="form-control" value={usercontact}  />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">user_email</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input type="text" class="form-control"  value={useremail}/>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">user_address</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input type="text" class="form-control"value={useraddress} />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-3"></div>
                        <Link className="navbar-brand" to="/EditProfile">
                          <div class="col-sm-9 text-secondary">
                            <input type="button"class="btn btn-primary px-4"  value="edit"/>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyProfile;
