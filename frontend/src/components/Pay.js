import React, {useEffect, useRef} from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Pay() {
  const amount = localStorage.getItem("Total");
  console.log(amount);
  const email = localStorage.getItem("EcomEmail");
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

  return (
      <>
    <Navbar/>
      <div>
      
    <div
      className="container"
      style={{
        textAlign: "center",
        height: "250px",
        paddingTop: "15rem",
      }}
    >
      <PayPalScriptProvider options={{ "client-id": "test" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {


              //payment_status update to paid
              axios.post("http://localhost:3009/changeStatus", {
                product_id: localStorage.getItem("productId"),
              });

              // status update to paid in product table
              axios.post("http://localhost:3009/changeProductStatus", {
                product_id: localStorage.getItem("productId"),
              });

              //Clear all cart
              axios.delete(`http://localhost:3009/deleteAll/${localStorage.getItem('EcomUserId')}`)

              navigate("/success");

              window.location.reload();
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
    </div>
    </>
  );
}