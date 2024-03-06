import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/img/login_test.PNG";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import { Login as LoginRequest } from "../api/mypage/User";
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  width: 90%;
  min-height: 100vh;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 200px;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
`;
const SignupBox = styled.div`
  width: 100%;
  height: 100px;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: blue;
  margin-left: 20px;
`;

const LogoImg = styled.img`
  width: 100%;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailValue = (e) => {
    const curEmailValue = e.target.value;
    setEmail(curEmailValue);
  };
  const handlePwdValue = (e) => {
    const curPwdValue = e.target.value;
    setPassword(curPwdValue);
  };
  const LoginAccess = async () => {
    const requestData = {
      email: email,
      password: password,
    };
    try {
      // API 요청
      const response = await LoginRequest(requestData);

      // API 응답 처리
      if (response.status === 200 && response.data.data != null) {
        localStorage.setItem("id", response.data.data.id);
        if (response.data.data.myData === true) {
          localStorage.setItem("myData", 1);
        } else {
          localStorage.setItem("myData", 0);
        }

        const message = [
          ["안녕하세요!\n저는 드림이 입니다^^\n무엇을 도와드릴까요?", "bot"],
        ];
        localStorage.setItem("message", [JSON.stringify(message)]);
        navigate("/business");
      } else {
        window.alert("아이디 혹은 비밀번호가 틀립니다.");
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };
  return (
    <LoginContainer className="LoginContainer">
      <LoginBox className="LoginBox">
        <HeaderBox className="HeaderBox">
          <LogoImg src={Logo} />
        </HeaderBox>
        <MainBox className="MainBox">
          <Input
            width="100%"
            height="50px"
            color="gray"
            placeholder="이메일 입력"
            borderradius="none"
            border="none"
            borderBottom="1px solid gray"
            background="--bgColor"
            fontFamily="surround"
            onChange={handleEmailValue}
          />
          <Input
            width="100%"
            height="50px"
            placeholder="비밀번호 입력"
            borderradius="none"
            border="none"
            borderBottom="1px solid gray"
            background="--bgColor"
            type="password"
            fontFamily="surround"
            onChange={handlePwdValue}
          />
          <Button
            onClick={LoginAccess}
            width="100%"
            margin="10%"
            fontSize="15px"
            fontFamily="surround"
          >
            로그인
          </Button>
          <SignupBox>
            아직 회원이 아니신가요?
            <StyledLink href="/signup">회원가입</StyledLink>
          </SignupBox>
        </MainBox>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
