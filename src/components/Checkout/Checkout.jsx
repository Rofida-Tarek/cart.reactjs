import React, { useContext } from "react";
import style from "./Checkout.module.css";

import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const { cartid, setnumOfCartItems, setprice, setproduct } =
    useContext(CartContext);
  console.log(cartid);
  async function confirmCashPayment() {
    let cityvalue = document.querySelector("#city").value;
    let phonevalue = document.querySelector("#phone").value;
    let datailsvalue = document.querySelector("#details").value;
    let shippingAddress = {
      shippingAddress: {
        details: datailsvalue,
        phone: phonevalue,
        city: cityvalue,
      },
    };
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartid}`,
        { shippingAddress: shippingAddress },
        { headers: { token: localStorage.getItem("userToken") } }
      );
      toast.success("Order successfully initialized");
      console.log(data?.data);
      setnumOfCartItems(0);
      setprice(0);
      setproduct([]);
    } catch (error) {
      console.log(error);
    }
  }
  async function confirmOnlinePayment() {
    let cityvalue = document.querySelector("#city").value;
    let phonevalue = document.querySelector("#phone").value;
    let datailsvalue = document.querySelector("#details").value;
    let shippingAddress = {
      shippingAddress: {
        details: datailsvalue,
        phone: phonevalue,
        city: cityvalue,
      },
    };
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}`,
        shippingAddress,
        {
          headers: { token: localStorage.getItem("userToken") },
          params: { url: "http://localhost:3000" },
        }
      );
      window.open(data.session.url, "_blank");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Check-out</title>
      </Helmet>
      <div className="container bg-main-light p-5 mt-5 shadow p-5">
        <form>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control mb-2"
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control mb-2"
          />
          <label htmlFor="details">Details:</label>
          <textarea
            type="text"
            id="details"
            name="details"
            className="form-control mb-2"
          />
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              onClick={confirmCashPayment}
              type="button"
              className="btn btn-outline-success mt-1"
            >
              Confirm Cash Payment
            </button>
            <button
              onClick={confirmOnlinePayment}
              className="btn btn-outline-success mt-1"
              type="button"
            >
              Confirm Online Payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
