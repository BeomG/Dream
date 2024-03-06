import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: "",
  isOpen: false,
};

export const selectModal = (state) => state.modal;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const { modalType } = actions.payload;
      state.modalType = modalType;
      state.isOpen = true;
    },
    closeModal: (state) => {
      return (state.isOpen = false);
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
