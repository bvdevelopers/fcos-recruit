import { configureStore } from '@reduxjs/toolkit';
import formSlice from "./formSlice";
import tableslice from './tableslice';
import tabSlice from './tabSlice';
const Store=configureStore({
    reducer:{
        form:formSlice,
        table:tableslice,
        tab:tabSlice
    }
}
)
export default Store;