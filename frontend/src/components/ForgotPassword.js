import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from 'axios'

function ForgotPassword() {
  const [user_email,setUserEmail]=useState("");
  const navigate = useNavigate();
  // const redirect = (e) => {
  //   e.preventDefault();
  //   navigate("/resetpassword");
  // };

  const forgotPassword=()=>{
    axios.post('http://localhost:3009/resetPassword',
    {
        user_email:user_email
    })
    
    // }).then(()=>{
    //     //alert("Successfully Sent to Your Email Id, Please Check!")
    //     navigate("/resetpassword")
        
    // }).catch(error => window.alert("Please Enter Valid Data"))
    navigate('/resetpassword')
}

  return (
    <>
      <Navbar/>
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Forgot Password</p>
                <h1>Forgot Password</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="contact-from-section mt-150"
        style={{ paddingBottom: "25px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="form-title">
                <h2>Forgot Password!!</h2>
                <p>
                  Enter Your Registered E-mail Address and Please Check Your
                  Mail for Further Process...
                </p>
              </div>
              <div id="form_status">
                <div className="contact-form">
                  <form type="POST" id="fruitkha-contact" onSubmit={forgotPassword}>
                    <p>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                        onChange={(e) => {setUserEmail(e.target.value) }}
                        required
                      />
                    </p>
                    {/* <p><textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea></p>
							<input type="hidden" name="token" value="FsWga4&@f6aw" /> */}
                    <p>
                      <input type="submit" value="Send" />
                    </p>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-form-wrap">
                <div className="contact-form-box">
                  <h2>Remember Password?</h2>
                  <p>
                    A room should never allow the eye settle in one place. It
                    should settle at you and create fantacy.
                  </p>
                  <Link to="/" className="btn_3">
                    Goto Login page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
