import React from "react";
import styled from "styled-components";
import MyData from "../components/mydata/MyData";
import Header from "../components/header/Header";

const Content = styled.div`
  margin-top: 80px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function MyPage() {
  return (
    <>
      <Header />
      <Content>
        <MyData />
      </Content>
    </>
  );
}

export default MyPage;
