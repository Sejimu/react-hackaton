import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import FootNavbar from "../components/FootNavbar";

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
        <FootNavbar />
      </div>
    </>
  );
}

export default MainLayout;
