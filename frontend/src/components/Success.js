import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Success() {
    const navigate = useNavigate();
    useEffect(() =>{
        setTimeout(() => navigate('/home'), 2000)
       
    })
  return (
    <>
      <div className="container" style={{
        textAlign: "center",
        height: "250px",
        paddingTop: "10rem",
      }}>
        <lord-icon
          src="https://cdn.lordicon.com/lupuorrc.json"
          trigger="loop"
          style={{ width: "250px", height: "250px" }}
        ></lord-icon>
      </div>
      <div className="container" style={{
        textAlign: "center",
        height: "250px",
        paddingTop: "10rem",
      }}>
        <br />
        <label
          style={{
            fontSize: "20px",
            fontStyle: "italic",
            color: "#00997a",
            textAlign: "center",
          }}
          onClick={() => navigate("/home")}
        >
          Successfully Purchased!!
        </label>
      </div>
      <br /> <br /> <br />
      <div>
      </div>
    </>
  );
}