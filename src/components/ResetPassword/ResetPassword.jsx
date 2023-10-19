import React from "react";
import style from "./ResetPassword.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function ResetPassword() {
  let navigate = useNavigate();
  let validatescheme = yup.object({
    email: yup.string().email("Invalid email").required("Email is Required."),
    newPassword: yup
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
      newPassword: "",
    },
    validationSchema: validatescheme,
    onSubmit: resetPassword,
  });
  async function resetPassword(value) {
    console.log(value);
    let { data } = await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value)
      .catch((err) => console.log(err));
    console.log(data);
    if (data.token) {
      toast.success("The password has been changed successfully", {
        icon: "👏",
        duration: 5000,
      });
      navigate("/login");
    }
  }
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="mt-5 p-5 shadow">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className=" alert alert-danger p-2 mt-2">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="newPassword">New Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            type="password"
            name="newPassword"
            id="newPassword"
            className="form-control"
            placeholder="newPassword"
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className=" alert alert-danger p-2 mt-2">
              {formik.errors.newPassword}
            </div>
          ) : (
            ""
          )}
          <button
            disabled={!(formik.dirty && formik.isValid)}
            type="submit"
            className="btn bg-main text-white mt-2"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
}
