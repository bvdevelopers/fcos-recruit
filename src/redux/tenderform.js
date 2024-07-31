import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const tenderformslice = createSlice({
  name: "tenderform",
  initialState,
  reducers: {
    addForm: (state, action) => {
      state={};
    },
    updateForm: (state, action) => {
      Object.assign(state,action.payload);
      // Object.assign(state,{[id]:pass});
    }
  }
});
export const { addForm, updateForm } = tenderformslice.actions; 
export default tenderformslice.reducer;

