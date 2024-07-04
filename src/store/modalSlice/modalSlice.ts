import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface I_InitialModalState {
  updateModal: {
    updateModalIsOpen: boolean;
    companyId: null | string;
  };
  deleteModal: {
    deleteModalIsOpen: boolean;
    deleteData: {
      companyId: null | string;
      companyName: null | string;
    };
  };
}

const initialModalState: I_InitialModalState = {
  updateModal: {
    updateModalIsOpen: false,
    companyId: null,
  },
  deleteModal: {
    deleteModalIsOpen: false,
    deleteData: {
      companyId: null,
      companyName: null,
    },
  },
};

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState: initialModalState,
  reducers: {
    openUpdateModal: (state, action: PayloadAction<string>) => {
      state.updateModal.updateModalIsOpen = true;
      state.updateModal.companyId = action.payload;
    },
    closeUpdateModal: (state) => {
      state.updateModal = initialModalState.updateModal;
    },
    openDeleteModal: (
      state,
      action: PayloadAction<{ companyId: string; companyName: string }>
    ) => {
      state.deleteModal.deleteModalIsOpen = true;
      state.deleteModal.deleteData = action.payload;
    },
    closeDeleteModal: (state) => {
      state.deleteModal = initialModalState.deleteModal;
    },
  },
});

export const {
  openUpdateModal,
  closeUpdateModal,
  openDeleteModal,
  closeDeleteModal,
} = modalSlice.actions;
