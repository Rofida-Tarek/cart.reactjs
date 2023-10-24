import React, { useEffect, useState } from "react";
import style from "./Category.module.css";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Category() {
  let [data, setdata] = useState([]);
  let [isloading, setisloading] = useState(false);
  async function getcategory() {
    setisloading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );

    console.log(data.data);
    setdata(data.data);
    setisloading(false);
  }
  useEffect(() => {
    getcategory();
  }, []);
  return (
    <>
      <Helmet>
        <title>Category</title>
      </Helmet>
      {isloading ? (
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
        <div className="row  mt-5 py-4">
          {data.map((Category) => (
            <div key={Category._id} className="col-md-6 col-lg-4 mb-4 p-2">
              <div className="card product products">
                <img
                  height={300}
                  className="w-100 border-bottom object-fit-cover"
                  src={Category.image}
                  alt={Category.name}
                />
                <div className="card-body">
                  <p className="card-text fw-bolder text-main fs-4">
                    {Category.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
