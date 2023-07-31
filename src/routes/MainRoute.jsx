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
import UserProtectedRoute from "./UserProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import Favorites from "../pages/Favorites";

function MainRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/add" element={<AddProducts />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Route>
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route element={<UserProtectedRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/fav" element={<Favorites />} />
        </Route>
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default MainRoute;
