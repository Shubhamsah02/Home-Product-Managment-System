import React from 'react'
// import "./style.css";


const Header = () => {
	return (
		<>
			<div className="top-header-area" id="sticker">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-sm-12 text-center">
							<div className="main-menu-wrap">

								<div className="site-logo">
									<a >
										<img src="/assets/img/bg-rm-logo.png" alt="" />
									</a>
								</div>


								<nav className="main-menu">
									<ul>
										<li><a >About</a></li>


										<li><a >Contact</a></li>

										<li className="current-list-item"><a >Shop</a>

										</li>
										<li>
											<div className="header-icons">
												<a className="shopping-cart" ><i className="fas fa-shopping-cart"></i></a>
												<a className="mobile-hide search-bar-icon" ><i className="fas fa-sign-out-alt"></i></a>
											</div>
										</li>
									</ul>
								</nav>
								<a className="mobile-show search-bar-icon" ><i className="fas fa-search"></i></a>
								<div className="mobile-menu"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Header;