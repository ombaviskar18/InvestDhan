import { createSlice } from "@reduxjs/toolkit";

const businessSlice = createSlice({
    name:"business",
    initialState:{
        singleBusiness:null,
        businesses:[],
        searchBusinessByText:"",
    },
    reducers:{
        setSingleBusiness:(state,action) => {
            state.singleBusiness = action.payload;
        },
        setBusinesses:(state,action) => {
            state.businesses = action.payload;
        },
        setsearchBusinessByText:(state,action) => {
            state.searchBusinessByText= action.payload
        }
    }
});
export const {setSingleBusiness, setBusinesses, setsearchBusinessByText} = businessSlice.actions;
export default businessSlice.reducer;