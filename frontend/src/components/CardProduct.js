// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// // import Header from './Header'

// function CardProduct({ product_id, product_name, product_price, product_photo }) {
//     const nevigate = useNavigate
//     return (
//         <>
//             {/* <Header /> */}

//                         <div class="col-lg-4 col-md-6 text-center strawberry">
//                             <div class="single-product-item">
//                                 <div class="product-image">
//                                     <a href="single-product.html"><img src={'http://localhost:3009/' + product_photo} alt="" /></a>
//                                 </div>
//                                 <h3>{product_name}</h3>
//                                 <p class="product-price">{product_price}</p>
//                                 <a  class="cart-btn"><i class="fas fa-shopping-cart" onClick={() => nevigate(`/details/${product_id}`)}></i> view Detail</a>
//                                 <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
//                             </div>
//                         </div>

//         </>
//     )
// }

// export default CardProduct

import React from "react";
import { useNavigate } from "react-router-dom";
// import Header from './Header'
function CardProduct({
  product_id,
  product_name,
  product_price,
  product_photo,
}) {
  const navigate = useNavigate();

  function nextpage(product_id) {
    console.log(product_id);
    localStorage.setItem("ProductId", product_id);
    navigate(`/viewsingleproduct/${product_id}`);
  }

  return (
    <>
      <div class="col-lg-4 col-md-6 text-center strawberry">
        <div class="single-product-item">
          <div class="product-image">
            <a>
              <img
                className="imgs"
                src={"http://localhost:3009/" + product_photo}
                alt=""
              />
            </a>
          </div>
          <h3>{product_name}</h3>

          <p class="product-price">$ {product_price}</p>

          <a class="cart-btn mx-2" onClick={() => nextpage(product_id)}>
            <i class="fa fa-address-card"></i> View Detail
          </a>
        </div>
      </div>
    </>
  );
}

export default CardProduct;
