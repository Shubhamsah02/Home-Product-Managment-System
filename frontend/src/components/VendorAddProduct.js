// import React, {useState, useEffect} from 'react'
// // import Header from './Header'
// import {  useNavigate, Link } from 'react-router-dom';
// import Axios from 'axios';
// import { VendorNav } from './VendorNav';

// function AddProduct() {
//     let nevigate=useNavigate()
//     // if(!window.localStorage.getItem('token')){
//         useEffect(()=>{
//         // window.alert("You are not Autherized For this")
//         // nevigate('/')
//         },[])
//     //   }

import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { VendorNav } from "./VendorNav";
import Footer from "./Footer";

function AddProduct() {
  const navigate = useNavigate();

  // Authentication
  const timeout = useRef(null);
  const checkAuth = () => {
    Axios.get("http://localhost:3009/isAuth", {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((response) => {
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

  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_discount, setProductDiscount] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  const [product_category, setProductCategory] = useState("");
  const [user_id, setUserId] = useState(localStorage.getItem("EcomUserId"));

  const addproduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", product_name);
    formData.append("product_description", product_description);
    formData.append("product_price", product_price);
    formData.append("product_discount", product_discount);
    formData.append("product_photo", product_photo);
    formData.append("product_category", product_category);
    formData.append("user_id", user_id);

    await Axios.post("http://localhost:3009/addProduct", formData, {
      // headers: {
      //     token:window.localStorage.getItem('token')
      // }
    })
      .then(() => {
        alert("Successfully Inserted");
        navigate("/vendor")
      })
      .catch((error) => window.alert("Please Enter Valid Data"));
  };

  return (
    <>
      <VendorNav />

      <div className="breadcrumb-section-ratings breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Vendor Add Product</p>
                <h1>Vendor Add Product</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-from-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="form-title">
                {/* <h2>Register Here</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, ratione! Laboriosam est, assumenda. Perferendis, quo alias quaerat aliquid. Corporis ipsum minus voluptate? Dolore, esse natus!</p> */}
              </div>
              <div>
                <div className="contact-form">
                  <form onSubmit={addproduct}>
                    <p>
                      <input
                        type="text"
                        placeholder="Product Name"
                        name="p_name"
                        id="p_name"
                        onChange={(e) => {
                          setProductName(e.target.value);
                        }}
                      />
                    </p>

                    <p>
                      <label value={product_category}>Select Category </label>
                      <br />
                      <input
                        type="radio"
                        name="radio"
                        id="radio1"
                        value="1"
                        onChange={(e) => {
                          setProductCategory(e.target.value);
                        }}
                      />
                      Office &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name="radio"
                        id="radio2"
                        value="2"
                        onChange={(e) => {
                          setProductCategory(e.target.value);
                        }}
                      />
                      Living Room &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name="radio"
                        id="radio3"
                        value="3"
                        onChange={(e) => {
                          setProductCategory(e.target.value);
                        }}
                      />
                      Dining &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name="radio"
                        id="radio4"
                        value="4"
                        onChange={(e) => {
                          setProductCategory(e.target.value);
                        }}
                      />
                      Bedroom &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>

                    <p>
                      <textarea
                        type="text"
                        rows={3}
                        placeholder="Description"
                        name="description"
                        id="description"
                        onChange={(e) => {
                          setProductDescription(e.target.value);
                        }}
                      />
                    </p>
                    <p>
                      <input
                        type="text"
                        placeholder="Product Price($)"
                        name="price"
                        id="price"
                        onChange={(e) => {
                          setProductPrice(e.target.value);
                        }}
                      />
                    </p>
                    <p>
                      <input
                        type="text"
                        placeholder="Product Discount($)"
                        name="discount"
                        id="discount"
                        onChange={(e) => {
                          setProductDiscount(e.target.value);
                        }}
                      />
                    </p>
                    <p>
                      <input
                        type="file"
                        placeholder="Product Image"
                        name="image"
                        id="image"
                        onChange={(e) => {
                          setProductPhoto(e.target.files[0]);
                        }}
                      />
                    </p>

                    {/* <p><textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea></p>
							<input type="hidden" name="token" value="FsWga4&@f6aw" /> */}
                    <p>
                      <input type="submit" value="submit" />
                    </p>
                  </form>
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

export default AddProduct;
