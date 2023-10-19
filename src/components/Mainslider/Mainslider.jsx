import React from "react";
import style from "./Mainslider.module.css";
import Slider from "react-slick";
import slid1 from "../../Assets/images/slider-image-1.jpeg";
import slid2 from "../../Assets/images/slider-image-2.jpeg";
import slid3 from "../../Assets/images/slider-image-3.jpeg";
import img1 from "../../Assets/images/grocery-banner.png";
import img2 from "../../Assets/images/grocery-banner-2.jpeg";
export default function Mainslider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <div className="row gx-0 mt-5">
        <div className="col-md-9 mb-5">
          <Slider {...settings}>
            <img height={400} className="w-100" src={slid1} alt="img1" />
            <img height={400} className="w-100" src={slid2} alt="img2" />
            <img height={400} className="w-100" src={slid3} alt="img2" />
          </Slider>
        </div>
        <div className="col-md-3">
          <img height={200} className="w-100" src={img1} alt="img1" />
          <img height={200} className="w-100" src={img2} alt="img2" />
        </div>
      </div>
    </>
  );
}
