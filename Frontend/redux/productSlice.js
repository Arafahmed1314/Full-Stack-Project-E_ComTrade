import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        isLoading: false
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }


    }
});
export const { setProducts, setLoading } = productSlice.actions;
export default productSlice.reducer;