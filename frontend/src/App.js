import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import CardProduct from "./components/CardProduct";
import ViewProduct from "./components/ViewProduct";
import ViewSingleProduct from "./components/ViewSingleproduct";
import Cart from "./components/Cart";
import OrderHistory from "./components/OrderHistory";
import AddProduct from "./components/VendorAddProduct";
import Vendorhome from "./components/Vendorhome";
import Vendorupdate from "./components/Vendorupdate";
import VendorviewCard from "./components/VendorViewCard";
import { VendorNav } from "./components/VendorNav";
import Payment from "./components/Payment";
import Pay from "./components/Pay";
import Success from "./components/Success";
import Ratings from "./components/Ratings";
import Review from "./components/Review";
import Reviewslider from "./components/Reviewslider";
import Vendorviewuser from "./components/Vendorviewuser"
import MyProfile from "./components/MyProfile"
import EditProfile from "./components/EditProfile";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Homepage />} exact />
          {/* <Route path="/a" element={Header} /> */}
          <Route path="/" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/cardproduct" element={<CardProduct />} />
          <Route path="/viewproduct" element={<ViewProduct />} />
          <Route path="/viewsingleproduct/:product_id" element={<ViewSingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderhistory/:user_id" element={<OrderHistory />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/success" element={<Success />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/vendor" element={<Vendorhome />} />
          <Route path="/updateproduct/:id" element={<Vendorupdate />} />
          <Route path="/vendorcard" element={<VendorviewCard />} />
          <Route path="/vnav" element={<VendorNav />} />
          <Route path='/slireview' element={<Reviewslider />} />
          <Route path="/viewusers/:vendor_id" element={<Vendorviewuser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
