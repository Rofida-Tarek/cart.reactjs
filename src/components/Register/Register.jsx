import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  function getname() {}
  let [error, seterror] = useState("");
  let [isloading, setisloading] = useState(false);

  let navigate = useNavigate();
  async function submitregister(value) {
    setisloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value)
      .catch((error) => {
        seterror(error.response.data.message);
        setisloading(false);
      });

    if (data.message === "success") {
      navigate("/login");
      setisloading(false);
    }
  }
  let validatescheme = yup.object({
    name: yup
      .string()
      .min(3, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
    email: yup.string().email("Invalid email").required("Required."),
    password: yup
      .string()
      .required("Required.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(
        /[a-zA-Z0-9]/,
        "Password can contain Latin letters and numbers."
      ),
    rePassword: yup
      .string()
      .required("Password is required")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
    phone: yup
      .string()
      .required("phone number is required")
      .matches(/^01[0125][0-9]{8}$/),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: submitregister,
    validationSchema: validatescheme,
  });
  return (
    <>
      {error ? <div className="alert alert-danger mt-4">{error}</div> : ""}
      <h2 className="mt-4 p-2 fw-bolder">Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="my-3">
          <label htmlFor="name">Name :</label>

          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className=" alert alert-danger p-2 mt-2">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}
        </div>
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
        <div className="my-3">
          <label htmlFor="repass">Re-password :</label>
          <input
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type="password"
            placeholder=""
            name="rePassword"
            id="repass"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className=" alert alert-danger p-2 mt-2">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="my-3">
          <label htmlFor="phone">Phone :</label>
          <input
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type=" tel"
            placeholder=""
            name="phone"
            id="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className=" alert alert-danger p-2 mt-2">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}
        </div>
        {isloading ? (
          <button className="btn px-4 py-2 bg-main text-white " type="btn">
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        ) : (
          <>
            {!(formik.isValid && formik.dirty) ? (
              <button className="btn btn-outline mt-1" type="submit" disabled>
                Register Now
              </button>
            ) : (
              <button className="btn bg-main text-white p-2 mt-1" type="submit">
                Register Now
              </button>
            )}
          </>
        )}
      </form>
    </>
  );
}
