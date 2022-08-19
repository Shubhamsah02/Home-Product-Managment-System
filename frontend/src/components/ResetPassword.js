import React, { useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    pass: "",
    con_pass: "",
    token: "",
  });
  const [result, setResult] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setPassword = (e) => {
    e.preventDefault();
    if (credentials.pass !== credentials.con_pass) {
      setResult("Both passwords sholud be same..!!");
    } else {
      axios
        .post("http://localhost:3009/updatePassword", {
          resetToken: credentials.token,
          user_password: credentials.pass,
        })
        .then(() => {
          window.alert("Successfully Updated Your Password");
          window.location.href = "/";
        })
        .catch((error) => window.alert("Please Enter Valid Data"));
    }
  };
  return (
    <>
      <Navbar />
      <div className="breadcrumb-section-ratings breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Reset Password</p>
                <h1>Reset Password</h1>
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
                <h2>Reset Password</h2>
                <p>Enter OTP and Reset Your Password...</p>
              </div>
              <div id="form_status">
                <div className="contact-form">
                  <form
                    type="POST"
                    id="fruitkha-contact"
                    onSubmit={setPassword}
                  >
                    <p>
                      <input
                        type="text"
                        placeholder="Token"
                        name="token"
                        onChange={handleChange}
                        value={credentials.token}
                        id="token"
                      />
                    </p>
                    <p>
                      <input
                        type="password"
                        placeholder="Password"
                        name="pass"
                        onChange={handleChange}
                        value={credentials.pass}
                        id="password"
                        required
                      />
                    </p>
                    <p>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        name="con_pass"
                        onChange={handleChange}
                        value={credentials.con_pass}
                        id="matchpassword"
                        required
                      />
                    </p>
                    <div
                      className="my-3"
                      style={{
                        color: "red",
                        height: "15px",
                        fontSize: "18px",
                        paddingBottom: "5px",
                      }}
                    >
                      {result}
                    </div>
                    <p>
                      <input
                        className="btton my-2"
                        type="submit"
                        value="Reset"
                      />
                    </p>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-form-wrap" style={{ marginTop: "50px" }}>
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

export default ResetPassword;
