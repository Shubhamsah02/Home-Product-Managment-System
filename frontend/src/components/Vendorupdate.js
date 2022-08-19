import React, { useState, useEffect } from "react";
// import Header from './Header'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { VendorNav } from "./VendorNav";
import Footer from "./Footer";

function Vendorupdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  //alert(id)
  const [product, setProduct] = useState([]);
  /*

  product [{
    name: abc,
    price:12,
    discount:1,
    description: "blah"

   }]

   product_id = 1
   product_name = "table"
   product_price = 21`


   */
  const [product_id, setProductId] = useState(id);
  const [product_name, setProductName] = useState("");
  //const [product_category, setProductCategory] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_discount, setProductDiscount] = useState("");
  //const [product_photo, setProductPhoto] = useState("");

  useEffect(async () => {
    const loadProduct = async () => {
      const result = await axios.get(`http://localhost:3009/viewproduct/${id}`);
      // console.log(result.data)
      // console.log("1", result.data);
      // console.log("2", result);
      // console.log("3",data)
      // console.log("4",products)
      // console.log("5", product);

      setProduct(result.data.products[0]); //main part
      //setProduct(result)

      setProductName(result.data.products[0].product_name);
      // console.log("********************")
      // console.log(typeof(result.data.products[0].product_name))
      // console.log(typeof(product_price))
      // console.log("********************")

      //setProductCategory(result.data.product_category)
      setProductDescription(result.data.products[0].product_description);
      setProductPrice(result.data.products[0].product_price);
      setProductDiscount(result.data.products[0].product_discount);
      //setProductPhoto(result.data.product_photo)
      setProductId(product_id);

      //setProduct(result.data)
    };
    loadProduct();
  }, []);

 const onSubmit = async() => {
  // async function onSubmit() {
    //alert(product_id)
    // console.log("enter", product_id);
    // console.log("===============================");
    // console.log(product);
    // console.log("==============================");
    await axios
      .post(
        `http://localhost:3009/updateProduct/${product_id}`,

        {
          product_id: product.product_id,
          product_name: product.product_name,
          //product_category:product_category,
          product_description: product.product_description,
          product_price: product.product_price,
          product_discount: product.product_discount,
          //product_photo:product_photo
        }
      )
      .then(() => {
        //console.log("hello")
        alert("Successfully Updated");
        navigate("/vendor");
      })
      .catch((error) => console.log("error===>", error));

    // .then(res =>{
    //   res.data()
    // })
    //navigate("/viewproduct")
    //alert(id)
  };


  return (
    <>
      <VendorNav />
      <div className="breadcrumb-section-ratings breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Vendor</p>
                <h1>Update</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-from-section mt-150 mb-150">
        <div className="container">
          <div className="row">
          <center>
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="form-title">
                {/* <h2>Register Here</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, ratione! Laboriosam est, assumenda. Perferendis, quo alias quaerat aliquid. Corporis ipsum minus voluptate? Dolore, esse natus!</p> */}
              </div>
              <div>
                <div className="contact-form">
                  <form onSubmit={onSubmit}>
                    <p>
                      <input
                        type="text"
                        placeholder="Product Name"
                        name="p_name"
                        id="p_name"
                        defaultValue={product.product_name}
                        // onChange={(e) => { setProductName(e.target.value) }}
                        onChange={(e) => {
                          product.product_name = e.target.value;
                          // setProductName(e.target.value);
                        }}
                      />
                    </p>

                    {/* <p>
							<label value={product_category}>Select Role </label><br/>
                            <input type="radio"  name="radio" id="radio1" value="User" onChange={(e) => {setProductCategory(e.target.value);}} />
							Office  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                            <input type="radio"  name="radio" id="radio2" value="Vendor" onChange={(e) => {setProductCategory(e.target.value);}} />
							Living Room &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio"  name="radio" id="radio3" value="Vendor" onChange={(e) => {setProductCategory(e.target.value);}} />
							Dining &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio"  name="radio" id="radio4" value="Vendor" onChange={(e) => {setProductCategory(e.target.value);}} />
							Bedroom &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            
							</p> */}

                    <p>
                      <textarea
                        type="text"
                        rows={3}
                        placeholder="Description"
                        name="description"
                        id="description"
                        defaultValue={product.product_description}
                        // onChange={(e) => { setProductDescription(e.target.value) }}
                        onChange={(e) => {
                          product.product_description = e.target.value;
                        }}
                      />
                    </p>
                    <p>
                      <input
                        type="text"
                        placeholder="Product Price($)"
                        name="price"
                        id="price"
                        defaultValue={product_price}
                        // onChange={(e) => { setProductPrice(e.target.value) }}
                        onChange={(e) => {
                          product.product_price = e.target.value;
                          // setProductPrice(Number(e.target.value));
                        }}
                      />
                    </p>
                    <p>
                      <input
                        type="text"
                        placeholder="Product Discount($)"
                        name="discount"
                        id="discount"
                        defaultValue={product_discount}
                        // onChange={(e) => { setProductDiscount(e.target.value) }}
                        onChange={(e) => {
                          product.product_discount = e.target.value;
                        }}
                      />
                    </p>
                    {/* <p>
                            <input type="file" placeholder="Product Image" name="image" id="image"  onChange={(e) => { setProductPhoto(e.target.files[0]) }} />
							</p> */}

                    {/* <p><textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea></p>
							<input type="hidden" name="token" value="FsWga4&@f6aw" /> */}
                    <p>
                    <input type="submit" value="submit" />
                      {/* <input type="submit" value="Submit" onClick={() => onSubmit()} /> */}
                    </p>
                  </form>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-4">
              <div className="contact-form-wrap">
                <div className="contact-form-box">
                  <h4>
                    <i className="fas fa-map"></i> Shop Address
                  </h4>
                  <p>
                    34/8, East Hukupara <br /> Gifirtok, Sadan. <br /> Country
                    Name
                  </p>
                </div>
                <div className="contact-form-box">
                  <h4>
                    <i className="far fa-clock"></i> Shop Hours
                  </h4>
                  <p>
                    MON - FRIDAY: 8 to 9 PM <br /> SAT - SUN: 10 to 8 PM{" "}
                  </p>
                </div>
                <div className="contact-form-box">
                  <h4>
                    <i className="fas fa-address-book"></i> Contact
                  </h4>
                  <p>
                    Phone: +00 111 222 3333 <br /> Email: support@fruitkha.com
                  </p>
                </div>
              </div>
            </div> */}
            </center>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Vendorupdate;
