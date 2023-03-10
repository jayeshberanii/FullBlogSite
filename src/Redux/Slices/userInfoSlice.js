import { createSlice } from "@reduxjs/toolkit";

const useInfoSlice=createSlice({
    name:"userInfo",
    initialState:{},
    reducers:{
        setUserInfo(state,action){
            return action.payload
        },
        logoutuser(state,action){
            return {}
        }
    }
})

export default useInfoSlice.reducer
export const {setUserInfo,logoutuser}=useInfoSlice.actions