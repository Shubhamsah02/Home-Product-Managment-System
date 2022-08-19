import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Payment() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //   Authentication
  var tot = 0;
  const timeout = useRef(null);
  const checkAuth = () => {
    axios
      .get("http://localhost:3009/isAuth", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (!response.data.login) {
          alert("You are not Autherized For this");
          navigate("/");
        }
      });
  };
  useEffect(() => {
    timeout.current = setTimeout(checkAuth, "1h");
    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  //   Cart call
  useEffect(() => {
    axios
      .get(
        `http://localhost:3009/viewcart/${localStorage.getItem("EcomUserId")}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("payment:", response.data.response);
        setCart(response.data.response);
        console.log(cart);
      });
  }, []);

  //   Address details

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:3009/getaddress/${localStorage.getItem(
          "EcomUserId"
        )}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setUserData(response.data.response);
        console.log("data", response.data.response);
        setIsLoading(false);
      });
  }, []);

  //update address
  async function onSubmit() {
    //alert(product_id)
    // console.log("enter", product_id);
    // console.log("===============================");
    // console.log(product);
    // console.log("==============================");
    await axios
      .put(
        `http://localhost:3009/updateaddress/${localStorage.getItem(
          "EcomUserId"
        )}`,

        {
          // user_name: name,
          // user_contact: phone,
          user_address: address,
          //product_photo:product_photo
        }
      )
      .then(() => {
        //console.log("hello")
        //alert("Updated Successfully");
        // navigate("/vendor");
      })
      .catch((error) => console.log("error===>", error));

    // .then(res =>{
    //   res.data()
    // })
    //navigate("/viewproduct")
    //alert(id)
  }

  //   Buy Now
  const OnBuyNow = async (e) => {
    e.preventDefault();
    onSubmit();
    //  console.log(inputAddres + payment)
    const dat = localStorage.getItem("EcomUserId");
    const datemail = localStorage.getItem("EcomEmail");
    const datname = localStorage.getItem("EcomUser");
    const product = localStorage.getItem("product");
    const qty = localStorage.getItem("qty");
    const price = localStorage.getItem("Total");
    const productId = localStorage.getItem("productId");
    //localStorage.setItem('Ecompaymentmode', payment)

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);

    // const data = {
    //   user_name: datname,
    //   day: date
    // };
    //console.log(cart.user_name = datname)

    cart.forEach((element) => {
      element.user_name = datname;
      element.day = date;
    });

    console.log("data", cart);

    const res = await axios
      .post(`http://localhost:3009/orders`, cart)
      .then((response) => {
        console.log(response);
      })
      .then(navigate("/pay"));
  };

  //    for empty cart
  if (!cart.length) {
    return (
      <>
        <div className="container p-5">
          <h2>There is no items in cart</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div class="breadcrumb-section-ratings breadcrumb-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
              <div class="breadcrumb-text">
                <p>Home Product</p>
                <h1>Check Out</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {!isLoading ? (
          <div className="checkout-section mt-150 mb-150">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="checkout-accordion-wrap">
                    <div className="accordion" id="accordionExample">
                      <div className="card single-accordion">
                        <div className="card-header" id="headingOne">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Billing Address
                            </button>
                          </h5>
                        </div>

                        <div
                          id="collapseOne"
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div className="billing-address-form">
                              <form action="index.html">
                                <p>
                                  <input
                                    type="text"
                                    placeholder="Name"
                                    defaultValue={userData[0].user_name}
                                    onChange={(e) => {
                                      setName(e.target.value);
                                    }}
                                    readOnly
                                  />
                                </p>
                                <p>
                              <input
                                type="email"
                                placeholder="Email"
                                defaultValue={userData[0].user_email}
                                readOnly
                              />
                            </p>
                                <p>
                                  <textarea
                                    name="text"
                                    row="3"
                                    id=""
                                    cols="30"
                                    rows="10"
                                    type="text"
                                    placeholder="Enter Your Full Address"
                                    defaultValue={userData[0].user_address}
                                    onChange={(e) => {
                                      setAddress(e.target.value);
                                    }}
                                  ></textarea>
                                </p>
                                <p>
                                  <input
                                    type="tel"
                                    placeholder="Phone"
                                    defaultValue={userData[0].user_contact}
                                    onChange={(e) => {
                                      setPhone(e.target.value);
                                    }}
                                    readOnly
                                  />
                                </p>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="order-details-wrap">
                    <table className="order-details">
                      <thead>
                        <tr>
                          <th colspan="3">
                            <center>Your order Details</center>
                          </th>
                          {/* <th>Price</th> */}
                        </tr>
                      </thead>
                      <tbody className="order-details-body">
                        <tr>
                          <td>
                            <b>Product image </b>
                          </td>
                          <td>
                            <b>Product</b>
                          </td>
                          <td>
                            <b>Total</b>
                          </td>
                        </tr>
                        {/* Map Start */}
                        {cart.map((val, ind) => {
                          tot += val.product_price * val.product_qty;
                          return (
                            <>
                              <tr>
                                <td>
                                  <img
                                    className="i"
                                    src={
                                      "http://localhost:3009/" +
                                      val.product_photo
                                    }
                                    alt="#"
                                  />
                                </td>
                                <td>{val.product_name}</td>
                                <td>
                                  ${val.product_price * val.product_qty}.00
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        {/* Map Ends */}
                      </tbody>
                      <tbody className="checkout-details">
                        <tr>
                          <td colspan="2">Total</td>
                          <td>${tot}</td>
                          {localStorage.setItem("Total", tot)}
                        </tr>
                      </tbody>
                    </table>
                    <a className="boxed-btn" onClick={OnBuyNow}>
                      Place Order
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div> Loading...</div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Payment;
