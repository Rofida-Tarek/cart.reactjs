import React, { useContext, useEffect } from "react";
import style from "./Cart.module.css";
import { Link, Navigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Cart() {
  let {
    price,
    numOfCartItems,
    products,
    deletecartitem,
    updateproductqunt,
    clearusercart,
  } = useContext(CartContext);
  // console.log(products);
  if (products === null) {
    return (
      <div className="container bg-main-light p-5 mt-5 ">
        <h2 className=" fw-bolder p-2 mb-1">Cart Shop</h2>
        <p className=" fw-bolder h2 p-2 mt-1">your cart is empty</p>
        {/* <Navigate to={"/"} /> */}
      </div>
    );

    // <div className="loading">
    //   <RotatingLines
    //     strokeColor="white"
    //     strokeWidth="5"
    //     animationDuration="0.75"
    //     width="96"
    //     visible={true}
    //   />
    // </div>
  }
  // if (products.length === 0) {
  //   return (
  //     <>
  //       {" "}
  //       <div className="d-flex justify-content-between mb-2">
  //         <h2 className="h3 fw-Bolder">Cart Shop</h2>
  //         <Link className="btn btn-primary fw-bold">Check out</Link>
  //       </div>
  //     </>
  //   );
  // }
  async function deletitem(id) {
    let data = await deletecartitem(id);
    if (data.status === "success") {
      toast.success("The product has been successfully deleted", {
        duration: 4000,
        style: {
          background: "green",
          color: "white",
        },
      });
    } else {
      toast.error("Error");
    }
  }
  async function updateproduct(id, count) {
    let data = await updateproductqunt(id, count);
    if (data.status === "success") {
      toast.success("update successfully", {
        duration: 4000,
        style: {
          background: "white",
          color: "black",
        },
      });
    } else {
      toast.error("Error");
    }
  }
  async function clearcart() {
    await clearusercart();
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="container bg-main-light p-5 mt-5">
        <div className="d-flex justify-content-between mb-2">
          <h2 className="h3 fw-Bolder">Cart Shop</h2>
          <Link to={"/Checkout"} className="btn btn-primary fw-bold">
            Check out
          </Link>
        </div>
        <div className="d-flex justify-content-between p-3">
          <h5 className=" fw-bolder ">
            total price: <span className="text-main">{price}</span>
          </h5>
          <h5 className=" fw-bolder ">
            {" "}
            total number of items:
            <span className="text-main">{numOfCartItems}</span>
          </h5>
        </div>
        {products?.map((prodduct) => (
          <div
            key={prodduct?.product._id}
            className="row border-bottom px-3 py-2 justify-content-between align-items-center "
          >
            <div className="col-md-6">
              <div className="row align-items-center">
                <div className="col-md-4 p-2 py-3">
                  <img
                    className="w-100"
                    src={prodduct?.product.imageCover}
                    alt=""
                  />
                </div>
                <div className="col-md-8">
                  <h2 className="h5 fw-bold">
                    {prodduct?.product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <p className="fw-bold font-sm">{prodduct?.price} EGP</p>
                  <span
                    onClick={() => deletitem(prodduct?.product._id)}
                    className="btn text-danger "
                  >
                    <i className="fa-solid fa-trash-can"></i> Remove
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <button
                onClick={() =>
                  updateproduct(prodduct?.product._id, prodduct.count + 1)
                }
                className="btn btn-outline-success"
              >
                +
              </button>
              <span className="px-2">{prodduct.count}</span>
              <button
                onClick={() =>
                  updateproduct(prodduct?.product._id, prodduct.count - 1)
                }
                className="btn btn-outline-danger"
              >
                -
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4 p-2 text-align-center align-items-center d-flex justify-content-center">
          <button onClick={clearcart} className="btn btn-outline-success  fs-5">
            Clear Your Cart
          </button>
        </div>
      </div>
    </>
  );
}
