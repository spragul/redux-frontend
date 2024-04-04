import {createSlice} from '@reduxjs/toolkit'

const productSlice =createSlice({
    name:"Product",
    initialState:{value:[],isLoading:false},
    reducers:{
      Loaging:(state,action)=>{
      state.isLoading=true;
      },
      fetchData:(state,action)=>{
       state.isLoading=true;
       state.value=action.payload;
      },
      displayData:(state,action)=>{
        console.log(action.payload)
        state.isLoading=true;
        state.value=state.value.filter((item)=>{return action.payload === ""
        ? item
        : item.title.toLowerCase().includes(action.payload.toLowerCase());});
      },
      addData:(state,action)=>{
        state.isLoading=true;
       state.value=[...state.value,action.payload]
      },
      editdata:(state,action)=>{
        state.isLoading=true;
        let id=action.payload._id;
        let removeproduct=state.value.filter((val)=>val._id !==id);
        state.value=[...removeproduct,action.payload];
      },
      deletedata:(state,action)=>{
        state.isLoading=true;
        let id=action.payload;
        let newlist=state.value.filter((val)=>val._id!==id);
        state.value=newlist;
      }
    }
})

export const {Loaging,fetchData,addData,editdata,deletedata,displayData}=productSlice.actions;
export default productSlice.reducer;