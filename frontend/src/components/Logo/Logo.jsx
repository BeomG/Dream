import React from "react";
import logo from "../../assets/img/logo.png";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
`;

function Logo() {
  const navigate = useNavigate();
  const moveMain = () => {
    navigate("/business");
  };
  return (
    <StyledLogo onClick={moveMain}>
      <img src={logo} alt="" />
      <h2>함께, 드림</h2>
    </StyledLogo>
  );
}

export default Logo;
