import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const formslice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addForm: (state, action) => {
      const formid=action.payload;
      state[formid]={};
    },
    updateForm: (state, action) => {
      const {id,pass} = action.payload;
      Object.assign(state[id],pass);
      // Object.assign(state,{[id]:pass});
    }
  }
});
export const { addForm, updateForm } = formslice.actions;
export default formslice.reducer;

