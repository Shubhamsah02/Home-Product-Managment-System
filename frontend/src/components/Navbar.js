import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NotificationBadge, { Effect } from "react-notification-badge";
import Style from "style-it";
import userphoto from "react"

function Navbar() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("EcomUserId");
  const [count, setCount] = useState(0);
  const [userphoto, setUserPhoto] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3009/count/${user_id}`).then((response) => {
      setCount(response.data.response[0].ncount);
      console.log(response.data.response[0].ncount);
      console.log("count", count);
  
    });
  }, []);
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
        // console.log(data.response[0].user_name);
        // setUsername(data.response[0].user_name);
        // setUserEmail(data.response[0].user_email);
        // setUserContact(data.response[0].user_contact);
        // setUserAddress(data.response[0].user_address);
        setUserPhoto(data.response[0].user_photo);
      });
  }, []);
  

  function login() {
    navigate(`/`);
  }

  function register() {
    navigate("/register");
  }

  const home = () => {
    navigate("/home");
    window.location.reload();
  };

  const order = () => {
    navigate(`/orderHistory/${user_id}`);
  };
  let container = {
    marginTop: "7px",
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a>
            <img
              src="/assets/img/bg-rm-logo.png"
              alt="logo"
              style={{ height: "80px" }}
              onClick={home}
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="menu_icon">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Style>
                  {`
                  .nav-links{
                    color: white;
                    font-family: "Lucida Console", "Courier New", monospace;
                    font-size: 16px;
                    font-weight: bold;
                    padding-left: 20px;
                  }
                    .nav-links:hover {
                      color: Orange; 
                      }
                  `}
                </Style>
                <Link to="" className="nav-links">
                  <span onClick={home}>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-links" to="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-links" to="/viewproduct">
                  Shop
                </Link>
              </li>
            </ul>
            {localStorage.getItem("token") ? (
              <div className="social-icons">
                <ul>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src={`http://localhost:3009/Images/${userphoto}`} width="50"  height="50"  class="rounded-circle" />
                    </a>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink">
                      <a class="dropdown-item" href="Myprofile"> My-profile</a>
                      <a className="dropdown-item" type="submit"  onClick={order} >
                        My-Orders
                      </a>
                      <Link to="/cart">
                        <NotificationBadge
                          style={container}
                          count={count}
                          effect={Effect.SCALE}
                        />
                        <i className="fas fa-shopping-cart">My-Cart</i>
                      </Link>
                      <Link to="/">
                        <i className="fas fa-sign-out-alt">Log-Out</i>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <a onClick={login} className="bordered-btn" type="submit">
                  Login
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a onClick={register} className="bordered-btn" type="submit">
                  sign-up
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
