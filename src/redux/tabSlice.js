import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const tabSlice=createSlice({name:"tab",initialState,
reducers:{
    newtab:(state,action)=>{state.push(action.payload)},
    rmtab:(state,action)=>{state.splice(action.payload,1)}
}})

export default tabSlice.reducer
export const {newtab,rmtab} =tabSlice.actions