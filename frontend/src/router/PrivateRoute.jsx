import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isLogin = localStorage.getItem("id");
  if (isLogin === null) {
    window.alert("로그인이 필요합니다");
  }
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
