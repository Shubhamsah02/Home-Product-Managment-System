import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Style from "style-it";

export const VendorNav = () => {
  const navigate = useNavigate();
  const vendor_id=localStorage.getItem("EcomUserId")


  function Logout() {
    localStorage.clear();
    navigate(`/`);
  }
  const vendorhome = () => {
    navigate("/vendor");
      };
  function getuserq() {
    navigate("/viewusers/"+vendor_id)
  }

  function login() {
    navigate(`/`);
  }

  function register() {
    navigate("/register");
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
          <a>
            <img
              src="/assets/img/bg-rm-logo.png"
              alt="logo"
              style={{ height: "80px" }}
              onClick={vendorhome}
            />
          </a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Style>
                  {`
                  .nav-links{
                    color: Orange;
                    font-family: "Lucida Console", "Courier New", monospace;
                    font-size: 16px;
                    font-weight: bold;
                    padding-left: 20px;
                  }
                  `}
                </Style>
                <Link class="nav-links" to="/vendor">
                  Vendor Home Page
                </Link>
              </li>
            </ul>

            {localStorage.getItem("token") ? (
              <div className="social-icons">
                <ul>
                  {/* <li>
                    <a className="bordered-btn" type="submit" to={"/viewusers" } style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '5px', paddingBottom: '5px', color: 'white' }}>
                      Users
                    </a>
                  </li> */}
                  <a className="bordered-btn" type="submit" onClick={getuserq }>
                      View User
                    </a>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <li>
                    <Link to="/">
                      <i className="fas fa-sign-out-alt"></i>
                    </Link>
                  </li>
           
                </ul>
              </div>
            ) : (
              <div>
                <a onClick={login} className="bordered-btn" type="submit">
                  Login
                </a>
                {/* <button  class="btn btn-outline-success" type="submit">Login</button> */}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a onClick={register} className="bordered-btn" type="submit">
                  Sign-up
                </a>
                {/* <button class="btn btn-outline-success" type="submit">Sign-up</button> */}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
