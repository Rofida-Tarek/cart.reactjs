import React from "react";
import style from "./Profile.module.css";
import jwtDecode from "jwt-decode";
import imge from "../../Assets/images/download.png";
import { Helmet } from "react-helmet";
export default function Profile() {
  let x = jwtDecode(localStorage.getItem("userToken"));
  // console.log(x.name);
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="d-flex justify-content-between align-items-center container mt-5 p-5 bg-main-light">
        {" "}
        <h2 className="fs-1 fw-bold">Hello Ya : {x.name}</h2>
        <img src={imge} alt="rr" />
      </div>
    </>
  );
}
