import React, { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css";
import { WishContext } from "../../Context/WishlistContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
export default function WishList() {
  let { deletproductfromwishlist, product } = useContext(WishContext);
  let { addproductstocart } = useContext(CartContext);
  let [loading, setloading] = useState(false);
  async function deletproduct(id) {
    setloading(true);
    await deletproductfromwishlist(id);
    setloading(false);
  }
  async function addtocart(id) {
    setloading(true);
    let data = await addproductstocart(id);
    console.log(data);
    if (data.status === "success") {
      // deletproduct();
      toast.success(data.message, {
        duration: 4000,
        style: {
          background: "green",
          color: "white",
        },
      });
    } else {
      toast.error("Error");
    }
    setloading(false);
  }
  return (
    <>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      {/* <div className="mt-5 p-5">
        price: {price[0]}
        <h2>name:{name[0]}</h2>
      </div> */}
      {loading ? (
        <div className="loading">
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <div className="container bg-main-light p-5 mt-5">
          <div className="d-flex justify-content-between mb-2">
            <h2 className="h3 fw-bolder">My wish List</h2>
          </div>

          {product?.map((item, index) => (
            <div
              key={index}
              className="row border-bottom px-3 py-2 justify-content-between align-items-center "
            >
              <div className="col-md-6">
                <div className="row align-items-center">
                  <div className="col-md-4 p-2 py-3">
                    <img
                      className="w-100"
                      src={item?.imageCover}
                      alt="imgcover"
                    />
                  </div>
                  <div className="col-md-8">
                    <h3 className="fw-bold h5 fw-bolder">
                      {item?.category.name}
                    </h3>
                    <p className="fw-bold font-sm">{item?.price} EGP</p>

                    <span
                      onClick={() => deletproduct(item?._id)}
                      className="btn text-danger "
                    >
                      <i className="fa-solid fa-trash-can"></i> Remove
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button
                  // onClick={() =>
                  //   updateproduct(prodduct?.product._id, prodduct.count + 1)
                  // }
                  onClick={() => addtocart(item?._id)}
                  className="btn btn-outline-success p-2 px-3"
                >
                  <span className="fs-5 ">Add to cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
