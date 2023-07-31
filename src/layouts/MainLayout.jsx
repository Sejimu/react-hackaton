import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexFlow: "column",
          backgroundColor: "#D8D9DA",
          justifyContent: "space-between",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
