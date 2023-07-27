import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import EditPage from "../pages/EditPage";
import AddProducts from "../pages/AddProducts";
import AuthPage from "../pages/AuthPage";
import DetailsPage from "../pages/DetailsPage";
import CartPage from "../pages/CartPage";

function MainRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddProducts />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default MainRoute;
