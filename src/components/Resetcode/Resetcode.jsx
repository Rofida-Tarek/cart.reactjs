import React, { useState } from "react";
import style from "./Resetcode.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Resetcode() {
  let navigate = useNavigate();
  let [error, seterror] = useState("");
  let validationSchema = yup.object({
    resetCode: yup
      .string()
      .required("reset code is required")
      .matches(/[0-9]$/, "must be only numbers and contain 6 digits"),
  });
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: sendResetCode,
  });
  async function sendResetCode(values) {
    console.log(values);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .catch((error) => seterror(error.response.data.message));

    console.log(data);
    if (data.status === "Success") {
      navigate("/ResetPassword");
    }
  }
  return (
    <>
      <Helmet>
        <title>Resetode</title>
      </Helmet>
      <div className="mt-5 p-5 shadow">
        {error ? (
          <div className=" alert alert-danger p-2 mt-2">{error}</div>
        ) : (
          ""
        )}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="reset" className="h3 fw-bold mb-4">
            please enter your verification code
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            type="text"
            name="resetCode"
            id="reset"
            className="form-control"
          />
          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div className=" alert alert-danger p-2 mt-2">
              {formik.errors.resetCode}
            </div>
          ) : (
            ""
          )}
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white mt-2"
          >
            Verfiy
          </button>
        </form>
      </div>
    </>
  );
}
