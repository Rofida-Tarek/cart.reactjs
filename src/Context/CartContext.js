import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let [products, setproduct] = useState(null);
  let [price, setprice] = useState(0);
  let [cartid, setcartid] = useState(0);
  let [numOfCartItems, setnumOfCartItems] = useState(0);
  async function addproductstocart(id) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      getcartuser();
      // setprice(data.data.totalCartPrice);
      // setnumOfCartItems(data.numOfCartItems);
      // console.log(data);
      return data;
    } catch (error) {}
  }
  async function getcartuser() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setnumOfCartItems(data.numOfCartItems);
      setprice(data.data.totalCartPrice);
      setproduct(data.data.products);
      setcartid(data.data._id);
      // console.log(data.data._id);
      console.log(data.data.products);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getcartuser();
  }, []);
  async function deletecartitem(id) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setnumOfCartItems(data.numOfCartItems);
      setprice(data.data.totalCartPrice);
      setproduct(data.data.products);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function updateproductqunt(id, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: count },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log(data);
      setnumOfCartItems(data.numOfCartItems);
      setprice(data.data.totalCartPrice);
      setproduct(data.data.products);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function clearusercart() {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,

        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log(data);
      setnumOfCartItems(0);
      setprice(0);
      setproduct([]);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  // function onlinepayment(cartid, shippingAddress, url) {
  //   return axios
  //     .post(
  //       `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=${url}`,
  //       { shippingAddress: shippingAddress },
  //       { headers: { token: localStorage.getItem("userToken") } }
  //     )
  //     .then((response) => response)
  //     .catch((error) => error);
  // }
  return (
    <CartContext.Provider
      value={{
        getcartuser,
        addproductstocart,
        products,
        price,
        cartid,
        numOfCartItems,
        deletecartitem,
        updateproductqunt,
        clearusercart,
        setproduct,
        setnumOfCartItems,
        setprice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
