import { createSlice } from "@reduxjs/toolkit";

const cartSlice =createSlice({
    name:"cart",
    initialState:{cart:[],isLoading:false},
    reducers:{
          fetchCart:(state,action)=>{
            state.isLoading=true;
            state.cart=action.payload;
          },
          createcart:(state,action)=>{
            state.isLoading=true;
            state.cart=[...state.cart,action.payload]
          },
          deleteCart:(state,action)=>{
            state.isLoading=true;
            let id=action.payload;
            console.log(id)
            state.cart=state.cart.filter((val)=>val._id!==id)
          },
          resetCart:(state,action)=>{
            state.isLoading=false;
            state.cart=action.payload
          }
    }
})
export const {fetchCart,deleteCart,createcart,resetCart}=cartSlice.actions
export default cartSlice.reducer;