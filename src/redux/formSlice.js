import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const formslice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addForm: (state) => {
    state={};
    },
    updateForm: (state, action) => {
      Object.assign(state,action.payload);
      // Object.assign(state,{[id]:pass});
    },
  }
});
export const { addForm, updateForm } = formslice.actions;
export default formslice.reducer;

