import React from "react";
import ReactDOM from "react-dom/client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
let queryclient = new QueryClient();
root.render(
  <QueryClientProvider client={queryclient}>
    <App />
  </QueryClientProvider>
);
