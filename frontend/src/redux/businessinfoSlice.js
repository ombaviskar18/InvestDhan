import { createSlice } from "@reduxjs/toolkit";

const businessinfoSlice = createSlice({
    name:"businessinfo",
    initialState:{
        allBusinessinfos:[],
        allAdminBusinessinfos:[],
        singleBusinessinfo:null,
        searchBusinessinfoByText:"",
        allAppliedBusinessinfos:[],
        searchedQuery:"",

    },
    reducers:{
        setAllBusinessinfos:(state,action) => {
            state.allBusinessinfos = action.payload;
        },
        setSingleBusinessinfo:(state,action) => {
            state.singleBusinessinfo = action.payload
        },
        setAllAdminBusinessinfos:(state,action) => {
            state.allAdminBusinessinfos = action.payload;
        },
        setSearchBusinessinfoByText:(state,action) => {
            state.searchBusinessinfoByText = action.payload;
        },
        setAllAppliedBusinessinfos:(state,action) => {
            state.allAppliedBusinessinfos = action.payload;
        },
        setSearchedQuery:(state,action) =>{
            state.searchedQuery = action.payload;
        }

    }
});
export const {setAllBusinessinfos , setSingleBusinessinfo, setAllAdminBusinessinfos, setSearchBusinessinfoByText, setAllAppliedBusinessinfos , setSearchedQuery} = businessinfoSlice.actions;
export default businessinfoSlice.reducer;


