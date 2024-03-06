import React from "react";
import Button from "../button/Button";
import styled from "styled-components";
import { closeModal } from "../../store/modalSlice";
const WelfareContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: var(--beige);
`;
const WelfareModal = () => {
  return (
    <WelfareContainer>
      <h2>지원사업 모달</h2>
      <Button onClick={closeModal}>Close</Button>
    </WelfareContainer>
  );
};

export default WelfareModal;
