import React, { useState, useEffect } from 'react'
import axios from 'axios';
// import Header from './Header';
import { VendorNav } from './VendorNav';

export const Vendorviewuser = () => {
  const [products, setProducts] = useState([]);
  const vendor_id = localStorage.getItem("EcomUserId");
  //const vendor_id = useParams()
  //console.log(product_id)
  useEffect(() => {
    //console.log("test")
    getProductsData();
  }, []);

  async function getProductsData() {
    const { data } = await axios.get(
      `http://localhost:3009/viewusers/${vendor_id}`,
      {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      }
    );
    setProducts(data.products.reverse());
  }

  return (
    <>
      <VendorNav />

      <div class="breadcrumb-section breadcrumb-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
              <div class="breadcrumb-text">
                <p>Home Product</p>
                <h1>User History</h1>
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
                <table class="cart-table">
                  <thead class="cart-table-head">
                    <tr class="table-head-row">
                      {/* <th class="product-remove"></th> */}
                      {/* <th class="product_id">#</th> */}
                      <th class="product-image">Product Image</th>
                      <th class="product-name">User Name</th>
                      <th class="product-price">Product Name</th>
                      <th class="product-quantity">Quantity</th>
                      <th class="product-total">Product Price</th>
                      <th class="product-total">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                    <tr>
                    <td class="product-image"><img src={'http://localhost:3009/' + product.product_photo} alt="" /></td>
                    <td class="product-name">{product.user_name}</td>
                    <td class="product-name">{product.product_name}</td>
                    <td class="product-quantity">{product.product_qty}</td>
                     <td class="product-price">{product.product_price}</td>
                    <td class="product-price">{product.payment_status}</td>

            
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
    </>
  );
};

export default Vendorviewuser;
