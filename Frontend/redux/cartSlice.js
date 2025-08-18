import { createSlice } from '@reduxjs/toolkit';

// Simple cart slice - only for state management
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        loading: false,
        error: null,
    },
    reducers: {
        // Set loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        // Set error message
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        },

        // Set cart data from API
        setCartData: (state, action) => {
            state.items = action.payload.items || [];
            state.totalItems = action.payload.totalItems || 0;
            state.totalPrice = action.payload.totalPrice || 0;
            state.loading = false;
            state.error = null;
        },

        // Clear cart
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            state.error = null;
        }
    }
});

// Export actions
export const { setLoading, setError, clearError, setCartData, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
