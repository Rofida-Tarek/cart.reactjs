import React, { useContext, useState } from "react";
import style from "./Productsdetails.module.css";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { CartContext } from "../../Context/CartContext";
import { RotatingLines } from "react-loader-spinner";
import { WishContext } from "../../Context/WishlistContext";

export default function Productsdetails() {
  let { AddproducttoWishlist } = useContext(WishContext);
  let { addproductstocart } = useContext(CartContext);
  let [loading, setloading] = useState(false);
  async function addtocart(id) {
    setloading(true);
    let data = await addproductstocart(id);
    console.log(data);
    if (data?.status === "success") {
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
  // let [loading, setloading] = useState(false);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let { id } = useParams();
  function getproductsdetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { isLoading, data } = useQuery("dealisproducts", () =>
    getproductsdetails(id)
  );
  async function addtowishlist(id) {
    let data = await AddproducttoWishlist(id);
    //   if (data.status === "success") {
    //     toast.success(data.message, {
    //       duration: 4000,
    //       style: {
    //         background: "green",
    //         color: "white",
    //       },
    //     });
    //   } else {
    //     toast.error("Error");
    //   }
  }
  return (
    <>
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
        <div className="row align-items-center justify-content-between mt-3">
          <Helmet>
            <title>{data?.data.data.category.name}</title>
          </Helmet>
          <div className="col-md-4">
            <Slider {...settings}>
              {data?.data.data.images.map((img) => (
                <img
                  key={data?.data.data.category._id}
                  className="w-100"
                  src={img}
                  alt={data?.data.data.title}
                />
              ))}
            </Slider>
          </div>
          <div className="col-md-8 ">
            <h2 className="h4 fw-bold">{data?.data.data.title}</h2>
            <p>{data?.data.data.description}</p>
            <div className="d-flex justify-content-between">
              <span>{data?.data.data.price} EGP</span>
              <div>
                <i className="fa fa-star rating-color"></i>
                <span>{data?.data.data.ratingsAverage}</span>
              </div>
            </div>
            <div className="d-flex justify-content-around mt-4">
              <button
                onClick={() => addtocart(data?.data.data._id)}
                type="submit"
                className="btn bg-main text-white w-75 align-items-centre fw-bold"
              >
                +Add
              </button>
              <i
                onClick={() => addtowishlist(data?.data.data._id)}
                className=" fa-solid fa-heart h3 cursor-pointer"
              ></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
