import React from "react";
import style from "./Categoryslider.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
export default function Categoryslider() {
  var settings = {
    // dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    draggable: false,
  };
  function getcategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data } = useQuery("category", getcategory);
  // console.log(data?.data);

  return (
    <>
      {data?.data.data ? (
        <Slider {...settings}>
          {data?.data.data.map((category) => (
            <div className="mb-3 " key={category._id}>
              {" "}
              <img
                className="w-100"
                height={220}
                src={category.image}
                alt={category.name}
              />
              <h5>{category.name}</h5>
            </div>
          ))}
        </Slider>
      ) : (
        ""
      )}
    </>
  );
}
