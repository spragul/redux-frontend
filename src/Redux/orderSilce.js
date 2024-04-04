import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:"order",
    initialState:{order:[],isLoading:false},
    reducers:{
        Loaging:(state,action)=>{
            state.isLoading=true;
         },
        fetchorder:(state,action)=>{
            state.isLoading=true;
            state.order=action.payload;
        },
        resetorder:(state,action)=>{
            state.isLoading=false;
            state.order=action.payload;
        }
    }
})
export const {Loaging,fetchorder,resetorder}=orderSlice.actions
export default orderSlice.reducer;