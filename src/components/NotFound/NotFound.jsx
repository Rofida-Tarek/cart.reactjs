import React from "react";
import style from "./NotFound.module.css";
import error from "../../Assets/images/error.svg";
import { Helmet } from "react-helmet";
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className=" container mt-5 d-flex justify-content-center ">
        <img src={error} alt="error" />
      </div>
    </>
  );
}
