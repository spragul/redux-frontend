import { createSlice } from "@reduxjs/toolkit";

const userSilce=createSlice({
    name:"user",
    initialState:{user:[],isLoading:false},
    reducers:{
        fetchuser:(state,action)=>{
            state.isLoading=true;
          state.user=action.payload;
        }
    }
})
export const {fetchuser}=userSilce.actions
export default userSilce.reducer;