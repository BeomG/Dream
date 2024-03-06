import React from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";

const StyledButton = styled(motion.button)`
  width: ${(props) =>
    props.type !== "icon" && !props.width ? "200px" : props.width};
  height: ${(props) =>
    props.type !== "icon" && !props.height ? "50px" : props.height};
  background: ${(props) =>
    props.background ? `var(--${props.background})` : `var(--primary)`};
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => props.fontFamily || "surround"};
  color: ${(props) => (props.color ? `var(--${props.color})` : `var(--white)`)};
  font-weight: ${(props) => props.weight};
  border-radius: ${(props) => (props.border ? props.border : "14px")};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  object-fit: ${(props) => (props.type === "icon" ? "fill" : "none")};
  padding: ${(props) => (props.type === "icon" ? "0" : props.padding)};
  margin: ${(props) => props.margin};
  border: none;
  transform: scale(1);
`;
const Button = (props) => {
  const {
    width,
    height,
    background,
    fontSize,
    fontFamily,
    color,
    weight,
    onClick,
    border,
    children,
    text,
    padding,
    margin,
    type,
  } = props;

  return (
    <StyledButton
      width={width}
      height={height}
      background={background}
      fontSize={fontSize}
      fontFamily={fontFamily}
      color={color}
      weight={weight}
      onClick={onClick}
      border={border}
      children={children}
      padding={padding}
      margin={margin}
      type={type}
    >
      {text}
      {children}
    </StyledButton>
  );
};

export default Button;

// 버튼 종류 : 1. 일반 버튼(파란색) 2. +버튼 3.아이콘 버튼
