import React, { useEffect, useState } from "react";
import style from "./AllOrder.module.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
export default function AllOrder() {
  let [UserOrder, setUserOrder] = useState(null);

  let [ordernum, setordernum] = useState(0);
  useEffect(() => {
    let res = jwtDecode(localStorage.getItem("userToken"));
    getUserOrder(res.id);
  }, []);
  async function getUserOrder(id) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      console.log(data?.length);
      setordernum(data?.length);
      localStorage.setItem("ordernumber", data?.length);
      setUserOrder(data);
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   getUserOrder();
  // }, [ordernum]);
  if (UserOrder === null) {
    return (
      <div className="loading">
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  } else {
  }

  return (
    <>
      <div className="container mt-5 p-4">
        <div className="row justify-content-between ">
          {UserOrder?.map((order, id) => (
            <div key={id} className="col-md-5 bg-main-light mb-4 shadow p-3 ">
              <div className="container">
                <div className="row ">
                  {order?.cartItems?.map((item, index) => (
                    <div key={index} className="col-md-4 p-3">
                      <img
                        className="w-100"
                        src={item?.product.imageCover}
                        alt=""
                      />
                      <h6>
                        {item?.product.title.split(" ").slice(0, 2).join(" ")}
                      </h6>
                      <div>
                        <h6 className="text-main fw-bold">
                          Count: {item.count}
                        </h6>
                        <h6 className="text-main fw-bold">
                          price: {item.price}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="allorder">
                <hr />
                <h3 className="text-main mb-2 text-center">
                  {" "}
                  Your Order Details
                </h3>
                {/* <h5>Order details: {order?.shippingAddress.details}</h5> */}
                {/* <h5>For: {order?.shippingAddress.city}</h5> */}

                <h5>
                  Total Order Price:{" "}
                  <span className="text-main fw-bold">
                    {order?.totalOrderPrice}
                  </span>
                </h5>
                {/* <h5>
                  Order send to user phone: {order?.shippingAddress.phone}
                </h5> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
