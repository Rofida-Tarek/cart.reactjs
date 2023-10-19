import React from "react";
import style from "./ForgetPassword.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function ForgetPassword() {
  let navigate = useNavigate();
  let validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter Valid Email"),
  });
  let formik = useFormik({
    initialValues: {
      email: " ",
    },
    validationSchema,
    onSubmit: sendForgetToApi,
  });
  async function sendForgetToApi(values) {
    // console.log(values);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .catch((error) => console.log(error));
    console.log(data);
    if (data.statusMsg === "success") {
      // document.getElementById("resetpass").classList.remove("d-none");
      // document.getElementById("forgetpass").classList.add("d-none");
      // return <Navigate to={"/login"} />;
      navigate("/Resetcode");
    }
  }

  return (
    <>
      <Helmet>
        <title>Forget password</title>
      </Helmet>
      <div id="forgetpass" className="ForgetPAssword shadow mt-5  p-5">
        <form onSubmit={formik.handleSubmit} className="">
          <label htmlFor="email" className=" fw-bolder h3">
            please enter your Email
          </label>
          <input
            className="form-control"
            placeholder="Email"
            type="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className=" alert alert-danger p-2 mt-2">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
          <>
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-white mt-2 px-3 py-2"
              type="submit"
            >
              Send
            </button>
          </>
        </form>
      </div>
    </>
  );
}
