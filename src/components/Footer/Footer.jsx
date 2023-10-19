import React from "react";
import style from "./Footer.module.css";
import amazon from "../../Assets/images/pngwing.com (1).png";
import mastercard from "../../Assets/images/mastercard.png";
import paypal from "../../Assets/images/paypal.png";
import appstore from "../../Assets/images/appstore.png";
import googlestore from "../../Assets/images/googleplay.png";
export default function Footer() {
  return (
    <>
      <div className=" bg-main-light ">
        <div className="container p-3">
          <div className=" row justify-content-between align-items-center ">
            <div className="col-md-9">
              <h5 className="fw-bold">Get the FrechCart App </h5>
              <p>
                we will send you a link,open it in your phoneto download the App
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-9">
              <input
                className="form-control"
                type="text"
                placeholder="Email..."
              />
            </div>
            <div className="col-md-2 ">
              <button className="btn bg-main text-white respon ">
                Share-App
              </button>
            </div>
          </div>

          <div className="row p-1">
            <div className="col-md-6 d-flex align-items-center ">
              <h6 className="fw-bold">Payment partners</h6>
              <img src={amazon} alt="amazon" />
              <img width={50} src={mastercard} alt="mastercard" />
              <img src={paypal} alt="paypal" />
            </div>
            <div className="col-md-5 d-flex  align-items-center">
              <p className="me-1">Get deliveries with FreshCart</p>
              <img src={appstore} alt="appstore" />
              <img src={googlestore} alt="googlestore" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
