import {createSlice} from '@reduxjs/toolkit';

const initialState=[]    

const tableSlice = createSlice({
    name: "table", initialState,
    reducers: {
        newuser: (state, action) => { state.push(action.payload) }
    }
})

export default tableSlice.reducer
export const {newuser} = tableSlice.actions