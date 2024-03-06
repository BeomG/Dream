import React from "react";
import { styled } from "styled-components";

const StyledInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => (props.border ? props.border : "1px solid black")};
  border-bottom: ${(props) => props.borderBottom};
  background: ${(props) =>
    props.background ? `var(--${props.background})` : `var(--white)`};
  color: var(--black);
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => props.fontFamily || "initial"};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderradius};
  ::placeholder {
    ${(props) => props.placeholder};
  }
  &:focus {
    outline: none;
  }
  bottom: ${(props) => props.bottom};
  position: ${(props) => props.position};
`;

const Input = (props) => {
  const {
    type,
    width,
    height,
    placeholder,
    margin,
    padding,
    onChange,
    id,
    fontFamily,
    value,
    disabled,
    borderradius,
    border,
    borderBottom,
    background,
    bottom,
    position,
  } = props;

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      onChange={onChange}
      id={id}
      fontFamily={fontFamily}
      value={value}
      disabled={disabled}
      borderradius={borderradius}
      border={border}
      bottom={bottom}
      position={position}
      background={background}
      borderBottom={borderBottom}
    />
  );
};

export default Input;
