import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import Button from "../components/button/Button";
import { ReactComponent as BackIcon } from "../assets/img/arrow-left-bold.svg";
import { ReactComponent as BotIcon } from "../assets/img/chatbot_char.svg";
import { ReactComponent as SendIcon } from "../assets/img/Send_icon.svg";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import "./ChatBot.css";
import { ChatBotAxios } from "../api/chatbot/Chatbot";
import Card from "../components/card/Card";
import { DetailWelfare } from "../api/welfare/Welfare";

// 챗봇 상단바
const ChatHeader = styled.div`
  width: 100%;
  height: 70px;
  background-color: white;
  box-shadow: 0px 0px 15px 0px grey;
  display: flex;
  align-items: center;
  gap: 20px;
  position: fixed;
  top: 0;
  z-index: 2;
  max-width: 500px;
`;

// 채팅창
const ChatContent = styled.div`
  width: 100%;
  margin-top: 70px;
  margin-bottom: 70px;
  height: calc(100% - 140px);
  display: flex;
  flex-direction: column;
  font-size: 14px;
  white-space: pre-line;
`;

//채팅입력창
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  bottom: 0;
  position: fixed;
  background-color: #f2f5fe;
  max-width: 500px;
`;

const ChatForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 90%;
  height: auto;
  border-radius: 30px;
  font-size: 18px;
  box-shadow: 0px 5px 5px 0px lightgray;
`;

const StyledTextarea = styled(TextareaAutosize)`
  font-size: 18px;
  width: 80%;
  height: 5%;
  margin: 10px;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
  font-family: "surround";
`;

const StyledEllipseIcon = styled.div`
  box-shadow: 0px 0px 5px 0px grey;
  width: 40px;
  height: 40px;
  background-color: whitesmoke;
  border-radius: 50%;
`;

const BlankIcon = styled.div`
  width: 40px;
  height: 40px;
`;

const TodayBox = styled.div`
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 25%;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  border-radius: 20px;
  border: 1px solid lightgray;
`;

// 오늘날짜
function Today() {
  const year = new Date().getFullYear() + "년";
  const month = new Date().getMonth() + 1 + "월";
  const day = new Date().getDate() + "일";

  return (
    <TodayBox>
      {year} {month} {day}
    </TodayBox>
  );
}

function ChatBot() {
  const [message, setMessage] = useState(
    JSON.parse(localStorage.getItem("message"))
  );
  const [myMessage, setMyMessage] = useState("");
  const messageEndRef = useRef(null);

  const navigate = useNavigate();
  const moveBack = () => {
    navigate("/business");
  };

  const resetData = () => {
    localStorage.removeItem("message");
    const message = [
      ["안녕하세요!\n저는 드림이 입니다^^\n무엇을 도와드릴까요?", "bot"],
    ];
    localStorage.setItem("message", [JSON.stringify(message)]);
    window.location.reload();
  };

  const changeMessage = (e) => {
    if (e.target.value.length <= 100) {
      setMyMessage(e.target.value);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const res = await ChatBotAxios(myMessage);
    if (res.data.length === 0) {
      setMessage([
        ...message,
        [myMessage, "notbot"],
        ["결과를 찾을 수 없습니다ㅠㅠ\n정확한 키워드를 입력해주세요.", "bot"],
      ]);
    } else {
      const detail = await DetailWelfare(res.data[0].welfareId);
      setMessage([
        ...message,
        [myMessage, "notbot"],
        [`지원사업을 추천해드릴게요!`, "bot"],
        [`${res.data[0].name}`, "bot"],
        [
          `${detail.data.id}`,
          `${detail.data.id}`,
          `${detail.data.name}`,
          `${detail.data.regionKey}`,
          `${detail.data.start_date}`,
          `${detail.data.end_date}`,
          `${detail.data.support_fund}`,
          `${detail.data.welfare_type}`,
          `${detail.data.img}`,
          "data",
        ],
      ]);
    }

    setMyMessage("");
  };
  const moveRef = () => {
    setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  useEffect(() => {
    localStorage.setItem("message", JSON.stringify(message));
    setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [message]);

  return (
    <>
      <ChatHeader>
        <div></div>
        <Button width="40px" height="40px" background="none" onClick={moveBack}>
          <BackIcon />
        </Button>
        <StyledEllipseIcon>
          <BotIcon />
        </StyledEllipseIcon>
        <h2>드림이</h2>
        <Button
          width="100px"
          color="black"
          background="none"
          onClick={resetData}
          fontSize="14px"
        >
          채팅종료
        </Button>
      </ChatHeader>
      <ChatContent>
        <Today />
        {message.map((data, index) => (
          <div key={index}>
            {data[1] === "bot" ? (
              <>
                <div className="yours messages">
                  <StyledEllipseIcon>
                    <BotIcon />
                  </StyledEllipseIcon>
                  <div className="message last">{data[0]}</div>
                </div>
              </>
            ) : data.length > 2 ? (
              <>
                <div className="yours messages">
                  <BlankIcon></BlankIcon>
                  <Card
                    canDrag={false}
                    key={data[0]}
                    id={data[1]}
                    title={data[2]}
                    regionKey={Number(data[3])}
                    start_date={data[4]}
                    end_date={data[5]}
                    support_fund={data[6]}
                    welfare_type={data[7]}
                    img={data[8]}
                  />
                </div>
              </>
            ) : (
              <div className="mine messages">
                <div className="message last">{data[0]}</div>
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </ChatContent>

      <Footer>
        <ChatForm onSubmit={sendMessage}>
          <StyledTextarea
            required
            value={myMessage}
            onChange={changeMessage}
            onClick={moveRef}
          />
          <Button width="50px" height="50px" background="none" type="submit">
            <SendIcon />
          </Button>
        </ChatForm>
      </Footer>
    </>
  );
}

export default ChatBot;
