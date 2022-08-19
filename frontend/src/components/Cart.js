import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Cart() {
  const user_id = localStorage.getItem("EcomUserId");
  // const product_id = localStorage.getItem("productId")

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  let tot = 0;

  useEffect(() => {
    axios
      .get(`http://localhost:3009/viewcart/${user_id}`, {
        //   headers: {
        //     'token': localStorage.getItem("token")
        //   }
      })
      .then((response) => {
        setData(response.data.response);
        console.log(response.data);
      });
  }, []);

  async function deleteoncart(user_id, product_id) {
    //alert(id)
    let result = await fetch(
      `http://localhost:3009/deleteCart/${user_id}/${product_id}`,
      {
        method: "DELETE",
      }
    ).then(() => {
      window.location.reload();
    });
  }

  const viewproduct = () => {
    navigate("/viewproduct");
  };

  const checkOut = () => {
    navigate("/payment");
  };

  data.map((product) => (tot += product.product_price * product.product_qty));

  return (
    <>
      <Navbar />

      <div class="breadcrumb-section-ratings breadcrumb-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
              <div class="breadcrumb-text">
                <p>Home Product</p>
                <h1>Cart</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-section mt-150 mb-150">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-12">
              <div class="cart-table-wrap">
                <table class="cart-table">
                  <thead class="cart-table-head">
                    <tr class="table-head-row">
                      {/* <th class="product-remove"></th> */}
                      <th class="product_id">#</th>
                      <th class="product-image">Product Image</th>
                      <th class="product-name">Name</th>
                      <th class="product-price">Price</th>
                      <th class="product-quantity">Quantity</th>
                      <th class="product-total">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product) => (
                      <tr>
                        <td>{product.product_id}</td>
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
                        <td class="product-quantity">{product.product_qty}</td>
                        <td>
                          <i
                            onClick={() =>
                              deleteoncart(user_id, product.product_id)
                            }
                            class="fa fa-trash"
                          />
                        </td>

                        {/* <td><i onClick={() => deleteoncart(user_id,product.product_id)} class="fa fa-trash" /></td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="total-section">
                <table class="total-table">
                  <thead class="total-table-head">
                    <tr class="table-total-row">
                      <th>Total</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="total-data">
                      <td>
                        <strong>Total: </strong>
                      </td>
                      <td>{tot}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="cart-buttons">
                  <a class="boxed-btn" onClick={viewproduct}>
                    Update Cart
                  </a>
                  <a class="boxed-btn black" onClick={checkOut}>
                    Check Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
