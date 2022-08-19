import React, { useEffect,useState} from "react";
import Footer from "./Footer";
// import "./style.css";
// import { Link } from 'react-router-dom'
// import Header from './Header'
import Navbar from "./Navbar";
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Homepage() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  function shop() {
    navigate("/viewproduct");
  }

//   useEffect(() => {
//     //console.log("test")
//     getProductsData()
// }, [])

// async function getProductsData() {
//     const { data } = await axios.get('http://localhost:3009/viewProduct', {
//         // headers: {
//         //     token:window.localStorage.getItem('token')
//         // }
//     })
//     setProducts(data.products)
   
// }

// console.log(products)


  return (
    <>
      <Navbar />
      <Slider />
      <div className="list-section pt-80 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <div className="content">
                  <h3>Free Shipping</h3>
                  <p>When order over $75</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-phone-volume"></i>
                </div>
                <div className="content">
                  <h3>24/7 Support</h3>
                  <p>Get support all day</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="list-box d-flex justify-content-start align-items-center">
                <div className="list-icon">
                  <i className="fas fa-sync"></i>
                </div>
                <div className="content">
                  <h3>Refund</h3>
                  <p>Get refund within 3 days!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3>
                  <span className="orange-text">Our</span> Products
                </h3>
                <p>
                  Quality in a product or service is not what the supplier puts
                  in. It is what the customer gets out and is willing to pay
                  for. A product is not quality because it is hard to make and
                  costs a lot of money, as manufacturers typically believe.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* {
              products.map((val) =>{
            <div className="col-lg-4 col-md-6 text-center">
              <div className="single-product-item">
                <div className="product-image">
                  <a>
                    <img src={"http://localhost:3009/" + val.product_photo} alt="" />
                  </a>
                </div>
                <p className="product-price"> {val.product_price} </p>
                <a className="cart-btn" onClick={shop}>
                  <i className="fas fa-shopping-cart"></i> Buy Now
                </a>
              </div>
            </div>
            })
          } */}
          </div>

          <div style={{paddingTop:"70px"}}>
            <center>
              <a className="carts-btn" onClick={shop}>
                <center>
                  <span
                    style={{
                      fontFamily: "Lucida Console Courier New monospace",
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    Show More...
                  </span>
                </center>
              </a>
            </center>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
