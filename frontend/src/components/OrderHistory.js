import React, { useState, useEffect } from "react";
// import Header from "./Header";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Ratings from "./Ratings";
import Footer from "./Footer";

function OrderHistory() {
  const [data, setData] = useState([]);
  const productID = [];
  const { user_id } = useParams();
  console.log(user_id);
  // if (!window.localStorage.getItem("token")) {
  //   window.alert("You are not Autherized For this");
  //   nevigate("/");
  // }

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    // getOrderhistory(user_id)
    const { data } = await axios.get(
      `http://localhost:3009/orderhistory/${user_id}`
    );
    setData(data.datas);
    console.log("data1 data.data.products===>", data.datas);
    //console.log("data2 data.data===>",data.datas)
    console.log("data3 data===>", data);
  };

  console.log("data", data);

  return (
    <>
      <Navbar />

      <div class="breadcrumb-section-ratings breadcrumb-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
              <div class="breadcrumb-text">
                <p>Home Product</p>
                <h1>Order History</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-section mt-150 mb-150">
        <div class="container">
          <div class="row">
            <center>
              <div class="col-lg-8 col-md-12">
                <div class="cart-table-wrap">
                  <table class="cart-table center">
                    <thead class="cart-table-head">
                      <tr class="table-head-row">
                        {/* <th class="product-remove"></th> */}
                        {/* <th class="product_id">#</th> */}
                        <th class="product-image">Product Image</th>
                        <th class="product-name">Name</th>
                        <th class="product-price">Price</th>
                        <th class="product-quantity">Quantity</th>
                        <th class="Date">Date</th>
                        <th class="product-total">Reviews</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((product) => (
                        <tr>
                          {/* <td>{product.product_id}</td> */}
                          <td class="product-image">
                            <img
                              src={
                                "http://localhost:3009/" + product.product_photo
                              }
                              alt=""
                            />
                          </td>
                          <td class="product-name">{product.product_name}</td>
                          <td class="product-price">{product.product_price}</td>
                          <td class="product-quantity">
                            {product.product_qty}
                          </td>
                          <td class="product-date">
                            {product.day}
                          </td>
                          {/* <td><i onClick={() => deleteoncart(user_id,product.product_id)} class="fa fa-trash" /></td> */}
                          <td class="product-price">
                            <Link to="/ratings">Add Review</Link>
                          </td>

                          {/* <td><i onClick={() => deleteoncart(user_id,product.product_id)} class="fa fa-trash" /></td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderHistory;
