import { configureStore } from '@reduxjs/toolkit';
import  crudListReducer  from './Slices/RestaurantListSlice';

export const Store = configureStore({
    devTools : true,
    reducer : {
        crudData : crudListReducer 
    }
});
