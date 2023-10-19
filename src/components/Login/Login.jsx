import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { userContext } from "../../Context/UserContext";

export default function Login() {
  let { setusertoken, setusername } = useContext(userContext);
  let [error, seterror] = useState("");
  let [isloading, setisloading] = useState(false);
  let navigate = useNavigate();
  async function submitlogin(value) {
    setisloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, value)
      .catch((error) => {
        seterror(error.response.data.message);
        setisloading(false);
      });
    console.log(data.user.name);
    setusername(data.user.name);
    localStorage.setItem("userName", data.user.name);
    if (data.message === "success") {
      setisloading(false);
      localStorage.setItem("userToken", data.token);
      setusertoken(data.token);

      navigate("/");
    }
  }
  let validatescheme = yup.object({
    email: yup.string().email("Invalid email").required("Email is Required."),
    password: yup
      .string()
      .required("password is Required.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(
        /[a-zA-Z0-9]/,
        "Password can contain Latin letters and numbers."
      ),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitlogin,
    validationSchema: validatescheme,
  });
  return (
    <>
      {error ? <div className="alert alert-danger mt-4">{error}</div> : ""}
      <h2 className="mt-3 p-2 fw-bolder">Login Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="my-3">
          <label htmlFor="email">Email :</label>
          <input
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type="email"
            placeholder=""
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className=" alert alert-danger p-2 mt-2">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="my-3">
          <label htmlFor="pass">Password :</label>
          <input
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type="password"
            placeholder=""
            name="password"
            id="pass"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className=" alert alert-danger p-2 mt-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex justify-content-between">
          <Link className="link" to={"/ForgetPassword"}>
            forget your password ?
          </Link>
          {isloading ? (
            <button className="btn px-4 py-2 bg-main text-white " type="btn">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <>
              {!(formik.isValid && formik.dirty) ? (
                <button className="btn btn-outline" type="submit" disabled>
                  Login Now
                </button>
              ) : (
                <button className="btn bg-main text-white p-2" type="submit">
                  Login Now
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </>
  );
}
