// import React, {useState,useEffect} from 'react'
// import Header from './Header'
// import {   Link, Navigate, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Vendorhome() {
// const navigate = useNavigate()
//     const [products, setProducts] = useState([])
// const u_id=localStorage.getItem("EcomUserId")
//   useEffect(() => {
//     //console.log("test")
//     getProductsData()
// }, [])

// /* async function getProductsData() {
//   const { data } = await axios.get('http://localhost:3009/viewProduct',{
//       headers: {
//           token:window.localStorage.getItem('token')
//       }
//   })
//   setProducts(data.products.reverse())
// } */
// async function getProductsData() {
//     const { data } = await axios.get(`http://localhost:3009/viewProductt/${u_id}`,{
//         headers: {
//             token:window.localStorage.getItem('token')
//         }
//     })
//     setProducts(data.products.reverse())
//   }

// async function deleteOperation(id) {
//   //alert(id)
//   let result = await fetch('http://localhost:3009/deleteProduct/' + id, {
//       method: 'DELETE'
//   })
//   getProductsData()
//   result = await result.json();
//   console.log(result)
// }

// function nextpage(product_id){
//     navigate(`/updateproduct/${product_id}`)
// }

//     return (
//         <>
//             <Header />
//             <div className="breadcrumb-section breadcrumb-bg">
// 		<div className="container">
// 			<div className="row">
// 				<div className="col-lg-8 offset-lg-2 text-center">
// 					<div className="breadcrumb-text">
// 						<p>vendor</p>
// 						<h1>vendor</h1>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>

//     <div class="cart-section mt-150 mb-150">
// 		<div class="container">
// 			<div class="row">
// 				<div class="col-lg-8 col-md-12">
// 					<div class="cart-table-wrap">
// 						<table class="cart-table">
// 							<thead class="cart-table-head">
// 								<tr class="table-head-row">
// 									{/* <th class="product-remove"></th> */}
//                                     <th class="product_id">#</th>
// 									<th class="product-image">Product Image</th>
// 									<th class="product-name">Name</th>
//                                     <th class="product-name">Description</th>
// 									<th class="product-price">Price</th>
// 									<th class="product-quantity">Discount</th>
// 									<th class="product-total">Update</th>
//                                     <th class="product-total">Delete</th>

// 								</tr>
// 							</thead>
// 							<tbody>
//                             {
//                              products.map((product) => (
//                                  <tr >
//                                    <td class="product-image">{product.product_id}</td>
//                                      <td class="product-image"><img src={'http://localhost:3009/' + product.product_photo} alt="" /></td>
//                                      <td  class="product-name">{product.product_name}</td>
//                                      <td  class="product-price">{product.product_description}</td>
//                                      <td class="product-quantity">{product.product_price}</td>
//                                      <td  class="product-price">{product.product_discount}</td>

//                                      <td><i onClick={()=> nextpage(product.product_id)} class="fa fa-edit" /></td>
// 									 <td><i onClick={() => deleteOperation(product.product_id)} class="fa fa-trash" /></td>

//                                  </tr>
//                              )
//                              )
//                          }
// 							</tbody>
// 						</table>
// 					</div>
// 				</div>

// 			</div>
// 		</div>
// 	</div>

//         </>
//     )
// }

// export default Vendorhome

import React, { useState, useEffect } from "react";
// import Header from './Header'
import axios from "axios";
// import { useParams } from 'react-router'
// import {  useNavigate } from 'react-router-dom';
import VendorviewCard from "./VendorViewCard";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { VendorNav } from "./VendorNav";
import Footer from "./Footer";

function Vendorhome() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const u_id = localStorage.getItem("EcomUserId");

  useEffect(() => {
    //console.log("test")
    getProductsData();
  }, []);

  const role = localStorage.getItem("Ecomrole");

  console.log(role);
  if (role != "Vendor") {
    alert("You are not autherized for this");
    navigate("/");
  }

  async function getProductsData() {
    const { data } = await axios.get(
      `http://localhost:3009/viewProductt/${u_id}`,
      {
        // headers: {
        //     token:window.localStorage.getItem('token')
        // }
      }
    );
    setProducts(data.products.reverse());
  }

  // async function deleteOperation(id) {
  //     //alert(id)
  //     let result = await fetch('http://localhost:3009/deleteProduct/' + id, {
  //         method: 'DELETE'
  //     })
  //     getProductsData()
  //     result = await result.json();
  //     console.log(result)
  // }

  function nextpage() {
    navigate("/addproduct");
  }

  return (
    <>
      <VendorNav />

      <div class="breadcrumb-section breadcrumb-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
              <div class="breadcrumb-text">
                <p>Vendor</p>
                <h1>View Product</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        <div class="row">
          <div class="col-md-12">
            <div class="product-filters">
              <ul>
                <li class="active" onClick={nextpage}>
                  Add Product
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row product-lists">
          {products.map((val) => {
            return (
              <>
                <VendorviewCard
                  // key={ind}
                  product_id={val.product_id}
                  product_name={val.product_name}
                  product_description={val.product_description}
                  product_discount={val.product_discount}
                  product_price={val.product_price}
                  product_photo={val.product_photo}
                />
              </>
            );
          })}
        </div>
        <Footer />
    </>
  );
}

export default Vendorhome;
