import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import Loading from "../loading/Loading";
import { BarChart } from "@mui/x-charts/BarChart";
import { ReactComponent as RefreshIcon } from "../../assets/img/Refresh.svg";
import { ReactComponent as ThreeDotIcon } from "../../assets/img/ThreeDot.svg";
import { ReactComponent as MailIcon } from "../../assets/img/MailIcon.svg";
import { Button } from "@mui/material";
import { MatchWelfare, RefreshUser } from "../../api/mydata/MydataAccount";

//마이데이터 버튼박스
const ButtonBox = styled.div`
  width: 90%;
  height: 200px;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  gap: 20px;
  box-shadow: 3px 3px 3px 3px lightgray;
`;

//지원금현황 문구박스
const TextBox = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;

//차트박스
const ChartBox = styled.div`
  width: 90%;
  margin-bottom: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 3px 3px 3px 3px lightgray;
`;

//지원금현황 리프레시버튼
const Refresh = styled(RefreshIcon)`
  width: 30px;
  height: 30px;
`;

//알림 문구박스
const AlertLine = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;

//알림 점3개아이콘
const ThreeDot = styled(ThreeDotIcon)`
  width: 30px;
  height: 30px;
`;

//알림메세지 한개 박스
const AlertBox = styled.div`
  width: 90%;
  height: auto;
  background-color: white;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  box-shadow: 3px 3px 3px 3px lightgray;
`;

//기관,입금 전체박스
const AlertTextBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//메일아이콘 박스
const AlertMail = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
`;

//메일아이콘 크기
const Mail = styled(MailIcon)`
  width: 30px;
`;

//기관명 관리
const AlertText = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: gray;
`;
//현재잔액 관리
const CurrentText = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  font-size: 1.5vh;
`;

//입금액 관리
const MoneyText = styled.p`
  color: #006ffd;
  margin-right: 10px;
`;

//출금액 관리
const MinusText = styled.p`
  color: gray;
  margin-right: 10px;
`;

//현재잔액 관리
const CurrentMoney = styled.p`
  color: black;
  margin-right: 10px;
`;

const WelfareMoney = styled.p`
  color: #f66262;
  margin-right: 10px;
`;

function MyData() {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState([]);
  const [myData, setMyData] = useState(localStorage.getItem("myData"));

  const month = new Date().getMonth();
  const monthData = [`${month - 1}월`, `${month}월`, `${month + 1}월`];
  const [MoneyData, setMoneyData] = useState([0, 0, 0]);

  const refreshHandler = async () => {
    setLoading(true);
    await RefreshUser();
    fetchData();
    localStorage.setItem("myData", 1);
    setTimeout(() => {
      setLoading(false);
      setMyData(localStorage.getItem("myData"));
    }, 3000);
  };

  const alertHandler = () => {
    setShowAlert(!showAlert);
  };

  const fetchData = async () => {
    if (myData === "1") {
      const res = await MatchWelfare();
      setMessage(res.data.list.reverse());
      for (let i = 0; i < res.data.list.length; i++) {
        if (res.data.list[i].welfare != null)
          if (res.data.list[i].dateTime[5] === "0") {
            setMoneyData((prev) => {
              const newMoney = [...prev];
              newMoney[
                monthData.indexOf(`${res.data.list[i].dateTime.slice(6, 7)}월`)
              ] += res.data.list[i].tranAmt / 10000;
              return newMoney;
            });
          } else {
            setMoneyData((prev) => {
              const newMoney = [...prev];
              newMoney[
                monthData.indexOf(`${res.data.list[i].dateTime.slice(5, 7)}월`)
              ] += res.data.list[i].tranAmt / 10000;
              return newMoney;
            });
          }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [myData]);

  return (
    <>
      {!showAlert &&
        (loading ? (
          <ButtonBox>
            <Loading />
          </ButtonBox>
        ) : myData === "1" ? (
          <ChartBox>
            <TextBox>
              <p>월별 지원금 현황</p>
              {/* <Button onClick={refreshHandler}>
                <Refresh />
              </Button> */}
            </TextBox>

            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: monthData,
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: MoneyData,
                },
              ]}
              width={350}
              height={300}
            />
          </ChartBox>
        ) : (
          <ButtonBox>
            <Button variant="contained" size="large" onClick={refreshHandler}>
              마이데이터 연결하기
            </Button>
            <span> *마이데이터를 연결하면 자동으로</span>
            <span>자신이 받고 있는 지원 사업을</span>
            <span>확인 할 수 있습니다.</span>
          </ButtonBox>
        ))}
      <AlertLine>
        <h3>입금 내역</h3>
        <Button onClick={alertHandler}>
          <ThreeDot />
        </Button>
      </AlertLine>
      {loading ? (
        <ButtonBox>
          <Loading />
        </ButtonBox>
      ) : (
        message.length > 0 &&
        message.map((alert) => (
          <AlertBox key={alert.idx}>
            <AlertMail>
              <Mail />
            </AlertMail>

            <AlertTextBox>
              <AlertText>
                {alert.welfare !== null ? (
                  <WelfareMoney>
                    {alert.welfare.name.slice(0, 8)}..
                  </WelfareMoney>
                ) : (
                  <>{alert.tranDesc}</>
                )}

                {alert.type.desc === "입금" ? (
                  <MoneyText>
                    {alert.tranAmt.toLocaleString("en-US")}원
                  </MoneyText>
                ) : (
                  <MinusText>
                    -{alert.tranAmt.toLocaleString("en-US")}원
                  </MinusText>
                )}
              </AlertText>
              <CurrentText>
                {alert.dateTime.slice(0, 10)}
                <CurrentMoney>
                  {alert.afterAmt.toLocaleString("en-US")}원
                </CurrentMoney>
              </CurrentText>
            </AlertTextBox>
          </AlertBox>
        ))
      )}
    </>
  );
}

export default MyData;
