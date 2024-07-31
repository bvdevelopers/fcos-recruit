import { configureStore } from '@reduxjs/toolkit';
import formSlice from "./formSlice";
import tableslice from './tableslice';
import tabSlice from './tabSlice';
import tenderform from './tenderform';
const Store=configureStore({
    reducer:{
        form:formSlice,
        table:tableslice,
        tab:tabSlice,
        tenderform:tenderform
    }
}
)
export default Store;