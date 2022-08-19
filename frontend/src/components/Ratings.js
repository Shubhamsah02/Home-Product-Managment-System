import React, { useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
import Footer from "./Footer";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Ratings = () => {
  const navigate = useNavigate();
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
          navigate("/login");
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

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [description, setDescription] = useState();
  const stars = Array(5).fill(0);
  const id = localStorage.getItem("EcomUserId");
  const pId = localStorage.getItem("productId");
  const uName = localStorage.getItem("EcomUser");

  const submit = async (e) => {
    e.preventDefault();
    if (currentValue === 0) {
      alert("Please give stars!!");
    } else {
      axios
        .post("http://localhost:3009/ratings", {
          review_description: description,
          review_star: currentValue,
          user_id: id,
          product_id: pId,
          user_name: uName,
        })
        .then((response) => {
          //console.log("1", response.data);
          if (response.data.message === "Exists!!") {
            alert("Sorry, you've already done review!!");
            navigate(`/orderhistory/${id}`);
          } else {
            alert("Success!");
            navigate(`/orderhistory/${id}`);
          }
        });
    }
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <>
    <Navbar />
      <div class="breadcrumb-section-ratings breadcrumb-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
              <div class="breadcrumb-text">
                <p>review</p>
                <h1>Add Review</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form type="POST" id="fruitkha-contact" onSubmit={submit}>
        <div style={styles.container}>
          <h4 style={{ fontSize: "30px", color: "#00997a" }}>
            {" "}
            Product Rating{" "}
          </h4>
          <div style={styles.stars}>
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={
                    (hoverValue || currentValue) > index
                      ? colors.orange
                      : colors.grey
                  }
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
          <textarea
            placeholder="What's your feedback type here..?"
            style={styles.textarea}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
          {/* 
      <button
        style={styles.button}
      >
        Submit
      </button>
       */}
          <button
            type="submit"
            className="btn btn-outline-light"
            style={{ borderColor: "#00997a", color: "black" }}
          >
            Submit
          </button>
        </div>
      </form>
      <Footer/>
    </>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "85px",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 50,
    padding: 3,
  },
};
export default Ratings;
