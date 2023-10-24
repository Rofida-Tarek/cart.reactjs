import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import style from "./Layout.module.css";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { Offline, Online } from "react-detect-offline";
export default function Layout() {
  let { setusertoken } = useContext(userContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setusertoken(localStorage.getItem("userToken"));
    }
  }, [setusertoken]);
  return (
    <>
      <Navbar />
      <div className="container my-5 ">
        <Outlet></Outlet>
      </div>
      <Footer />
      <div>
        <Offline>
          <div className="network">
            <i className="fas fa-wifi"></i>{" "}
            <span className="fw-bold">You Are offline (surprise!)</span>
          </div>
        </Offline>
      </div>
    </>
  );
}
