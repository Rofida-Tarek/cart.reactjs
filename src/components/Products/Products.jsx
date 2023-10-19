import axios from "axios";
import style from "./Products.module.css";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { WishContext } from "../../Context/WishlistContext";

export default function Products() {
  let { AddproducttoWishlist } = useContext(WishContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, data } = useQuery("Allproducts", getAllproducts);

  function getAllproducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  function handleSearchChange(e) {
    const query = e.target.value;
    setSearchQuery(query);
  }
  function filterProducts() {
    if (searchQuery === "") {
      return data?.data?.data;
    } else {
      return data?.data?.data.filter((product) =>
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
  let [loading, setloading] = useState(false);
  let { addproductstocart } = useContext(CartContext);
  async function addtocart(id) {
    setloading(true);
    let data = await addproductstocart(id);

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
  async function addtowishlist(id) {
    let data = await AddproducttoWishlist(id);
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
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <form action="" className="mt-5 pt-2">
        <input
          className="my-5 form-control w-75 m-auto"
          type="search"
          placeholder="search...."
          onChange={handleSearchChange}
        />
      </form>
      {/* {loading ? (
        <div className="loading">
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : ( */}
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
          <div className="row d-flex justify-content-center mt-4 pt-2 ">
            {filterProducts().map((product) => (
              <div key={product._id} className="col-md-6 col-lg-3 mb-3 ">
                <div className="product products p-3 rounded">
                  <Link to={`/Productsdetails/${product._id}`}>
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
                      className="btn bg-main text-white w-75 mt-2 btn-sm d-flex justify-content-evenly align-items-center"
                    >
                      <i class="fa-solid fa-cart-arrow-down"></i>
                      Add to Cart
                    </button>
                    <i
                      onClick={() => addtowishlist(product._id)}
                      className=" fa-solid fa-heart h3"
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
      {/* )} */}
    </>
  );
}
