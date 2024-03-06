import React from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "../views/Intro";
import Business from "../views/Business";
import MyPage from "../views/MyPage";
import ChatBot from "../views/ChatBot";
import RecommendPage from "../views/RecommendPage";
import Login from "../views/Login";
import Signup from "../views/Signup";
import Info from "../views/Info";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MyFund from "../views/MyFund";
import Modal from "../components/card/Card";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route Component={PrivateRoute}>
          <Route path="/business" element={<Business />}>
            <Route path="/business/detail" element={<Modal />} />
          </Route>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chatbot" element={<ChatBot />}>
            <Route path="/chatbot/detail" element={<Modal />} />
          </Route>
          <Route path="/recommend" element={<RecommendPage />}>
            <Route path="/recommend/detail" element={<Modal />} />
          </Route>
          <Route path="/myfund" element={<MyFund />} />
        </Route>
        <Route Component={PublicRoute}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/info" element={<Info />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
