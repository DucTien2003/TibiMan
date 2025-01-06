// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";

import "swiper/css";
import "@/assets/styles/fonts.scss";
import "@/assets/styles/tailwind.css";
import App from "./App.jsx";
import GlobalStyles from "@/assets/styles/GlobalStyles";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GlobalStyles>
    <App></App>
  </GlobalStyles>
  // </StrictMode>,
);
