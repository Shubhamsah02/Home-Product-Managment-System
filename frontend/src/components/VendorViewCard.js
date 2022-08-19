import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import Header from './Header'
import axios from "axios";

function VendorviewCard({
  product_id,
  product_name,
  product_description,
  product_price,
  product_discount,
  product_photo,
}) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    //console.log("test")
    getProductsData();
  }, []);

  async function getProductsData() {
    const { data } = await axios.get("http://localhost:3009/viewProduct", {
      headers: {
        token: window.localStorage.getItem("token"),
      },
    });
    setProducts(data.products.reverse());
  }

  async function deleteOperation(id) {
    //alert(id)
    let result = await fetch("http://localhost:3009/deleteProduct/" + id, {
      method: "DELETE",
    });
    getProductsData();
    result = await result.json();
    console.log(result);
    window.location.reload();
  }

  function nextpage(product_id) {
    // alert(product_id)
    navigate(`/updateproduct/${product_id}`);
  }

  return (
    <>
      {/* <Header /> */}

      <div
        className="col-lg-4 col-md-6 text-center strawberry"
      >
        <div className="single-product-item" >
          <div className="product-image">
            <a>
              <img
                className="imgs"
                src={"http://localhost:3009/" + product_photo}
                alt=""
              />
            </a>
          </div>
          {/* <h3>{product_name}</h3> */}
          <p className="product-price">{product_name}</p>
          <h3>
            <p className="product-price">
              Rate: $ {product_price}
              <span>Discount: $ {product_discount}</span>
            </p>
          </h3>
          <p className="excerpt">{product_description}</p>
          {/* <p className="product-price">{product_discount}</p> */}
          <a className="cart-btn mx-2" onClick={() => nextpage(product_id)}>
            <i className="fas fa-edit"> Edit</i>{" "}
          </a>
          <a className="cart-btn mx-2" onClick={() => deleteOperation(product_id)}>
            <i className="fas fa-trash"> Delete</i>
          </a>
        </div>
      </div>
    </>
  );
}

export default VendorviewCard;
