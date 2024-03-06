import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const isLogin = localStorage.getItem("id");

  return isLogin ? <Navigate to="/business" /> : <Outlet />;
};

export default PublicRoute;
