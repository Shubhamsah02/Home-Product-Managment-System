import React from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import React from "react";
import { Link  } from "react-router-dom";
import Wave from "react-wavify";
function Footer() {
  return (
    <>
      <Wave
        fill="#07212E"
        paused={false}
        options={{
          height: 90,
          amplitude: 20,
          speed: 0.25,
          points: 3,
        }}
      >
        <p>treeth</p>
      </Wave>
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col">
              <a>
                <img
                  src="/assets/img/bg-rm-logo.png"
                  alt="logo"
                  style={{ height: "100px" }}
                />
              </a>
              <div className="col-lg-6 text-right col-md-12">
                <div className="social-icons">
                  <ul>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="footer-box pages">
                <h2 className="widget-title">Pages</h2>
                <ul>
                  <li>
                  <Link className="nav-links" to="/home">
                  Home
                </Link>
                    {/* <a href="index.html">Home</a> */}
                  </li>
                  <li>
                  <Link className="nav-links" to="/about">
                  About
                </Link>
                    {/* <a href="about.html">About</a> */}
                  </li>
                  <li>
                  <Link className="nav-links" to="/viewproduct">
                  Shop
                </Link>
                    {/* <a href="services.html">Shop</a> */}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-box about-widget">
                <h2 className="widget-title">About us</h2>
                <p>
                Home Product is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Customer reviews, 1-Click shopping, personalized recommendations, Fulfillment by Home Product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright_part" style={{ backgroundColor: "#07212E" }}>
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <div className="footer-box">
                <center>
                  <p style={{ color: "white" }}>
                    Welcome to Home Products | Copyrights © 2022, All Rights Reserved.| Good Lucks
                  </p>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
