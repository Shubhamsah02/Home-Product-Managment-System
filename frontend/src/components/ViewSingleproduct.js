import React, { useContext, useEffect, useState, useRef } from "react";
// import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { VendorNav } from "./VendorNav";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaStar } from "react-icons/fa";
import "./Reviewslider.css";

function ViewSingleProduct() {
  const { product_id } = useParams();

  const nevigate = useNavigate();

  const [detdata, setDetdata] = useState([]);
  const [pdetails, setPdetails] = useState("1");

  // Authentication
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
          nevigate("/");
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

  const onSub = (e) => {
    e.preventDefault();

    // console.log(pdetails)
    const data = {
      product_id: detdata[0].product_id,
      product_name: detdata[0].product_name,
      product_price: detdata[0].product_price,
      product_description: detdata[0].product_description,
      product_photo: detdata[0].product_photo,
      qty: pdetails,
    };

    localStorage.setItem("photo", detdata[0].product_photo);
    localStorage.setItem("productId", detdata[0].product_id);
    localStorage.setItem("product", detdata[0].product_name);
    localStorage.setItem("price", detdata[0].product_price);
    localStorage.setItem("qty", pdetails);
    console.log("data", data);

    const cartData = {
      user_id: localStorage.getItem("EcomUserId"),
      product_id: localStorage.getItem("productId"),
      product_name: localStorage.getItem("product"),
      product_price: localStorage.getItem("price"),
      product_qty: localStorage.getItem("qty"),
      product_photo: localStorage.getItem("photo"),
    };

    console.log("cart", cartData);

    const res = axios
      .post(`http://localhost:3009/addCart/${product_id}`, cartData)
      .then((response) => {
        //console.log(response.data.message)
        if(response.data.message === "Exists!!"){
          alert("It's already avaliable in cart!!");
          nevigate("/viewproduct");
        }
        else{
        nevigate("/viewproduct");
        }
      });
  };

  const getData = async () => {
    const res = await axios.post(
      `http://localhost:3009/viewProduct/${product_id}`
    );
    setDetdata(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Random 3 Review

  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const stars = Array(5).fill(0);

  let starCount = 0;

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  useEffect(() => {
    const lastIndex = data.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, data]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  useEffect(() => {
    axios
      .get(`http://localhost:3009/rand/${localStorage.getItem("ProductId")}`, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("Response", response);
        setData(response.data.response);
      });
  }, []);

  function review() {
    nevigate("/reviews");
  }

  if (!detdata.length) {
    return <h4>Loading..</h4>;
  }

  return (
    <>
      <Navbar />
      <div class="breadcrumb-section breadcrumb-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
              <div class="breadcrumb-text">
                <p>See more Details</p>
                <h1>Single Product</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="single-product mt-150 mb-150">
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <div class="single-product-img">
                <img
                  className="img_single"
                  src={"http://localhost:3009/" + detdata[0].product_photo}
                  alt="img"
                />
              </div>
            </div>
            <div class="col-md-7">
              <div class="single-product-content">
                <h3>{detdata[0].product_name}</h3>
                <p class="single-product-pricing">
                  {" "}
                  Price : $<strong>{detdata[0].product_price}.00</strong>{" "}
                </p>
                <p>Description : {detdata[0].product_description}</p>
                <p
                  style={{
                    color:
                      detdata[0].product_status === "Out of Stock"
                        ? "red"
                        : "green",
                  }}
                >
                  {detdata[0].product_status}
                </p>
                <div class="single-product-form">
                  <form onSubmit={onSub}>
                    <input type="hidden" value={detdata[0].product_id} />
                    <div className="form-group w-50">
                      <label for="sel1">Choose Qty:</label>
                      <select
                        className="form-control"
                        id=""
                        onChange={(e) => setPdetails(e.target.value)}
                        required
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="submit"
                        className="cart-btn"
                        value="addcart"
                        disabled={
                          detdata[0].product_status === "Out of Stock"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </form>
                  {/* <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
							<p><strong>Categories: </strong>Fruits, Organic</p> */}
                </div>
                <h4>Share:</h4>
                <ul class="product-share">
                  <li>
                    <a href="">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i class="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i class="fab fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="title">
          <h3>Reviews</h3>
        </div>
        <div className="section-center">
          {data.map((item, indexPeople) => {
            const { user_name, review_description } = item;
            let position = "nextSlide";
            if (indexPeople === index) {
              position = "activeSlide";
            }
            if (
              indexPeople === index - 1 ||
              (index === 0 && indexPeople === data.length - 1)
            ) {
              position = "lastSlide";
            }
            return (
              <article className={position}>
                <img
                  src="/assets/img/avaters/userimg.png"
                  className="person-img"
                />
                <h4>{user_name}</h4>
                <p>
                  <span class="date">
                    {stars.map((_, index) => {
                      return index > item.review_star - 1 ? (
                        <FaStar
                          key={index}
                          size={20}
                          // colors.orange
                          // style={{color:""}}
                        />
                      ) : (
                        <FaStar
                          key={index}
                          size={20}
                          // colors.orange
                          style={{ color: "orange" }}
                        />
                      );
                    })}
                  </span>
                </p>
                <p className="title">{review_description}</p>
              </article>
            );
          })}
          <button className="prev" onClick={() => setIndex(index - 1)}>
            <i className="fas fa-arrow-left" />
          </button>
          <button className="next" onClick={() => setIndex(index + 1)}>
            <i className="fas fa-arrow-right" />
          </button>
        </div>
      </section>

      <div>
        <center>
          <a className="carts-btn" onClick={review}>
            <center>
              <span
                style={{
                  fontFamily: "Lucida Console Courier New monospace",
                  fontSize: "20px",
                }}
              >
                Show More...
              </span>
            </center>
          </a>
        </center>
      </div>

      <Footer />
    </>
  );
}

export default ViewSingleProduct;
