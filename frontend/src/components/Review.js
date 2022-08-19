import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function Review() {
  const [data, setData] = useState([]);

  const product_id = localStorage.getItem("ProductId");

  const stars = Array(5).fill(0);

  let starCount = 0;

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3009/review/${product_id}`, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("Response", response);
        setData(response.data.response);
      });
  }, []);

  return (
    <>
      <div class="breadcrumb-section-ratings breadcrumb-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
              <div class="breadcrumb-text">
                <p>Home Product</p>
                <h1>Reviews</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="latest-news mt-150 mb-150">
      {data.map((val) => (
        <div class="container">
          <div class="single-latest-news">
            <div class="news-text-box">
              <p class="blog-meta">
                <span class="author">
                  <i class="fas fa-user"></i> {val.user_name}
                </span>
              </p>
              <p>
                <span class="date">
                {stars.map((_, index) => {
                            return (
                                (index>val.review_star-1) ? (
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
                                            style={{color:"orange"}}
                                        />  
                                )
                                
                            );
                          })}
                </span>
              </p>
              <p class="excerpt">{val.review_description}</p>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
}

export default Review;