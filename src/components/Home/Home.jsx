import React from "react";
import style from "./Home.module.css";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import SearchProducts from "../SearchProducts/SearchProducts";
import Categoryslider from "../Categoryslider/Categoryslider";
import Mainslider from "../Mainslider/Mainslider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Mainslider />
      <Categoryslider />
      {/* <SearchProducts /> */}
      <FeatureProducts />
    </>
  );
}
