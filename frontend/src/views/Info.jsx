import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as Logo } from "../assets/img/Modified_logo.svg";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import Dropdown from "../components/dropdown/Dropdown";
import { Signup } from "../api/mypage/User";
import { useLocation, useNavigate } from "react-router-dom";
import jsonData from "../assets/data/region.json";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  width: 80%;
  min-height: 100vh;
`;

const HeaderBox = styled.div`
  width: 90%;
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
`;
const LineBox = styled.div`
  width: 90%;
  height: 1px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 90%;
`;

const Line = styled.div`
  width: 90%;
  height: 1px;
  background-color: gray;
`;
const LineStatus = styled(motion.div)`
  width: 50%;
  height: 2px;
  background-color: black;
  position: absolute;
  left: 0;
`;
const FooterBox = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;
const BirthBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RegionBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const FirstKeyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const SecondKeyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Info = () => {
  const [regionKey, setRegionKey] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, pwd } = location.state || {};
  const movePage = async (isMydata) => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth =
      now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
    let todayDate = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
    let hours = now.getHours() > 9 ? now.getHours() : "0" + now.getHours();
    let minutes =
      now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes();
    let seconds =
      now.getSeconds() > 9 ? now.getSeconds() : "0" + now.getSeconds();
    let createdDate =
      todayYear +
      "-" +
      todayMonth +
      "-" +
      todayDate +
      "T" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    const currentDate = new Date();
    const isEnded = selectedTimestamp < currentDate;
    const endDate = selectedDate + "T23:59:59";
    const requestData = {
      name: name,
      email: email,
      password: pwd,
      regionKey: Number(regionKey),
      residenceInfo: Number(residenceInfo.concat(residenceBack)),
      endDate: endDate,
      isEnded: isEnded,
      myData: isMydata ? 1 : 0,
      createdDate: createdDate,
    };
    try {
      if (regionKey === 8 || regionKey > 17) {
        // API 요청
        const response = await Signup(requestData);

        // API 응답 처리
        if (response.status === 200) {
          localStorage.setItem("id", response.data.data.id);
          localStorage.setItem("myData", requestData.myData);
          const message = [
            ["안녕하세요!\n저는 드림이 입니다^^\n무엇을 도와드릴까요?", "bot"],
          ];
          localStorage.setItem("message", [JSON.stringify(message)]);
          navigate("/business");
        } else {
          console.error("회원가입 실패:", response.data);
        }
      } else {
        alert("거주지를 정확히 입력해주세요");
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };
  const [residenceInfo, setResidenceInfo] = useState("");
  const [residenceBack, setResidenceBack] = useState("");
  const handleResidenceChange = (e) => {
    const residenceValue = e.target.value;
    if (residenceValue.length <= 6) {
      setResidenceInfo(residenceValue);
    }
  };
  const handleResidenceBackChange = (e) => {
    const residenceValue = e.target.value;
    if (residenceValue.length <= 1 && residenceValue <= 4) {
      setResidenceBack(residenceValue);
    }
  };

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [subRegions, setSubRegions] = useState([]);
  const [selectedRegionText, setSelectedRegionText] = useState("시/도 ▼");
  const [selectedSubRegionText, setSelectedSubRegionText] =
    useState("시/군/구 ▼");
  const handleRegionSelect = (region) => {
    console.log(region);
    setSelectedRegion(region);
    setSelectedRegionText(region);
    const curRegion = jsonData.find((item) => item.name === region);
    setRegionKey(curRegion.region_key);
    const selectedRegionData = jsonData.filter(
      (item) => item.parent_key === curRegion.region_key
    );
    if (selectedRegionData) {
      const subRegionData = selectedRegionData.map((item) => item.name);
      setSubRegions(subRegionData);
    } else {
      setSubRegions([]);
    }
    setIsFirstDropdownView(false);
    setIsSecondDropdownView(!isSecondDropdownView);
    setSelectedSubRegionText("시/군/구 ▼");
  };

  const handleSubRegionSelect = (region) => {
    console.log(region);
    setSelectedSubRegionText(region);
    const curRegion = jsonData.find((item) => item.name === region);
    setRegionKey(curRegion.region_key);
    setIsSecondDropdownView(false);
  };

  useEffect(() => {
    const filteredNames = jsonData.slice(1, 18).map((item) => item.name);
    setRegions(filteredNames);
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFirstDropdownView, setIsFirstDropdownView] = useState(false);
  const [isSecondDropdownView, setIsSecondDropdownView] = useState(false);
  const [selectedTimestamp, setSelectedTimeStamp] = useState();

  // 날짜가 변경될 때 호출되는 함수
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTimeStamp(new Date(e.target.value).getTime());
  };

  const handleClickFirstDropdown = () => {
    setIsFirstDropdownView(!isFirstDropdownView);
  };

  const handleClickSecondDropdown = () => {
    setIsSecondDropdownView(!isSecondDropdownView);
  };
  return (
    <InfoContainer>
      <HeaderBox>
        <Logo />
        <h1>&nbsp;함께, 드림</h1>
      </HeaderBox>
      <LineBox>
        <Line />
        <LineStatus
          initial={{ left: 0 }}
          animate={{ left: "50%" }}
          transition={{ duration: 0.5 }}
        />
      </LineBox>
      <MainBox className="MainBox">
        <h3 style={{ marginTop: "10px", marginBottom: "10px" }}>
          맞춤 정보를 제공하기 위해
          <br /> 입력해주세요 :)
        </h3>
        <p style={{ fontSize: "18px", marginBottom: 0 }}>생년월일</p>
        <BirthBox>
          <Input
            type="number"
            width="50%"
            height="50px"
            color="gray"
            placeholder="생년월일"
            borderradius="none"
            border="none"
            borderBottom="1px solid gray"
            background="none"
            fontFamily="surround"
            value={residenceInfo}
            onChange={handleResidenceChange}
          />
          -
          <Input
            type="number"
            width="10%"
            height="50px"
            color="gray"
            border-radius="none"
            border="none"
            borderBottom="1px solid gray"
            background="--bgColor"
            fontFamily="surround"
            value={residenceBack}
            onChange={handleResidenceBackChange}
          />
          ●●●●●●
        </BirthBox>
        <p style={{ fontSize: "18px", marginBottom: 0, marginTop: "18px" }}>
          보호종료일
        </p>
        <DateBox>
          <Input
            type="date"
            width="100%"
            height="50px"
            border-radius="none"
            border="none"
            borderBottom="1px solid gray"
            background="--bgColor"
            fontSize="20px"
            fontFamily="surround"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </DateBox>
        <p style={{ fontSize: "18px" }}>거주지</p>
        <RegionBox>
          <FirstKeyBox>
            <Button
              text={selectedRegionText}
              onClick={handleClickFirstDropdown}
              background="none"
              color="black"
              width="100%"
              fontFamily="surround"
              fontSize="18px"
            />
            {isFirstDropdownView && (
              <Dropdown items={regions} onItemClick={handleRegionSelect} />
            )}
          </FirstKeyBox>
          <SecondKeyBox>
            <Button
              text={selectedSubRegionText}
              onClick={handleClickSecondDropdown}
              background="none"
              color="black"
              width="100%"
              fontFamily="surround"
              fontSize="18px"
            />
            {isSecondDropdownView && (
              <Dropdown
                items={subRegions}
                onItemClick={handleSubRegionSelect}
                height="20px"
              />
            )}
          </SecondKeyBox>
        </RegionBox>
        <FooterBox>
          <Button
            onClick={() => movePage(true)}
            width="45%"
            height="100%"
            fontSize="15px"
            background="success"
            fontFamily="surround"
          >
            마이데이터
          </Button>
          <Button
            onClick={() => movePage(false)}
            width="45%"
            height="100%"
            fontSize="15px"
            fontFamily="surround"
          >
            회원가입
          </Button>
        </FooterBox>
      </MainBox>
    </InfoContainer>
  );
};
export default Info;
