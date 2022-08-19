import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CardProduct from './CardProduct'
import Navbar from './Navbar';
import Footer from './Footer';

function ViewProduct(req, res) {
    const [products, setProducts] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        //console.log("test")
        getProductsData()
    }, [])

    //    if(!window.localStorage.getItem('token')){
    useEffect(() => {
        //  window.alert("You are not Autherized For this")
        //  nevigate('/')
    }, [])
    //    }
    async function getProductsData() {
        const { data } = await axios.get('http://localhost:3009/viewProduct', {
            // headers: {
            //     token:window.localStorage.getItem('token')
            // }
        })
        setProducts(data.products)
    }
    
    const sortData= async (sort)=>{
        const res=await axios.get(`http://localhost:3009/sort/${sort}`,{
    
        })
        setProducts(res.data)
    }
    const sortHandel=(e)=>{
    const sort=e.target.value
    if(sort==='all')
    {
      getProductsData()
    }
    else {
        sortData(sort)
    }
    
    }

    const sortCategory= async (sort)=>{
        const res=await axios.get(`http://localhost:3009/sortCat/${sort}`)
        setProducts(res.data)
      }
      const sortHandelCategory=(e)=>{
      const sort=e.target.value
      if(sort==='all')
      {
      getProductsData()
      }
      else {
        sortCategory(sort)
      }
      
      }

    return (
        <>
            <Navbar />
<div>
            <div class="breadcrumb-section breadcrumb-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 text-center">
                            <div class="breadcrumb-text">
                                <p>Home Product</p>
                                <h1>Shop</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="product-filters">
                        <ul>
                            <li class="active" data-filter="*">All</li>
                            <li onClick={sortHandelCategory} value="1" >Office</li>
                            <li onClick={sortHandelCategory} value="2">Bedroom</li>
                            <li onClick={sortHandelCategory} value="3">Livingroom</li>
                            <li onClick={sortHandelCategory} value="4">Kitchen</li>

                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="product-filters">
                        <ul >
                            {/* <li class="active" data-filter="*">All</li> */}
                            <li onClick={sortHandel}  value="50">less then 50</li>
                            <li  onClick={sortHandel} value="50100">50-100</li>
                            <li  onClick={sortHandel} value="100">100</li>
                            {/* <li >Kitchen</li> */}

                        </ul>
                    </div>
                </div>
            </div>

            <div className="row product-lists">

                {
                    products.map((val, ind) => {
                        return (
                            <>
                                <CardProduct
                                    key={ind}
                                    product_id={val.product_id}
                                    product_name={val.product_name}
                                    product_price={val.product_price}
                                    product_photo={val.product_photo}
                                />
                            </>
                        )
                    })
                }
            </div>
            <br/>
            </div>
            <Footer/>









        </>
    )
}

export default ViewProduct
