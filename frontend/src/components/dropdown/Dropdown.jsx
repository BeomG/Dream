import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  background-color: none;
  width: 100%;
  height: 160px;
  font-size: 18px;
  color: black;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: red transparent;
`;

const DropdownUl = styled.ul`
  list-style: none;
  height: auto;
  max-height: 100%;
  padding-left: 0;
`;

const DropdownItem = styled.li`
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
  height: ${(props) => props.height};
`;
const Dropdown = ({ items, onItemClick, height }) => {
  return (
    <DropdownContainer className="DropDownContainer">
      <DropdownUl className="DropdownUl">
        {items.map((item, index) => (
          <DropdownItem
            key={index}
            onClick={() => onItemClick(item)}
            className={item}
            color="black"
            height={height}
          >
            {item}
          </DropdownItem>
        ))}
      </DropdownUl>
    </DropdownContainer>
  );
};

export default Dropdown;
