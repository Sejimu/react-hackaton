import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexFlow: "column",
          justifyContent: "space-between",
        }}
      >
        <Outlet />
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default MainLayout;
