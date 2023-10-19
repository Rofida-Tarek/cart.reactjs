import React from "react";
import style from "./Brand.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Brand() {
  function getallbrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { isLoading, data } = useQuery("allbrands", getallbrands);
  console.log(data?.data.data);
  return (
    <>
      <Helmet>
        <title>brands</title>
      </Helmet>
      <div className="d-flex justify-content-center mt-4 py-3">
        <h1 className="text-main fw-bolder mb-5">All Brands</h1>
      </div>
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
        <div className="row">
          {data?.data.data.map((brand) => (
            <div key={brand._id} className="col-md-3 mb-4 ">
              <div className="card product products rounded">
                <img
                  src={brand.image}
                  className="card-img-top w-100"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text text-center">{brand.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
