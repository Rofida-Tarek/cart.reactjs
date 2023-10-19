import React, { useContext, useEffect, useState, useRef } from "react";
import style from "./FeatureProducts.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishlistContext";

export default function FeatureProducts() {
  const heartRefs = useRef([]);
  let { addproductstocart } = useContext(CartContext);
  let { AddproducttoWishlist } = useContext(WishContext);
  let [loading, setloading] = useState(false);

  async function addtocart(id) {
    setloading(true);
    let data = await addproductstocart(id);
    console.log(data);
    if (data.status === "success") {
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

  let [search, setsearch] = useState("");
  let { isLoading, data } = useQuery("faetureproducts", getfeatureproducts);

  function getfeatureproducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  function handleSearchChange(e) {
    console.log(e.target.value);
    let char = e.target.value;
    setsearch(char);
  }

  function filterproducts() {
    if (search === "") {
      return data?.data.data;
    } else {
      return data?.data?.data.filter((product) =>
        product.category.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  async function addtowishlist(id, index) {
    await AddproducttoWishlist(id);
    heartRefs.current[index]?.classList.add("text-red");
  }

  return (
    <>
      <form action="">
        <input
          type="search"
          placeholder="search....."
          className="w-75 form-control m-auto mt-3"
          onChange={handleSearchChange}
        />
      </form>
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
        <>
          {" "}
          {isLoading ? (
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
            <div className="row d-flex justify-content-center mt-4 pt-2">
              {filterproducts().map((product, index) => (
                <div key={product._id} className="col-md-6 col-lg-3 mb-3 ">
                  <div className="product products p-3 rounded">
                    <Link to={`Productsdetails/${product.id}`}>
                      <img
                        className="w-100"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <p className="text-main fw-bold font-sm">
                        {product.category.name}
                      </p>
                      <h2 className="h6 fw-bolder font-sm">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h2>
                      <div className="d-flex justify-content-between">
                        <span>{product.price} EGP</span>
                        <div className="d-flex align-items-center">
                          <i className="fa fa-star rating-color "></i>
                          <span>{product.ratingsAverage}</span>
                        </div>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        onClick={() => addtocart(product._id)}
                        type="submit"
                        className="btn bg-main text-white w-75 mt-2 btn-sm"
                      >
                        +Add
                      </button>
                      <span
                        onClick={() => {
                          addtowishlist(product.id, index);
                        }}
                      >
                        {" "}
                        <i
                          ref={(el) => (heartRefs.current[index] = el)}
                          className=" fa-solid fa-heart h3 "
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
