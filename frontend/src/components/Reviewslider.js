import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./Reviewslider.css";

const Reviewslider = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const product_id = localStorage.getItem("productId");

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
    </>
  );
};

export default Reviewslider;
