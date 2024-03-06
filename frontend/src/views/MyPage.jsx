import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { GetUser } from "../api/mypage/UserInformation";
import ChangePwd from "../components/mydata/ChangePwd";
import ChangeRegion from "../components/mydata/ChangeRegion";
import jsonData from "../assets/data/region.json";
import Header from "../components/header/Header";
import { Exit } from "../api/mypage/User";
import { useNavigate } from "react-router";

//정보박스
const InfoBox = styled.div`
  width: 90%;
  margin-top: 80px;
  margin-bottom: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 3px 3px 3px 3px lightgray;
`;

//박스안의 맨위 문구박스
const TextBox = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;

const InfoTextBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  font-size: 1.8vh;
  height: 24.5px;
`;

function MyPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(0);
  const [info, setInfo] = useState({
    name: null,
    email: null,
    password: null,
    regionKey: null,
    age: null,
  });

  const userInfo = async () => {
    const res = await GetUser(localStorage.getItem("id"));
    const secondRegion = jsonData.find(
      (item) => item.region_key === res.data.regionKey
    );
    const firstRegion = jsonData.find(
      (item) => item.region_key === secondRegion.parent_key
    );
    setInfo({
      ...res.data,
      regionKey: `${firstRegion.name}  ${secondRegion.name}`,
    });
  };

  const changeMode = (props) => {
    setMode(props);
  };

  const deleteUser = async () => {
    await Exit();
    localStorage.clear();
    window.alert("회원탈퇴 되었습니다.");
    navigate("/");
  };

  useEffect(() => {
    userInfo();
  }, []);
  return (
    <>
      <Header />
      <InfoBox>
        <TextBox>
          <h3>{info.name}님의 정보</h3>
          <Button onClick={deleteUser} sx={{ padding: 0, color: "red" }}>
            회원 탈퇴
          </Button>
        </TextBox>

        <InfoTextBox>이메일 : {info.email}</InfoTextBox>

        <InfoTextBox>
          거주지 : {info.regionKey}
          <Button onClick={() => changeMode(2)} sx={{ padding: 0 }}>
            거주지 변경
          </Button>
        </InfoTextBox>
        <InfoTextBox>
          {"\u00A0\u00A0\u00A0"}나이 : 만 {info.age}세
          <Button onClick={() => changeMode(1)} sx={{ padding: 0 }}>
            비밀번호 변경
          </Button>
        </InfoTextBox>
      </InfoBox>
      {mode === 0 && null}
      {mode === 1 && <ChangePwd curPwd={info.password} />}
      {mode === 2 && <ChangeRegion />}
    </>
  );
}

export default MyPage;
