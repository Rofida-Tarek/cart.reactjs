import axios from "axios";
import { Toast } from "bootstrap";
import { useEffect } from "react";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let WishContext = createContext();

export default function WishContextProvider(props) {
  let [count, setcount] = useState(0);
  let [price, setprice] = useState(0);
  let [name, setname] = useState("");

  let [product, setproduct] = useState([]);
  async function AddproducttoWishlist(id) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: id },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      getwishlistuser();
      toast.success(data.message, {
        duration: 4000,
        style: {
          background: "green",
          color: "white",
        },
      });

      setcount(data?.data.length);
      return data;
    } catch (error) {
      console.log(error);

      toast.error("Error");
    }
  }

  async function getwishlistuser() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      setcount(data.count);
      setproduct(data.data.map((item) => item));
      setprice(data.data.map((item) => item.price));
      setname(data.data.map((item) => item.category.name));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getwishlistuser();
  }, []);
  async function deletproductfromwishlist(id) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      getwishlistuser();
      if (data.status === "success") {
        toast.success(data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  }
  return (
    <WishContext.Provider
      value={{
        getwishlistuser,
        deletproductfromwishlist,
        AddproducttoWishlist,
        count,
        price,
        name,
        product,
      }}
    >
      {props.children}
    </WishContext.Provider>
  );
}
