import React from "react";
import { styled } from "styled-components";
import SetWelfareModal from "./SetWelfareModal";
import WelfareModal from "./WelfareModal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "../../store/modalSlice";

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  z-index: 2;
  max-width: 80%;
  max-height: 80%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: auto;
`;

const MODAL_TYPES = {
  CalendarModal: "CalendarModal",
  SetWelfareModal: "SetWelfareModal",
  WelfareModal: "WelfareModal",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.SetWelfareModal,
    component: <SetWelfareModal />,
  },
  {
    type: MODAL_TYPES.WelfareModal,
    component: <WelfareModal />,
  },
];

const Modal = () => {
  const { modalType, isOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  if (!isOpen) return null;

  const findModal = MODAL_COMPONENTS.find((modal) => modal.type === modalType);

  // 모달 내부 클릭 이벤트 처리 함수
  const handleModalClick = (e) => {
    e.stopPropagation(); // 모달 바깥으로 이벤트 전파를 막음
  };

  // 모달 바깥 클릭 이벤트 처리 함수
  const handleModalWrapperClick = () => {
    dispatch(closeModal());
  };

  return (
    <ModalWrapper onClick={handleModalWrapperClick} className="ModalWrapper">
      <ModalContainer className="ModalContainer" onClick={handleModalClick}>
        {findModal.component}
      </ModalContainer>
    </ModalWrapper>
  );
};

export default Modal;
