import React from 'react'
// import "./style.css";
import { Link } from 'react-router-dom'
// import Header from './Header'


 function Slider() {
  return (
    <>
    
    <div className="homepage-slider">
		{/* <!-- single home slider --> */}
		<div className="single-homepage-slider homepage-bg-1">
			<div className="container">
				<div className="row">
					<div className="col-md-12 col-lg-7 offset-lg-1 offset-xl-0">
						<div className="hero-text">
							<div className="hero-text-tablecell">
								<p className="subtitle">Home Product </p>
								<h1>Everything is designed. Few things are designed well.</h1>
								<div className="hero-btns">
									<Link to="/viewproduct" className="boxed-btn">Visit Shop</Link>
									<a  className="bordered-btn">Contact Us</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		{/* <!-- single home slider --> */}
		<div className="single-homepage-slider homepage-bg-2">
			<div className="container">
				<div className="row">
					<div className="col-lg-10 offset-lg-1 text-center">
						<div className="hero-text">
							<div className="hero-text-tablecell">
								<p className="subtitle">Home Product</p>
								<h1>Your home should be a story of who you are, and be a collection of what you love.</h1>
								<div className="hero-btns">
									<a  className="boxed-btn">Visit Shop</a>
									<a className="bordered-btn">Contact Us</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		{/* <!-- single home slider --> */}
		<div className="single-homepage-slider homepage-bg-3">
			<div className="container">
				<div className="row">
					<div className="col-lg-10 offset-lg-1 text-right">
						<div className="hero-text">
							<div className="hero-text-tablecell">
								<p className="subtitle">Home Product</p>
								<h1>The question of what you want to own is actually the question of how you want to live your life.</h1>
								<div className="hero-btns">
									<a  className="boxed-btn">Visit Shop</a>
									<a  className="bordered-btn">Contact Us</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    </>
  )
}

export default Slider;
